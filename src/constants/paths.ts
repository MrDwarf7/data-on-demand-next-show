// Path constants for the application

// External routes
export const PATHS = {
	HOME: "/",
	NEWS: "/news",
	STATISTICS: "/statistics",
	UPLOAD_PORTAL: "/upload-portal",
	CONTACT: "/contact",
	LOGIN: "/login",
} as const;

// Internal routes
export const INTERNAL_PATHS = {
	DASHBOARD: "/internal/dashboard",
	CREATE_NEWS: "/internal/dashboard/create-news",
	EXTERNAL_FILE_FLOW: "/internal/dashboard/external-file-flow",
	QUEUE_DATA: "/internal/dashboard/queue-data",
	STATS_OVERVIEW: "/internal/dashboard/stats-overview",
	USER_SETTINGS: "/internal/dashboard/user-settings",
	LOGOUT: "/internal/logout",
} as const;

// API routes
export const API_PATHS = {
	EXTERNAL_STATISTICS: "/api/external/statistics",
	HELLO: "/api/hello",
} as const;

// All paths
export const ALL_PATHS = {
	...PATHS,
	...INTERNAL_PATHS,
	...API_PATHS,
} as const;
