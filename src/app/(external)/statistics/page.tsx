import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { TrendType } from "@/config/external/statistics-config";
import {
	SAMPLE_TABLE_DATA,
	STATISTICS_METRICS,
	TREND_TYPE_STYLES,
} from "@/config/external/statistics-config";

export default function StatisticsPage() {
	const getTrendIcon = (trend: TrendType) => {
		const styles = TREND_TYPE_STYLES[trend];
		return <styles.icon className={`w-4 h-4 ${styles.classNameColor}`} />;
	};

	const getStatusBadge = (status: string) => {
		if (status === "Active") {
			return "bg-green-500/20 text-green-600";
		}
		return "bg-gray-500/20 text-gray-600";
	};

	return (
		<MaxWidthWrapper className="py-8 sm:py-12">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10 sm:mb-16">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
						Live Statistics
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
						Real-time visibility into queue status, processing metrics, and system performance
					</p>
				</div>

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
									<p className={`text-3xl font-bold ${metric.classNameColor}`}>{metric.value}</p>
									<div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
										{getTrendIcon(metric.trend)}
										<span>{metric.change}</span>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>

				<div className="bg-accent/20 border border-accent rounded-2xl p-6 sm:p-8">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-foreground">Process Overview</h2>
						<button
							type="button"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all text-sm"
						>
							Refresh Data
						</button>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-accent">
									{SAMPLE_TABLE_DATA.columns.map((column) => (
										<th
											key={column.key}
											className="text-left py-4 px-4 text-sm font-semibold text-foreground"
										>
											{column.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{SAMPLE_TABLE_DATA.rows.map((row, index) => (
									<tr
										key={row.id}
										className={`border-b border-accent/50 hover:bg-accent/30 transition-colors ${
											index % 2 === 0 ? "bg-accent/10" : ""
										}`}
									>
										<td className="py-4 px-4 font-medium text-foreground">{row.process}</td>
										<td className="py-4 px-4">
											<span
												className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(row.status)}`}
											>
												{row.status}
											</span>
										</td>
										<td className="py-4 px-4 text-muted-foreground">{row.count}</td>
										<td className="py-4 px-4 text-muted-foreground">{row.avgTime}</td>
										<td className="py-4 px-4 text-muted-foreground">{row.successRate}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

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
		</MaxWidthWrapper>
	);
}
