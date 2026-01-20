import { Suspense } from "react";
import type { JSX } from "react/jsx-runtime";
import { FiCheckCircle, FiClock, FiSend, FiUploadCloud } from "react-icons/fi";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { UploadSection } from "@/components/UploadSection";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Skeleton } from "@/components/ui/skeleton";

import { UploadPortalStatsCards } from "./_components/StatsCards";

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

// TODO: See other [...] todo items regarding further refactoring
// TODO: [tabs_content] :
// TODO: [process_picker] :

export default async function UploadPortalPage() {
	async function processPickerLoading() {
		return <Skeleton className="w-full sm:w-80 h-10" />;
	}

	async function tabsContentLoading() {
		return (
			<Skeleton>
				<div className="flex items-center justify-center py-12">
					<div className="text-center">
						<div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
						<p className="text-muted-foreground">Loading upload interface...</p>
					</div>
				</div>
			</Skeleton>
		);
	}

	// Queue statistics (TODO: [backend] : Replace with live data)
	const statCardsProps = {
		pending: 588,
		exception: 14,
		completed: 200,
		lastReportDate: new Date().getDay().toString(),
		// .toLocaleDateString(),
	};

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
			<UploadPortalStatsCards {...statCardsProps} />

			{/* Upload Section */}
			<div className="mb-8">
				<Suspense fallback={tabsContentLoading()}>
					<UploadSection />
					<span className="flex justify-end">
						<FiSend className="absolute mt-3 ml-3 text-white opacity-0" />
					</span>
				</Suspense>
			</div>

			{/* Info Cards */}
			{renderInfoTiles(tileData) && (
				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{renderInfoTiles(tileData)}
				</ul>
			)}
		</MaxWidthWrapper>
	);
}
