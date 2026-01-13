import { FiBell, FiGlobe, FiLock, FiUser } from "react-icons/fi";
import type { LabelValuePair } from "../external/contact-config";

export const SETTINGS_SECTIONS = [
	{ id: "profile", label: "Profile", icon: <FiUser className="w-4 h-4" /> },
	{
		id: "notifications",
		label: "Notifications",
		icon: <FiBell className="w-4 h-4" />,
	},
	{ id: "security", label: "Security", icon: <FiLock className="w-4 h-4" /> },
	{
		id: "preferences",
		label: "Preferences",
		icon: <FiGlobe className="w-4 h-4" />,
	},
];

export const LANGUAGE_OPTIONS: LabelValuePair[] = [
	{ value: "en-us", label: "English (US)" },
	{ value: "en-uk", label: "English (UK)" },
	{ value: "es", label: "Spanish" },
	{ value: "fr", label: "French" },
	{ value: "de", label: "German" },
];

export const TIMEZONE_OPTIONS: LabelValuePair[] = [
	{ value: "utc", label: "UTC (GMT +0:00)" },
	{ value: "est", label: "EST (GMT -5:00)" },
	{ value: "pst", label: "PST (GMT -8:00)" },
	{ value: "cet", label: "CET (GMT +1:00)" },
	{ value: "jst", label: "JST (GMT +9:00)" },
];

export const DATE_FORMAT_OPTIONS: LabelValuePair[] = [
	{ value: "mdy", label: "MM/DD/YYYY" },
	{ value: "dmy", label: "DD/MM/YYYY" },
	{ value: "ymd", label: "YYYY-MM-DD" },
];

export const EMAIL_DIGEST_OPTIONS = ["Daily", "Weekly", "Monthly"];

export const PROFILE_CONFIG = {
	avatarMaxSize: "2MB",
	avatarFormats: "JPG, PNG or GIF",
	bioRows: 4,
};
