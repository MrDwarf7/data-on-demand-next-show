import { FiServer } from "react-icons/fi";
import type { SystemMetric } from "@/config/internal/stats-overview-config";

export const SystemHealth = ({ systemMetrics }: { systemMetrics: SystemMetric[] }) => {
	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 rounded-lg bg-purple-600 text-white">
					<FiServer className="w-5 h-5" />
				</div>
				<h2 className="text-xl font-semibold text-foreground">System Health</h2>
			</div>
			<div className="space-y-4">
				{systemMetrics.map((metric) => (
					<div key={metric.value}>
						<div className="flex items-center justify-between mb-2">
							<span className="text-sm font-medium text-foreground">{metric.label}</span>
							<span className="text-sm font-semibold text-foreground">{metric.value}%</span>
						</div>
						<div className="w-full h-2 bg-accent/50 rounded-full overflow-hidden">
							<div
								className={`h-full ${metric.color} rounded-full transition-all duration-500`}
								style={{ width: `${metric.value}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
