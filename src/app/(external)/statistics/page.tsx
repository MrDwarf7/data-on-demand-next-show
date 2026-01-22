import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
	getTrendStyles,
	STATISTICS_METRICS,
	type TrendType,
} from "@/config/external/statistics-config";
import { cn } from "@/lib/utils";
import { StatisticsTable, StatisticsTableSkeleton } from "./_components/StatisticsTable";

export default function StatisticsPage() {
	const getTrendIcon = (trend: TrendType) => {
		const styles = getTrendStyles(trend);
		return <styles.icon className={`w-4 h-4 ${styles.classNameColor}`} />;
	};

	return (
		<div className="max-w-7xl mx-auto">
			<HeroSection
				title="Live Statistics"
				description="Real-time visibility into queue status, processing metrics, and system performance"
			/>

			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
				{STATISTICS_METRICS.map((metric) => (
					<li key={metric.label} className="list-none">
						<div className="relative h-full rounded-2xl border p-2">
							<GlowingEffect
								spread={40}
								glow={true}
								disabled={false}
								proximity={64}
								inactiveZone={0.01}
							/>
							<div className="bg-accent/20 relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
								<p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
								<p
									className={cn(
										"text-3xl font-bold",
										`${getTrendStyles(metric.trend).classNameColor}`
									)}
								>
									{metric.value}
								</p>
								<div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
									{getTrendIcon(metric.trend)}
									<span>{metric.change}</span>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>

			<Suspense fallback={<StatisticsTableSkeleton />}>
				<StatisticsTable />
			</Suspense>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<div className="bg-accent/20 border border-accent rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-foreground mb-4">About This Data</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						Statistics are updated in real-time and reflect the current state of all automation
						processes. Data is aggregated from all active queues and processing nodes.
					</p>
				</div>

				<div className="bg-accent/20 border border-accent rounded-2xl p-6">
					<h3 className="text-lg font-semibold text-foreground mb-4">Data Refresh</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						The dashboard automatically refreshes every 30 seconds. You can also manually refresh
						using the button above for the latest metrics.
					</p>
				</div>
			</div>
		</div>
	);
}
