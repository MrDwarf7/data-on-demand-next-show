export const NEWS_CATEGORIES = [
	{ value: "all", label: "All News" },
	{ value: "announcement", label: "Announcements" },
	{ value: "maintenance", label: "Maintenance" },
	{ value: "update", label: "Updates" },
	{ value: "alert", label: "Alerts" },
] as const;

export const NEWS_CATEGORY_VALUES = {
	ALL: "all",
	ANNOUNCEMENT: "announcement",
	MAINTENANCE: "maintenance",
	UPDATE: "update",
	ALERT: "alert",
} as const;

export type NewsCategory = (typeof NEWS_CATEGORY_VALUES)[keyof typeof NEWS_CATEGORY_VALUES];
