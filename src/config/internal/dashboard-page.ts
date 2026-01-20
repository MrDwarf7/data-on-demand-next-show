import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import { FiEdit, FiSettings } from "react-icons/fi";
import { MdUploadFile } from "react-icons/md";
import { INTERNAL_PATHS } from "@/constants/paths";
import type { ClassNameDataWithIcon } from "@/types/common";

interface DashboardCard extends Partial<ClassNameDataWithIcon> {
	title: string;
	description: string;
	path: string;
	iconColor: string;
}

export const DASHBOARD_CARDS: DashboardCard[] = [
	{
		title: "Create News Post",
		description: "Publish news updates and announcements for users",
		path: INTERNAL_PATHS.CREATE_NEWS,
		icon: FiEdit,
		// <FiEdit className="w-8 h-8" />,
		classNameColor: "bg-info-20 hover:bg-info-30",
		iconColor: "text-info-foreground",
	},
	{
		title: "External File-Flow",
		description: "Manage and monitor external file uploads and processing",
		path: INTERNAL_PATHS.EXTERNAL_FILE_FLOW,
		// icon: <MdUploadFile className="w-8 h-8" />,
		icon: MdUploadFile,
		classNameColor: "bg-success-20 hover:bg-success-30",
		iconColor: "text-success-foreground",
	},
	{
		title: "Queue Data",
		description: "View and manage processing queues and job status",
		path: INTERNAL_PATHS.QUEUE_DATA,
		// icon: <AiOutlineInteraction className="w-8 h-8" />,
		icon: AiOutlineInteraction,
		classNameColor: "bg-info-20 hover:bg-info-30",
		iconColor: "text-info-foreground",
	},
	{
		title: "Stats Overview",
		description: "Monitor system statistics and performance metrics",
		path: INTERNAL_PATHS.STATS_OVERVIEW,
		// icon: <AiOutlineBarChart className="w-8 h-8" />,
		icon: AiOutlineBarChart,
		classNameColor: "bg-warning-20 hover:bg-warning-30",
		iconColor: "text-warning-foreground",
	},
	{
		title: "Settings",
		description: "Configure your account and system preferences",
		path: INTERNAL_PATHS.USER_SETTINGS,
		// icon: <FiSettings className="w-8 h-8" />,
		icon: FiSettings,
		classNameColor: "bg-neutral-20 hover:bg-neutral-30",
		iconColor: "text-neutral-foreground",
	},
];
