import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import type { StatsData } from "@/hooks/use-stats-overview";

export const RecentActivity = ({
	recentActivity,
}: {
	recentActivity: StatsData["recentActivity"];
}) => {
	return (
		<div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
			{recentActivity.map((activity) => (
				<div
					key={activity.id}
					className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-accent/30 hover:border-accent/60 transition-all"
				>
					<div
						className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
							activity.status === "success"
								? "bg-green-500"
								: activity.status === "error"
									? "bg-red-500"
									: activity.status === "processing"
										? "bg-blue-500 animate-pulse"
										: "bg-gray-500"
						}`}
					/>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
						<p className="text-xs text-muted-foreground truncate">{activity.process}</p>
						<p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
					</div>
					{activity.status === "error" && (
						<FiAlertCircle className="w-4 h-4 text-red-500 shrink-0" />
					)}
					{activity.status === "success" && (
						<FiCheckCircle className="w-4 h-4 text-green-500 shrink-0" />
					)}
				</div>
			))}
		</div>
	);
};
