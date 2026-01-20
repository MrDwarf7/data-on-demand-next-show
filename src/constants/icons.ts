import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import {
	FiEdit,
	FiGlobe,
	FiHome,
	FiList,
	FiLogOut,
	FiMail,
	FiSend,
	FiSettings,
} from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdUploadFile } from "react-icons/md";

export const EXTERNAL_ICONS = {
	home: FiGlobe,
	news: FiList,
	statistics: HiOutlineChartBar,
	upload: FiSend,
	contact: FiMail,
	dashboard: FiHome,
};

export const INTERNAL_ICONS = {
	home: FiHome,
	news: FiEdit,
	fileFlow: MdUploadFile,
	queueData: AiOutlineInteraction,
	statsOverview: AiOutlineBarChart,
	settings: FiSettings,
	logout: FiLogOut,
};
