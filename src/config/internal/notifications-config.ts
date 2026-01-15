import type { ClassNameDataWithIcon } from "@/config/external/statistics-config";
import { INTERNAL_PATHS } from "@/constants/paths";
import type { StatusType } from "@/types/common";
import { createStyleGetter } from "@/utils/lookups";

export type NotificationType = StatusType;

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
		classNameBg: "bg-success-10",
		classNameBorder: "border-success-30",
		classNameColor: "text-success-foreground",
		iconColor: "bg-success-20 text-success-foreground",
		icon: "✓",
	},
	warning: {
		classNameBg: "bg-warning-10",
		classNameBorder: "border-warning-30",
		classNameColor: "text-warning-foreground",
		iconColor: "bg-warning-20 text-warning-foreground",
	},
	error: {
		classNameBg: "bg-error-10",
		classNameBorder: "border-error-30",
		classNameColor: "text-error-foreground",
		iconColor: "bg-error-20 text-error-foreground",
	},
	info: {
		classNameBg: "bg-info-10",
		classNameBorder: "border-info-30",
		classNameColor: "text-info-foreground",
		iconColor: "bg-info-20 text-info-foreground",
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
		actionLink: INTERNAL_PATHS.QUEUE_DATA,
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
	const styles = createStyleGetter(NOTIFICATION_STYLES)(type);
	return styles.icon;
};

export const getNotificationStyles = createStyleGetter(NOTIFICATION_STYLES);
