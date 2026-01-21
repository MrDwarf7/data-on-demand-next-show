import { EXTERNAL_ICONS, INTERNAL_ICONS } from "@/constants/icons";
import { INTERNAL_PATHS, PATHS } from "@/constants/paths";

export const INTERNAL_SIDEBAR_ITEMS = [
	{
		title: "Navigation Menu",
		list: [
			{
				title: "Dashboard Home",
				path: INTERNAL_PATHS.DASHBOARD,
				icon: INTERNAL_ICONS.home,
			},

			{
				title: "Create News Post",
				path: INTERNAL_PATHS.CREATE_NEWS,
				icon: INTERNAL_ICONS.news,
			},

			{
				title: "External File-Flow",
				path: INTERNAL_PATHS.EXTERNAL_FILE_FLOW,
				icon: INTERNAL_ICONS.fileFlow,
			},

			{
				title: "Queue Data",
				path: INTERNAL_PATHS.QUEUE_DATA,
				icon: INTERNAL_ICONS.queueData,
			},

			{
				title: "Stats Overview",
				path: INTERNAL_PATHS.STATS_OVERVIEW,
				icon: INTERNAL_ICONS.statsOverview,
			},

			{
				title: "Settings",
				path: INTERNAL_PATHS.USER_SETTINGS,
				icon: INTERNAL_ICONS.settings,
			},

			{
				title: "Log out",
				path: INTERNAL_PATHS.LOGOUT,
				icon: INTERNAL_ICONS.logout,
			},
		],
	},
	// Possible to do a {...INTERNAL_MENU_ITEMS} to add the external links to the internal sidebar ?
	{
		title: "External Links",
		list: [
			{
				title: "External Home",
				path: PATHS.HOME,
				icon: EXTERNAL_ICONS.home,
			},

			{
				title: "News",
				path: PATHS.NEWS,
				icon: EXTERNAL_ICONS.news,
			},

			{
				title: "Statistics",
				path: PATHS.STATISTICS,
				icon: EXTERNAL_ICONS.statistics,
			},

			{
				title: "Upload Portal",
				path: PATHS.UPLOAD_PORTAL,
				icon: EXTERNAL_ICONS.upload,
			},
		],
	},
];

// TODO
// Could use something like this to rename the external links to for use in the internal sidebar, render in the actual sidebar component though.

// const RENAMED_EXTERNAL_MENU_ITEMS = EXTERNAL_MENU_ITEMS.map(item => ({
// 	...item,
// 	title: `Internal ${item.title}` // rename the title
//   }));

//   const ALL_MENU_ITEMS = [
// 	...INTERNAL_MENU_ITEMS,
// 	...RENAMED_EXTERNAL_MENU_ITEMS
//   ];
