export const NEWS_POSTS = [
	{
		id: 1,
		title: "System Maintenance Scheduled",
		blurb: "Planned maintenance window this weekend",
		content:
			"We will be performing scheduled maintenance on our automation systems this Saturday from 2:00 AM to 6:00 AM EST. During this time, some services may be temporarily unavailable.",
		category: "maintenance",
		priority: "high",
		date: "2024-01-15",
		author: "IT Team",
	},
	{
		id: 2,
		title: "New Invoice Processing Feature Released",
		blurb: "Enhanced invoice processing now available",
		content:
			"We've released a new feature that automatically categorizes invoices based on vendor and amount. This will significantly reduce processing time and improve accuracy.",
		category: "update",
		priority: "normal",
		date: "2024-01-12",
		author: "Product Team",
	},
	{
		id: 3,
		title: "Processing Delays - Resolved",
		blurb: "Issue with queue processing has been resolved",
		content:
			"The processing delays experienced earlier today have been fully resolved. All queued items are now being processed normally. We apologize for any inconvenience.",
		category: "alert",
		priority: "urgent",
		date: "2024-01-10",
		author: "Operations Team",
	},
	{
		id: 4,
		title: "Monthly Performance Report Available",
		blurb: "December performance metrics now available",
		content:
			"The monthly performance report for December is now available in the Statistics section. Key highlights include a 15% improvement in processing speed and 99.2% uptime.",
		category: "announcement",
		priority: "low",
		date: "2024-01-08",
		author: "Analytics Team",
	},
];

export const NEWS_CATEGORIES = [
	{ value: "all", label: "All News" },
	{ value: "announcement", label: "Announcements" },
	{ value: "maintenance", label: "Maintenance" },
	{ value: "update", label: "Updates" },
	{ value: "alert", label: "Alerts" },
];
