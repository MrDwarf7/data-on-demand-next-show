import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import { FiEdit, FiGlobe, FiHome, FiList, FiLogOut, FiSend, FiSettings } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdUploadFile } from "react-icons/md";

export const INTERNAL_SIDEBAR_ITEMS = [
	{
		title: "Navigation Menu",
		list: [
			{
				title: "Dashboard Home",
				path: "/internal/dashboard",
				icon: <FiHome />,
			},

			{
				title: "Create News Post",
				path: "/internal/dashboard/create-news",
				icon: <FiEdit />,
			},

			{
				title: "External File-Flow",
				path: "/internal/dashboard/external-file-flow",
				icon: <MdUploadFile />,
			},

			{
				title: "Queue Data",
				path: "/internal/dashboard/queue-data",
				icon: <AiOutlineInteraction />,
			},

			{
				title: "Stats Overview",
				path: "/internal/dashboard/stats-overview",
				icon: <AiOutlineBarChart />,
			},

			{
				title: "Settings",
				path: "/internal/dashboard/user-settings",
				icon: <FiSettings />,
			},

			{
				title: "Log out",
				path: "/internal/logout",
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
				path: "/",
				icon: <FiGlobe />,
			},

			{
				title: "News",
				path: "/news",
				icon: <FiList />,
			},

			{
				title: "Statistics",
				path: "/statistics",
				icon: <HiOutlineChartBar />,
			},

			{
				title: "Upload Portal",
				path: "/upload-portal",
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
