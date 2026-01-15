import { QUEUE_ITEMS, type QueueItem } from "@/config/internal/queue-data-config";

export interface QueueItemDisplay extends QueueItem {
	statusDisplay: {
		text: string;
		className: string;
	};
}

export function getQueueItemsWithDisplay(): QueueItemDisplay[] {
	return QUEUE_ITEMS.map((item) => ({
		...item,
		statusDisplay: getStatusDisplay(item),
	}));
}

function getStatusDisplay(item: QueueItem) {
	switch (item.status) {
		case "completed":
			return {
				text: `✓ Done in ${item.completedIn || "unknown time"}`,
				className: "text-green-600 font-medium",
			};
		case "processing":
			return {
				text: `~${item.estimatedTime || "unknown time"} remaining`,
				className: "text-purple-600 font-medium",
			};
		case "pending":
			return {
				text: `ETA: ${item.estimatedTime || "unknown time"}`,
				className: "text-blue-600 font-medium",
			};
		case "failed":
			return {
				text: item.error || "Unknown error",
				className: "text-red-600 font-medium text-xs",
			};
		case "paused":
			return {
				text: item.reason || "Paused",
				className: "text-orange-600 font-medium text-xs",
			};
		default:
			return {
				text: "Unknown status",
				className: "text-gray-600 font-medium",
			};
	}
}

/**
 * Get a filter function for queue items based on selected filter
 */
export const getQueueFilter = (filter: string) => (item: QueueItemDisplay) => {
	if (filter === "all") return true;
	return item.status === filter;
};
