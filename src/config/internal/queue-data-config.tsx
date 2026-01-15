import { FiAlertCircle, FiCheckCircle, FiClock, FiLoader, FiPauseCircle } from "react-icons/fi";
import type { ClassNameDataWithIcon } from "@/config/external/statistics-config";
import { lookupStyleOf } from "@/utils/lookups";

export const QUEUE_FILTERS = [
	"all",
	"pending",
	"processing",
	"completed",
	"failed",
	"paused",
] as const;
export type QueueFilter = (typeof QUEUE_FILTERS)[number];
export type QueueStatsType = Capitalize<QueueFilter>;

// export type QueueStatsType = "All" | "Pending" | "Processing" | "Completed" | "Failed" | "Paused";

// a fn that, given an S (one of the QueueStatsType), returns the lowercases verison of that same
// QueueStatsType string. It must TAKE a typeof QueueStatsType as input, and
// return a type-safe (ie: A typeof) lowercased version

export type QueueTypePriority = "high" | "normal" | "low" | "urgent";

// export interface QueueTypeStyle extends Record<typeof QUEUE_FILTERS[number], ClassNameDataWithIcon> {
// 	priority: QueueTypePriority;
// }

export type PriortyLevelData = {
	priorityLevel?: QueueTypePriority;
	classNamePriority?: string;
};

export interface ClassNameDataWithIconPriority extends ClassNameDataWithIcon {
	priority?: PriortyLevelData;
}

export const QUEUE_TYPE_STYLES: Record<
	Lowercase<QueueStatsType> | QueueTypePriority | "default",
	ClassNameDataWithIconPriority
> = {
	all: {
		icon: FiClock,
		classNameColor: "text-gray-600",
		classNameBg: "bg-gray-500/20",
		priority: {
			priorityLevel: "low",
			classNamePriority: "border-gray-500/30",
		},
	},

	completed: {
		icon: FiCheckCircle,
		classNameColor: "text-green-600",
		classNameBg: "bg-green-500/20",
	},

	processing: {
		icon: FiLoader,
		classNameColor: "text-purple-600",
		classNameBg: "bg-purple-500/20",
	},

	failed: {
		icon: FiAlertCircle,
		classNameColor: "text-red-600",
		classNameBg: "bg-red-500/20",

		priority: {
			priorityLevel: "urgent",
			classNamePriority: "border-red-500/30",
		},
	},

	paused: {
		icon: FiPauseCircle,
		classNameColor: "text-orange-600",
		classNameBg: "bg-orange-500/20 ",

		priority: {
			priorityLevel: "high",
			classNamePriority: "border-orange-500/30",
		},
	},

	pending: {
		icon: FiClock,
		classNameColor: "text-blue-600",
		classNameBg: "bg-blue-500/20",
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-blue-500/30",
		},
	},

	high: {
		icon: FiClock,
		classNameColor: "text-yellow-600",
		classNameBg: "bg-yellow-500/20",
		priority: {
			priorityLevel: "high",
			classNamePriority: "border-yellow-500/30",
		},
	},

	normal: {
		icon: FiClock,
		classNameColor: "text-blue-600",
		classNameBg: "bg-blue-500/20",
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-blue-500/30",
		},
	},

	low: {
		icon: FiClock,
		classNameColor: "text-gray-600",
		classNameBg: "bg-gray-500/20",
		priority: {
			priorityLevel: "low",
			classNamePriority: "border-gray-500/30",
		},
	},

	urgent: {
		icon: FiClock,
		classNameColor: "text-red-600",
		classNameBg: "bg-red-500/20",
		priority: {
			priorityLevel: "urgent",
			classNamePriority: "border-red-500/30",
		},
	},

	default: {
		icon: FiClock,
		classNameColor: "text-gray-600",
		classNameBg: "bg-gray-500/10",

		priority: {
			priorityLevel: "low",
			classNamePriority: "border-gray-500/30",
		},
	},
};

export const getQueueStyles = (
	status: Lowercase<QueueStatsType> | QueueTypePriority | "default"
) => {
	return lookupStyleOf(QUEUE_TYPE_STYLES, status);
};

export interface QueueStats {
	label: QueueStatsType;
	count: number;
}

export const QUEUE_STATS: QueueStats[] = [
	{
		label: "Pending",
		count: 247,
	},
	{
		label: "Processing",
		count: 34,
	},
	{
		label: "Completed",
		count: 1893,
	},
	{
		label: "Failed",
		count: 12,
	},
];

export type QueueItemPriority = "low" | "normal" | "high" | "urgent";

export interface QueueItem extends Partial<Record<QueueStatsType, string>> {
	id: string;
	process: string;
	status: Lowercase<QueueStatsType>;
	priority: PriortyLevelData;
	// priority: {
	// 	classNamePriority?: string;
	// 	priorityLevel?: QueueTypePriority;
	// };
	submitted: string;
	estimatedTime?: string;
	completedIn?: string;
	error?: string;
	reason?: string;
	user: string;
}

export const QUEUE_ITEMS: QueueItem[] = [
	{
		id: "Q-00847",
		process: "Invoice Processing",
		status: "processing",
		priority: {
			priorityLevel: "high",
			classNamePriority: "border-red-500/30",
		},
		submitted: "2 mins ago",
		estimatedTime: "3 mins",
		user: "John Doe",
	},
	{
		id: "Q-00846",
		process: "Contract Review",
		status: "pending",
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-blue-500/30",
		},
		submitted: "5 mins ago",
		estimatedTime: "8 mins",
		user: "Jane Smith",
	},
	{
		id: "Q-00845",
		process: "Data Extraction",
		status: "completed",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "12 mins ago",
		completedIn: "4 mins",
		user: "Bob Johnson",
	},
	{
		id: "Q-00844",
		process: "Email Automation",
		status: "failed",
		priority: {
			priorityLevel: "urgent",
		},
		submitted: "15 mins ago",
		error: "Connection timeout",
		user: "Alice Williams",
	},
	{
		id: "Q-00843",
		process: "Report Generation",
		status: "pending",
		priority: {
			priorityLevel: "low",
		},
		submitted: "18 mins ago",
		estimatedTime: "12 mins",
		user: "Charlie Brown",
	},
	{
		id: "Q-00842",
		process: "Invoice Processing",
		status: "processing",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "22 mins ago",
		estimatedTime: "5 mins",
		user: "Diana Prince",
	},
	{
		id: "Q-00841",
		process: "Contract Review",
		status: "completed",
		priority: {
			priorityLevel: "high",
		},
		submitted: "25 mins ago",
		completedIn: "6 mins",
		user: "Eve Martinez",
	},
	{
		id: "Q-00840",
		process: "Data Extraction",
		status: "paused",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "30 mins ago",
		reason: "Awaiting input",
		user: "Frank Castle",
	},
];
