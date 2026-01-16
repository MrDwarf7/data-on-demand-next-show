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

type StatsCardsProps = {
	icon: React.ReactNode;
	label: string;
	value: number;
	color: string;
};

const StatCard = ({ icon, label, value, color }: StatsCardsProps) => (
	<div className="flex items-center gap-3 p-4 rounded-lg border border-accent bg-accent/20">
		<div className={`p-2 rounded-lg ${color}`}>{icon}</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-2xl font-bold text-foreground">{value}</p>
		</div>
	</div>
);

export type UploadPortalStatsCardsPorps = {
	pending: number;
	exception: number;
	completed: number;
	lastReportDate: string;
};

export const UploadPortalStatsCards = ({ ...props }: UploadPortalStatsCardsPorps) => {
	const { pending, exception, completed, lastReportDate } = props;
	return (
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
	);
};
