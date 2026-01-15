import { QUEUE_STATS } from "@/config/internal/queue-data-config";
import { QueueDataClient } from "./_components/QueueDataClient";

export default function QueueDataPage() {
	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-400 mx-auto space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Queue Data</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Monitor and manage processing queues in real-time
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{QUEUE_STATS.map((stat) => (
					<div
						key={stat.label}
						className={`${stat.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
					>
						<p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
						<p className={`text-3xl font-bold ${stat.classNameColor}`}>{stat.count}</p>
					</div>
				))}
			</div>

			<QueueDataClient />
		</div>
	);
}
