import {
	QUEUE_TYPE_STYLES,
	type QueueStatsType,
	type QueueItemPriority,
} from "@/config/internal/queue-data-config";

interface StatusIconProps {
	status: Lowercase<QueueStatsType>;
}

export function StatusIcon({ status }: StatusIconProps) {
	const styles = QUEUE_TYPE_STYLES[status] || QUEUE_TYPE_STYLES.default;
	const IconComponent = styles.icon;
	return <IconComponent className={`w-5 h-5 ${styles.classNameColor}`} />;
}

interface StatusBadgeProps {
	status: Lowercase<QueueStatsType>;
	children?: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
	const styles = QUEUE_TYPE_STYLES[status as keyof typeof QUEUE_TYPE_STYLES];
	const IconComponent = styles.icon;
	return (
		<span
			className={`px-3 py-1 rounded-full text-xs font-medium ${styles.classNameBg} ${styles.classNameColor}`}
		>
			{IconComponent && <IconComponent className="w-3 h-3 inline-block mr-1" />}
			{children}
		</span>
	);
}

interface PriorityBadgeProps {
	priority: QueueItemPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
	const styles = QUEUE_TYPE_STYLES[priority] || QUEUE_TYPE_STYLES.default;
	const prio = styles.priority ? styles.priority : QUEUE_TYPE_STYLES.default.priority;
	return (
		<span
			className={`px-3 py-1 rounded-full text-xs font-medium border ${styles.classNameBg} ${styles.classNameColor} ${prio?.classNamePriority}`}
		>
			{prio?.priorityLevel ? prio.priorityLevel.toUpperCase() : ""}
		</span>
	);
}
