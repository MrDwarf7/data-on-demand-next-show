import type { IconType } from "react-icons";
import { FiBell, FiGlobe, FiLock, FiUser } from "react-icons/fi";
import type { ValueAndLabel } from "@/types/common";

export interface SettingsSection extends ValueAndLabel<SettingsSectionId> {
	// value: SettingsSectionId | ValueAndLabel["value"];
	icon: IconType;
	classNameIcon?: string;
}

export const SETTINGS_SECTIONS: SettingsSection[] = [
	{ value: "profile", label: "Profile", icon: FiUser, classNameIcon: "w-4 h-4" },
	{
		value: "notifications",
		label: "Notifications",
		icon: FiBell,
		classNameIcon: "w-4 h-4",
	},
	{ value: "security", label: "Security", icon: FiLock, classNameIcon: "w-4 h-4" },
	{
		value: "preferences",
		label: "Preferences",
		icon: FiGlobe,
		classNameIcon: "w-4 h-4",
	},
];

export const SETTINGS_SECTION_VALUES = {
	PROFILE: "profile",
	NOTIFICATIONS: "notifications",
	SECURITY: "security",
	PREFERENCES: "preferences",
} as const;

export type SettingsSectionId =
	(typeof SETTINGS_SECTION_VALUES)[keyof typeof SETTINGS_SECTION_VALUES];

export const LANGUAGE_OPTIONS: ValueAndLabel[] = [
	{ value: "en-us", label: "English (US)" },
	{ value: "en-uk", label: "English (UK)" },
	{ value: "es", label: "Spanish" },
	{ value: "fr", label: "French" },
	{ value: "de", label: "German" },
];

export const TIMEZONE_OPTIONS: ValueAndLabel[] = [
	{ value: "utc", label: "UTC (GMT +0:00)" },
	{ value: "est", label: "EST (GMT -5:00)" },
	{ value: "pst", label: "PST (GMT -8:00)" },
	{ value: "cet", label: "CET (GMT +1:00)" },
	{ value: "jst", label: "JST (GMT +9:00)" },
];

export const DATE_FORMAT_OPTIONS: ValueAndLabel[] = [
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
