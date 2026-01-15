import { Suspense } from "react";
import type { JSX } from "react/jsx-runtime";
import {
	FiAlertCircle,
	FiCalendar,
	FiCheckCircle,
	FiCheckSquare,
	FiClock,
	FiUploadCloud,
} from "react-icons/fi";
import { ProcessPicker } from "@/app/(external)/upload-portal/_components/ProcessPicker";
import { TabsMainComponent } from "@/app/(external)/upload-portal/_components/TabsHousingComponent";
import { ReportCalendar } from "@/components/generic/ReportCalendar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Skeleton } from "@/components/ui/skeleton";
import { processPickerItems } from "@/config/external/process-picker-items";

type TileDataProps = {
	id: number;
	icon: JSX.Element;
	title: string;
	content: string;
};

const tileData: TileDataProps[] = [
	{
		id: 1,
		icon: <FiUploadCloud className="h-5 w-5 text-black dark:text-neutral-400" />,
		title: "Multiple Formats",
		content: "Upload PDF, Word documents, Excel spreadsheets, and more",
	},
	{
		id: 2,
		icon: <FiClock className="h-5 w-5 text-black dark:text-neutral-400" />,
		title: "Fast Processing",
		content: "Most files are processed within minutes of submission",
	},
	{
		id: 3,
		icon: <FiCheckCircle className="h-5 w-5 text-black dark:text-neutral-400" />,
		title: "Track Progress",
		content: "Monitor your submissions in real-time on the statistics page",
	},
];

const renderInfoTiles = (data: TileDataProps[]): JSX.Element[] | null => {
	if (!data || data.length === 0) {
		return null;
	}

	return data.map((tile) => (
		<li key={tile.id} className="min-h-48 list-none">
			<div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
				<GlowingEffect
					spread={40}
					glow={true}
					disabled={false}
					proximity={64}
					inactiveZone={0.01}
				/>
				<div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-5 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
					<div className="w-fit rounded-lg border border-gray-600 p-2">{tile.icon}</div>
					<div className="space-y-2">
						<h3 className="font-sans text-lg font-semibold text-black dark:text-white">
							{tile.title}
						</h3>
						<p className="font-sans text-sm text-black dark:text-neutral-400">{tile.content}</p>
					</div>
				</div>
			</div>
		</li>
	));
};

const StatCard = ({
	icon,
	label,
	value,
	color,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	color: string;
}) => (
	<div className="flex items-center gap-3 p-4 rounded-lg border border-accent bg-accent/20">
		<div className={`p-2 rounded-lg ${color}`}>{icon}</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold text-foreground">{value}</p>
		</div>
	</div>
);

export default async function UploadPortalPage() {
	async function processPickerLoading() {
		return <Skeleton className="w-full sm:w-80 h-10" />;
	}

	const divData = renderInfoTiles(tileData);

	// Queue statistics (TODO: [backend] : Replace with live data)
	const pending = 588;
	const exception = 14;
	const completed = 200;
	const lastReportDate = new Date().toLocaleDateString();

	return (
		<MaxWidthWrapper className="py-8 sm:py-12">
			{/* Header Section */}
			<div className="mb-8 sm:mb-10">
				<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
					Upload Portal
				</h1>
				<p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
					Submit your documents for automated processing. Select a process type and upload your
					files to get started.
				</p>
			</div>

			{/* Stats and Calendar Row */}
			<div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatCard
					icon={<FiClock className="h-5 w-5 text-warning-foreground" />}
					label="Pending"
					value={pending}
					color="bg-warning-10"
				/>
				<StatCard
					icon={<FiAlertCircle className="h-5 w-5 text-error-foreground" />}
					label="Exception"
					value={exception}
					color="bg-error-10"
				/>
				<StatCard
					icon={<FiCheckSquare className="h-5 w-5 text-success-foreground" />}
					label="Completed"
					value={completed}
					color="bg-success-10"
				/>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="h-full">
							<FiCalendar className="mr-2 h-5 w-5" />
							<div className="text-left">
								<p className="text-sm text-muted-foreground">Report Calendar</p>
								<p className="text-xs text-muted-foreground">Last: {lastReportDate}</p>
							</div>
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Report Calendar</DialogTitle>
						</DialogHeader>
						<div className="flex justify-center">
							<ReportCalendar date={new Date()} />
						</div>
						<p className="text-sm text-muted-foreground text-center">
							Last report date: <span className="text-ring font-semibold">{lastReportDate}</span>
						</p>
					</DialogContent>
				</Dialog>
			</div>

			{/* Process Selection */}
			<div className="mb-6 flex flex-row justify-end">
				<Suspense fallback={processPickerLoading()}>
					<ProcessPicker
						processPickerObj={processPickerItems}
						className="justify-between w-full sm:w-80"
					/>
				</Suspense>
			</div>

			{/* Tabs Section */}
			<div className="mb-8">
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-12">
							<div className="text-center">
								<div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
								<p className="text-muted-foreground">Loading upload interface...</p>
							</div>
						</div>
					}
				>
					<TabsMainComponent defaultTab={"humans"} />
				</Suspense>
			</div>
			{/* </div> */}

			{/* Info Cards */}
			{divData && (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{divData}</ul>
			)}
		</MaxWidthWrapper>
	);
}
