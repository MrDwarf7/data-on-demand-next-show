/**
 * Utility functions for news-related styling
 */

import type { Priority } from "@/types/common";
import { lookupStyleOf } from "@/utils/lookups";

export type NewsPriority = Priority;
export type NewsCategory = "announcement" | "maintenance" | "update" | "alert";

const NEWS_PRIORITY_STYLES: Record<NewsPriority, string> = {
	urgent: "bg-error-20 text-error-foreground border-error-30",
	high: "bg-warning-20 text-warning-foreground border-warning-30",
	normal: "bg-info-20 text-info-foreground border-info-30",
	low: "bg-neutral-20 text-neutral-foreground border-neutral-30",
};

const NEWS_PRIORITY_PREVIEW_STYLES: Record<NewsPriority, string> = {
	urgent: "bg-error-20 text-error-foreground",
	high: "bg-warning-20 text-warning-foreground",
	normal: "bg-info-20 text-info-foreground",
	low: "bg-neutral-20 text-neutral-foreground",
};

const NEWS_CATEGORY_COLORS: Record<NewsCategory, string> = {
	announcement: "text-info-foreground",
	maintenance: "text-warning-foreground",
	update: "text-success-foreground",
	alert: "text-error-foreground",
};

/**
 * Get the CSS classes for priority badges
 */
export const getPriorityBadge = (priority: string) => {
	return lookupStyleOf(NEWS_PRIORITY_STYLES, priority as NewsPriority);
};

/**
 * Get the CSS classes for category colors
 */
export const getCategoryColor = (category: string) => {
	return lookupStyleOf(NEWS_CATEGORY_COLORS, category as NewsCategory);
};

/**
 * Get the CSS classes for priority preview badges (without border)
 */
export const getPriorityPreviewClass = (priority: string) => {
	return lookupStyleOf(NEWS_PRIORITY_PREVIEW_STYLES, priority as NewsPriority);
};
