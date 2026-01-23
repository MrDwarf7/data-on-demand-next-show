import { HiOutlineChartBar } from "react-icons/hi";

export const PerformanceMetricsCharts = () => {
	return (
		<div className="lg:col-span-2 bg-accent/30 border border-accent/50 rounded-xl p-6">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-lg bg-blue-600 text-white">
						<HiOutlineChartBar className="w-5 h-5" />
					</div>
					<h2 className="text-xl font-semibold text-foreground">Performance Metrics</h2>
				</div>
			</div>
			<div className="h-75 flex items-center justify-center bg-accent/20 rounded-lg border-2 border-dashed border-accent/50">
				<div className="text-center">
					<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
						<HiOutlineChartBar className="w-8 h-8" />
					</div>
					<p className="text-muted-foreground font-medium">Chart visualization placeholder</p>
					<p className="text-sm text-muted-foreground mt-1">Integrate Chart.js or Recharts here</p>
				</div>
			</div>
		</div>
	);
};
