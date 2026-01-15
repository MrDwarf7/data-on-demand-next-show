/**
 * Utility functions for news-related styling
 */

/**
 * Get the CSS classes for priority badges
 */
export const getPriorityBadge = (priority: string) => {
	const styles = {
		urgent: "bg-red-500/20 text-red-600 border-red-500/30",
		high: "bg-orange-500/20 text-orange-600 border-orange-500/30",
		normal: "bg-blue-500/20 text-blue-600 border-blue-500/30",
		low: "bg-gray-500/20 text-gray-600 border-gray-500/30",
	};
	return styles[priority as keyof typeof styles] || styles.normal;
};

/**
 * Get the CSS classes for category colors
 */
export const getCategoryColor = (category: string) => {
	const colors = {
		announcement: "text-blue-600",
		maintenance: "text-orange-600",
		update: "text-green-600",
		alert: "text-red-600",
	};
	return colors[category as keyof typeof colors] || "text-gray-600";
};
