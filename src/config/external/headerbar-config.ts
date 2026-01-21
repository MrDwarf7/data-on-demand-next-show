import { EXTERNAL_ICONS } from "@/constants/icons";
import { INTERNAL_PATHS, PATHS } from "@/constants/paths";
import type { TileProps } from "@/types/local";

// We ideally something like Pick<T, "title" | "path" | "icon"> --
// but making "icon" the _only_ Partial field - hmm
export interface ExternalMenuItem extends Pick<TileProps, "title" | "path" | "icon"> {}

// TODO: [consolidate - paths] : Use same const array across application for paths

// Naming things is hard okay...
export const EXTERNAL_MENU_ITEMS_HIDDEN_PATHS = ["/", "/internal"];

export const EXTERNAL_MENU_ITEMS: ExternalMenuItem[] = [
	{
		title: "Home",
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
	{
		title: "Contact Us",
		path: PATHS.CONTACT,
		icon: EXTERNAL_ICONS.contact,
	},
	{
		title: "Dashboard",
		path: INTERNAL_PATHS.DASHBOARD,
		icon: EXTERNAL_ICONS.dashboard,
	},
	// {
	// 	title: "Login",
	// 	path: "/login",
	// },
];
