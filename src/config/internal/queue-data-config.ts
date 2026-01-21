import { MOCK_USERS } from "@/constants/mock-users";
import type { PRIORITIES } from "@/constants/priorities";
import { PROCESSES } from "@/constants/processes";
import { STATUS_STYLES } from "@/constants/statuses";
import type { ClassNameDataWithIcon, Priority, PriorityLevelData } from "@/types/common";
import { createStyleGetter } from "@/utils/lookups";
import { FiClock } from "react-icons/fi";

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

// export type QueueTypePriority = Priority;

// export interface QueueTypeStyle extends Record<typeof QUEUE_FILTERS[number], ClassNameDataWithIcon> {
// 	priority: QueueTypePriority;
// }

// export type PriorityLevelData = {
// 	priorityLevel?: QueueTypePriority;
// 	classNamePriority?: string;
// };

export interface ClassNameDataWithIconPriority extends ClassNameDataWithIcon {
	priority?: PriorityLevelData;
}

export const QUEUE_TYPE_STYLES: Record<
	Lowercase<QueueStatsType> | Priority | "default",
	ClassNameDataWithIconPriority
> = {
	all: {
		...STATUS_STYLES.all,
		priority: {
			priorityLevel: "low",
			classNamePriority: "border-neutral-30",
		},
	},

	completed: {
		...STATUS_STYLES.completed,
		priority: {
			priorityLevel: "high",
			classNamePriority: "border-success-30",
		},
	},

	failed: {
		...STATUS_STYLES.failed,
		priority: {
			priorityLevel: "urgent",
			classNamePriority: "border-error-30",
		},
	},

	pending: {
		...STATUS_STYLES.pending,
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-info-30",
		},
	},

	processing: {
		...STATUS_STYLES.processing,
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-info-30",
		},
	},

	paused: {
		...STATUS_STYLES.paused,
		priority: {
			priorityLevel: "high",
			classNamePriority: "border-warning-30",
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

export const getQueueStyles = createStyleGetter(QUEUE_TYPE_STYLES);

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

export type QueueItemPriority = (typeof PRIORITIES)[number];

export interface QueueItem extends Partial<Record<QueueStatsType, string>> {
	id: string;
	process: string;
	status: Lowercase<QueueStatsType>;
	priority: PriorityLevelData;
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
		process: PROCESSES[0],
		status: "processing",
		priority: {
			priorityLevel: "high",
			classNamePriority: "border-red-500/30",
		},
		submitted: "2 mins ago",
		estimatedTime: "3 mins",
		user: MOCK_USERS[0],
	},
	{
		id: "Q-00846",
		process: PROCESSES[1],
		status: "pending",
		priority: {
			priorityLevel: "normal",
			classNamePriority: "border-blue-500/30",
		},
		submitted: "5 mins ago",
		estimatedTime: "8 mins",
		user: MOCK_USERS[1],
	},
	{
		id: "Q-00845",
		process: PROCESSES[2],
		status: "completed",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "12 mins ago",
		completedIn: "4 mins",
		user: MOCK_USERS[2],
	},
	{
		id: "Q-00844",
		process: PROCESSES[3],
		status: "failed",
		priority: {
			priorityLevel: "urgent",
		},
		submitted: "15 mins ago",
		error: "Connection timeout",
		user: MOCK_USERS[3],
	},
	{
		id: "Q-00843",
		process: PROCESSES[4],
		status: "pending",
		priority: {
			priorityLevel: "low",
		},
		submitted: "18 mins ago",
		estimatedTime: "12 mins",
		user: MOCK_USERS[4],
	},
	{
		id: "Q-00842",
		process: PROCESSES[0],
		status: "processing",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "22 mins ago",
		estimatedTime: "5 mins",
		user: MOCK_USERS[5],
	},
	{
		id: "Q-00841",
		process: PROCESSES[1],
		status: "completed",
		priority: {
			priorityLevel: "high",
		},
		submitted: "25 mins ago",
		completedIn: "6 mins",
		user: MOCK_USERS[6],
	},
	{
		id: "Q-00840",
		process: PROCESSES[2],
		status: "paused",
		priority: {
			priorityLevel: "normal",
		},
		submitted: "30 mins ago",
		reason: "Awaiting input",
		user: MOCK_USERS[7],
	},
];
