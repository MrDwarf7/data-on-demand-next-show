import type { JSX } from "react/jsx-runtime";
import { FiGlobe, FiList, FiMail, FiSend } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";

export interface ExternalMenuItem {
	title: string;
	path: string;
	icon?: JSX.Element; // | IconType;
}

// TODO: [consolidate - paths] : Use same const array across application for paths

export const EXTERNAL_MENU_ITEMS = [
	{
		title: "Home",
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
	{
		title: "Contact Us",
		path: "/contact",
		icon: <FiMail />,
	},
	{
		title: "Dashboard",
		path: "/internal/dashboard",
	},
	// {
	// 	title: "Login",
	// 	path: "/login",
	// },
];
