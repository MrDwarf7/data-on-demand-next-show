import type { NewsCategory } from "@/lib/news-utils";
import type { ValueAndLabel } from "@/types/common";

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
	announcement: "Announcements",
	maintenance: "Maintenance",
	update: "Updates",
	alert: "Alerts",
};

export type NewsCategoryExt = NewsCategory | "all";

export const NEWS_CATEGORIES = [
	{ value: "all", label: "All News" },
	...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
		value: value as NewsCategory,
		label,
	})),
] as const satisfies readonly ValueAndLabel<NewsCategoryExt, string>[];

export const NEWS_CATEGORY_VALUES = {
	ALL: "all",
	ANNOUNCEMENT: "announcement",
	MAINTENANCE: "maintenance",
	UPDATE: "update",
	ALERT: "alert",
} as const;
