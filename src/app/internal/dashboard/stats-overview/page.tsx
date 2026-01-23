import { Suspense } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { InternalHeroSection } from "@/components/InternalHeroSection";
import { Skeleton } from "@/components/ui/skeleton";
import type { TimeRange } from "@/config/internal/stats-overview-config";
import { getStatsOverview } from "@/hooks/use-stats-overview";
import { PerformanceMetricsCharts } from "./_components/PerformanceMetricsCharts";
import { RecentActivity } from "./_components/RecentActivity";
import { StatsCards } from "./_components/StatsCards";
import { SystemHealth } from "./_components/SystemHealth";
import { TimeRangePicker } from "./_components/TimeRangePicker";
import { TopProcesses, TopProcessesSkeleton } from "./_components/TopProcesses";

interface StatsOverViewPageProps {
	searchParams: Promise<{ range?: string }>;
}

export default async function StatsOverviewPage({ searchParams }: StatsOverViewPageProps) {
	const [params, statsData] = await Promise.all([searchParams, getStatsOverview()]);
	const range = (params.range as TimeRange) || "24h";
	const { statsCards, recentActivity, systemMetrics, topProcesses } = statsData[range];

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-450 mx-auto space-y-6">
			<InternalHeroSection
				title="Statistics Overview"
				description="Real-time insights into your automation performance"
			/>
			<div className="flex flex-col lg:justify-end md:justify-end sm:flex-row sm:items-center sm:justify-end gap-4">
				<Suspense fallback={<Skeleton className="w-full h-4" />}>
					<TimeRangePicker />
				</Suspense>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
				<Suspense>
					<StatsCards statsCards={statsCards} />
				</Suspense>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Suspense>
					<PerformanceMetricsCharts />
				</Suspense>
				<Suspense>
					<SystemHealth systemMetrics={systemMetrics} />
				</Suspense>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Suspense fallback={<TopProcessesSkeleton count={5} />}>
					<TopProcesses topProcesses={topProcesses} />
				</Suspense>

				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 rounded-lg bg-orange-600 text-white">
							<AiOutlineClockCircle className="w-5 h-5" />
						</div>
						<h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
					</div>
					<Suspense>
						<RecentActivity recentActivity={recentActivity} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
