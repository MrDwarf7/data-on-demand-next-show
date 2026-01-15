import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import { FiEdit, FiGlobe, FiHome, FiList, FiLogOut, FiSend, FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdUploadFile } from "react-icons/md";
import { INTERNAL_PATHS, PATHS } from "@/constants/paths";

export const INTERNAL_SIDEBAR_ITEMS = [
	{
		title: "Navigation Menu",
		list: [
			{
				title: "Dashboard Home",
				path: INTERNAL_PATHS.DASHBOARD,
				icon: <FiHome />,
			},

			{
				title: "Create News Post",
				path: INTERNAL_PATHS.CREATE_NEWS,
				icon: <FiEdit />,
			},

			{
				title: "External File-Flow",
				path: INTERNAL_PATHS.EXTERNAL_FILE_FLOW,
				icon: <MdUploadFile />,
			},

			{
				title: "Queue Data",
				path: INTERNAL_PATHS.QUEUE_DATA,
				icon: <AiOutlineInteraction />,
			},

			{
				title: "Stats Overview",
				path: INTERNAL_PATHS.STATS_OVERVIEW,
				icon: <AiOutlineBarChart />,
			},

			{
				title: "Settings",
				path: INTERNAL_PATHS.USER_SETTINGS,
				icon: <FiSettings />,
			},

			{
				title: "Log out",
				path: INTERNAL_PATHS.LOGOUT,
				icon: <FiLogOut />,
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
				icon: <FiGlobe />,
			},

			{
				title: "News",
				path: PATHS.NEWS,
				icon: <FiList />,
			},

			{
				title: "Statistics",
				path: PATHS.STATISTICS,
				icon: <HiOutlineChartBar />,
			},

			{
				title: "Upload Portal",
				path: PATHS.UPLOAD_PORTAL,
				icon: <FiSend />,
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
