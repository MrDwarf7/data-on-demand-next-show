import type { JSX } from "react/jsx-runtime";
import { FiGlobe, FiList, FiMail, FiSend } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { INTERNAL_PATHS, PATHS } from "@/constants/paths";

export interface ExternalMenuItem {
	title: string;
	path: string;
	icon?: JSX.Element; // | IconType;
}

// TODO: [consolidate - paths] : Use same const array across application for paths

export const EXTERNAL_MENU_ITEMS = [
	{
		title: "Home",
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
	{
		title: "Contact Us",
		path: PATHS.CONTACT,
		icon: <FiMail />,
	},
	{
		title: "Dashboard",
		path: INTERNAL_PATHS.DASHBOARD,
	},
	// {
	// 	title: "Login",
	// 	path: "/login",
	// },
];
