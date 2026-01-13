export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
	id: number;
	type: NotificationType;
	title: string;
	message: string;
	timestamp: string;
	read: boolean;
	actionLink?: string;
}

export const SAMPLE_NOTIFICATIONS: Notification[] = [
	{
		id: 1,
		type: "success",
		title: "Process Completed",
		message: "Invoice processing batch #847 has been completed successfully.",
		timestamp: "2 minutes ago",
		read: false,
	},
	{
		id: 2,
		type: "warning",
		title: "Queue Alert",
		message: "Queue volume is approaching 80% capacity. Consider reviewing priorities.",
		timestamp: "15 minutes ago",
		read: false,
	},
	{
		id: 3,
		type: "info",
		title: "System Update",
		message: "New features have been deployed to the dashboard. Check the changelog for details.",
		timestamp: "1 hour ago",
		read: false,
	},
	{
		id: 4,
		type: "error",
		title: "Processing Failed",
		message: "Document extraction failed for batch #832. Manual review required.",
		timestamp: "2 hours ago",
		read: true,
		actionLink: "/internal/dashboard/queue-data",
	},
	{
		id: 5,
		type: "success",
		title: "User Settings Updated",
		message: "Your notification preferences have been saved successfully.",
		timestamp: "3 hours ago",
		read: true,
	},
	{
		id: 6,
		type: "info",
		title: "Daily Summary",
		message: "Today's processing summary: 847 processes completed with 98.5% success rate.",
		timestamp: "5 hours ago",
		read: true,
	},
];

export const getNotificationIcon = (type: NotificationType) => {
	switch (type) {
		case "success":
			return "✓";
		case "warning":
			return "⚠";
		case "error":
			return "✕";
		default:
			return "ℹ";
	}
};

export const getNotificationStyles = (type: NotificationType) => {
	switch (type) {
		case "success":
			return {
				bg: "bg-green-500/10",
				border: "border-green-500/30",
				text: "text-green-600 dark:text-green-400",
				icon: "bg-green-500/20 text-green-600",
			};
		case "warning":
			return {
				bg: "bg-orange-500/10",
				border: "border-orange-500/30",
				text: "text-orange-600 dark:text-orange-400",
				icon: "bg-orange-500/20 text-orange-600",
			};
		case "error":
			return {
				bg: "bg-red-500/10",
				border: "border-red-500/30",
				text: "text-red-600 dark:text-red-400",
				icon: "bg-red-500/20 text-red-600",
			};
		default:
			return {
				bg: "bg-blue-500/10",
				border: "border-blue-500/30",
				text: "text-blue-600 dark:text-blue-400",
				icon: "bg-blue-500/20 text-blue-600",
			};
	}
};
