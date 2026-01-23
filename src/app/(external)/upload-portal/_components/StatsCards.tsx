import type { IconType } from "react-icons";
import { FiAlertCircle, FiCalendar, FiCheckSquare, FiClock } from "react-icons/fi";
import { ReportCalendar } from "@/components/generic/ReportCalendar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { capitalizeLetters } from "@/lib/utils";
import { Suspense } from "react";

export type UploadPortalStatsCardsProps = {
	lastReportDate: Date;
};

type StatsCardsProps = {
	icon: IconType;
	iconClassName: string;
	label: string;
	value: number;
	color: string;
};

type MockStatsCardsProps<T extends string | number | symbol, S> = {
	[key in T]: S;
};

const mockStatCards: MockStatsCardsProps<
	["pending", "exception", "completed"][number],
	Omit<StatsCardsProps, "label">
> = {
	pending: {
		icon: FiClock,
		iconClassName: "h-5 w-5 text-warning-foreground",
		value: 588,
		color: "bg-warning-10",
	},

	exception: {
		icon: FiAlertCircle,
		iconClassName: "h-5 w-5 text-error-foreground",
		value: 14,
		color: "bg-error-10",
	},

	completed: {
		icon: FiCheckSquare,
		iconClassName: "h-5 w-5 text-success-foreground",
		value: 200,
		color: "bg-success-10",
	},
};

const StatCard = ({ icon, iconClassName, label, value, color }: StatsCardsProps) => (
	<div className="flex items-center gap-3 p-4 rounded-lg border border-accent bg-accent/20">
		<div className={`p-2 rounded-lg ${color}`}>
			{icon({
				className: iconClassName,
			})}
		</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold text-foreground">{value}</p>
		</div>
	</div>
);

const RenderCards = (data: typeof mockStatCards) => {
	if (data == null) return null;
	if (data === undefined) return null;
	if (Object.keys(data).length === 0) return null;

	// Gen the keys of the arrays for lookup
	const states = Object.keys(data) as Array<keyof typeof mockStatCards>;
	if (states.length === 0) return null;

	// Infer labels from keys (key names)
	const labels = states.map((state) => capitalizeLetters(state));

	return states.map((state, idx) => (
		<StatCard
			key={states.indexOf(state)}
			icon={data[state].icon}
			iconClassName={data[state].iconClassName}
			label={labels[idx] || ""}
			value={data[state].value}
			color={data[state].color}
		/>
	));
};

export const UploadPortalStatsCards = ({ lastReportDate }: UploadPortalStatsCardsProps) => {
	// TODO: [backend] : Replace mock data with real data from props when available
	const data = mockStatCards;
	const prettifiedDate = lastReportDate.toLocaleDateString();

	return (
		<div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<RenderCards {...data} />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline" className="h-full">
						<FiCalendar className="mr-2 h-5 w-5" />
						<div className="text-left">
							<p className="text-sm text-muted-foreground">Report Calendar</p>
							<p className="text-xs text-muted-foreground">Last: {prettifiedDate}</p>
						</div>
					</Button>
				</DialogTrigger>
				{/* Note that this DialogContent requires these classNames due to how the calendar/date picker positions are all calculated */}
				<DialogContent className="min-w-fit m-auto min-h-fit">
					<DialogHeader>
						<DialogTitle>Report Calendar</DialogTitle>
					</DialogHeader>
					<Suspense fallback={<div>Loading Calendar...</div>}>
						<ReportCalendar defaultOpenDate={new Date()} />
						<p className="text-sm text-muted-foreground text-center">
							Last report date: <span className="text-ring font-semibold">{prettifiedDate}</span>
						</p>
					</Suspense>
				</DialogContent>
			</Dialog>
		</div>
	);
};
