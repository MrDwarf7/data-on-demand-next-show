import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import type { StatsData } from "@/hooks/use-stats-overview";

// type MOCK_STAT = Awaited<ReturnType<typeof getStatsOverview>>[TimeRange];

export const StatsCards = ({ statsCards }: { statsCards: StatsData["statsCards"] }) => {
	return (
		<>
			{statsCards.map((stat, index) => (
				<div
					key={`${stat.title}__${stat.trend}__${stat.value}__${index}`}
					className={`relative overflow-hidden rounded-xl border border-accent/50 bg-linear-to-br ${stat.bgGradient} p-6 transition-all hover:shadow-xl hover:scale-[1.02] group`}
					style={{ animationDelay: `${index * 100}ms` }}
				>
					<div className="flex items-start justify-between mb-4">
						<div
							className={`p-3 rounded-lg bg-linear-to-br ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
						>
							{stat.icon({})}
						</div>
						<div
							className={`flex items-center gap-1 text-sm font-medium ${
								stat.trend === "up" ? "text-green-600" : "text-red-600"
							}`}
						>
							{stat.trend === "up" ? (
								<FiTrendingUp className="w-4 h-4" />
							) : (
								<FiTrendingDown className="w-4 h-4" />
							)}
							{stat.change}
						</div>
					</div>
					<h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
					<p className="text-3xl font-bold text-foreground">{stat.value}</p>
				</div>
			))}
		</>
	);
};
