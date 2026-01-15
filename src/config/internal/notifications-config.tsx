import type { ClassNameDataWithIcon } from "@/config/external/statistics-config";
import { lookupStyleOf } from "@/utils/lookups";

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

// We want to _only_ change the type of the icon property here
// we want to make it EITHER IconType OR string
export interface NotificationStyle extends Omit<ClassNameDataWithIcon, "icon"> {
	// bg: string;
	classNameBorder: string;
	// classNameText: string;
	iconColor: string;
	icon?: keyof ClassNameDataWithIcon["icon"] | string;
}

export const NOTIFICATION_STYLES: Record<NotificationType, NotificationStyle> = {
	success: {
		classNameBg: "bg-green-500/10",
		classNameBorder: "border-green-500/30",
		classNameColor: "text-green-600 dark:text-green-400",
		iconColor: "bg-green-500/20 text-green-600",
		icon: "✓",
	},
	warning: {
		classNameBg: "bg-orange-500/10",
		classNameBorder: "border-orange-500/30",
		classNameColor: "text-orange-600 dark:text-orange-400",
		iconColor: "bg-orange-500/20 text-orange-600",
	},
	error: {
		classNameBg: "bg-red-500/10",
		classNameBorder: "border-red-500/30",
		classNameColor: "text-red-600 dark:text-red-400",
		iconColor: "bg-red-500/20 text-red-600",
	},
	info: {
		classNameBg: "bg-blue-500/10",
		classNameBorder: "border-blue-500/30",
		classNameColor: "text-blue-600 dark:text-blue-400",
		iconColor: "bg-blue-500/20 text-blue-600",
	},
};

// TODO: [consolidate - paths] : Use same const array across application for paths
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
	const styles = lookupStyleOf(NOTIFICATION_STYLES, type);
	return styles.icon;
};

export const getNotificationStyles = (type: NotificationType) => {
	return lookupStyleOf(NOTIFICATION_STYLES, type);
};
