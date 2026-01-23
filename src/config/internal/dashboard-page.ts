import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import { FiEdit, FiLogOut, FiSettings } from "react-icons/fi";
import { MdUploadFile } from "react-icons/md";
import type { DashboardTipsProps } from "@/app/internal/dashboard/_components/DashboardTips";
import { INTERNAL_PATHS } from "@/constants/paths";
import type { ClassNameDataWithIcon } from "@/types/common";

interface DashboardCard extends Partial<ClassNameDataWithIcon> {
	title: string;
	description: string;
	path: string;
	iconColor: string;
}

export const DASHBOARD_TIPS: DashboardTipsProps = {
	mainTitle: "Hot Tips",
	subsections: [
		{
			subTitle: "Getting Started",
			blurb:
				"Use the sidebar to navigate between different sections. Each module provides specific tools for managing your automation workflows.",
		},
		{
			subTitle: "Need Help?",
			blurb:
				"If you have questions or encounter issues, refer to the documentation or contact the support team for assistance.",
		},
	],
};

export const DASHBOARD_CARDS: DashboardCard[] = [
	{
		title: "Create News Post",
		description: "Publish news updates and announcements for users",
		path: INTERNAL_PATHS.CREATE_NEWS,
		icon: FiEdit,
		classNameColor: "bg-info-20 hover:bg-info-30",
		iconColor: "text-info-foreground",
	},
	{
		title: "External File-Flow",
		description: "Manage and monitor external file uploads and processing",
		path: INTERNAL_PATHS.EXTERNAL_FILE_FLOW,
		icon: MdUploadFile,
		classNameColor: "bg-success-20 hover:bg-success-30",
		iconColor: "text-success-foreground",
	},
	{
		title: "Queue Data",
		description: "View and manage processing queues and job status",
		path: INTERNAL_PATHS.QUEUE_DATA,
		icon: AiOutlineInteraction,
		classNameColor: "bg-info-20 hover:bg-info-30",
		iconColor: "text-info-foreground",
	},
	{
		title: "Stats Overview",
		description: "Monitor system statistics and performance metrics",
		path: INTERNAL_PATHS.STATS_OVERVIEW,
		icon: AiOutlineBarChart,
		classNameColor: "bg-warning-20 hover:bg-warning-30",
		iconColor: "text-warning-foreground",
	},
	{
		title: "Settings",
		description: "Configure your account and system preferences",
		path: INTERNAL_PATHS.USER_SETTINGS,
		icon: FiSettings,
		classNameColor: "bg-neutral-30 hover:bg-neutral-30",
		iconColor: "text-neutral-foreground",
	},
	{
		title: "Logout",
		description: "Log out of your account securely",
		path: INTERNAL_PATHS.LOGOUT,
		icon: FiLogOut,
		classNameColor: "bg-neutral-10 hover:bg-neutral-30",
		iconColor: "text-neutral-foreground",
	},
];
