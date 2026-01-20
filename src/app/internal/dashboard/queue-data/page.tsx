import { getQueueStyles, QUEUE_STATS } from "@/config/internal/queue-data-config";
import { getQueueItemsWithDisplay } from "@/lib/queue-utils";
import { QueueDataClient } from "./_components/QueueDataClient";

export default function QueueDataPage() {
	const queueItems = getQueueItemsWithDisplay();

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-400 mx-auto space-y-6">
			<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Queue Data</h1>
			<p className="text-sm text-muted-foreground mt-1">
				Monitor and manage processing queues in real-time
			</p>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{QUEUE_STATS.map((stat) => {
					const styles = getQueueStyles(
						stat.label.toLowerCase() as "pending" | "processing" | "completed" | "failed"
					);
					return (
						<div
							key={stat.label}
							className={`bg-gradient-to-br ${styles.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
						>
							<p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
							<p className={`text-3xl font-bold ${styles.classNameColor}`}>{stat.count}</p>
						</div>
					);
				})}
			</div>

			<QueueDataClient items={queueItems} />
		</div>
	);
}
