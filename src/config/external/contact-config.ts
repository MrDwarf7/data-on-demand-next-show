import { FiClock, FiMail } from "react-icons/fi";
import type { ClassNameDataWithIcon, ValueAndLabel } from "@/types/common";

export interface ContactInfo extends ClassNameDataWithIcon {
	title: string;
	content: string;
	link: string | null;
}

export const CONTACT_INFO: ContactInfo[] = [
	{
		icon: FiMail,
		title: "Email Us",
		content: "smartautomation@company.com",
		link: "mailto:smartautomation@company.com",
		classNameColor: "text-blue-600",
		classNameBg: "bg-blue-500/10",
	},
	{
		icon: FiClock,
		title: "Office Hours",
		content: "Monday - Friday: 7:00 AM - 5:00 PM + Saturday",
		link: null,
		classNameColor: "text-orange-600",
		classNameBg: "bg-orange-500/10",
	},
];

export type ContactLabel = "general" | "support" | "feedback" | "partnership" | "other";

export const CONTACT_LABELS: Record<ContactLabel, string> = {
	general: "General Inquiry",
	support: "Technical Support",
	feedback: "Feedback",
	partnership: "Partnership Opportunity",
	other: "Other",
};

export const CONTACT_SUBJECTS = [
	...Object.entries(CONTACT_LABELS).map(([value, label]) => ({
		value: value as ContactLabel,
		label: label,
	})),
] as const satisfies readonly ValueAndLabel<ContactLabel, string>[];

export type FormLabel = "namePlaceholder" | "emailPlaceholder" | "messagePlaceholder";
export type FormLabelExt = FormLabel | "messageRows";

export const FORM_LABELS: Record<FormLabelExt, string | number> = {
	namePlaceholder: "Your name",
	emailPlaceholder: "your.email@company.com",
	messagePlaceholder: "Tell us how we can help you...",
	messageRows: 4,
};

const spreadKeys = <K extends keyof object, V = string | number | symbol>(
	obj: Record<K, V>,
	keys: string[]
) => {
	return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)));
};

// const FORM_CONFIG = {
// 	...Object.fromEntries(
// 		Object.entries(FORM_LABELS).filter(([key]) =>
// 			["namePlaceholder", "emailPlaceholder", "messagePlaceholder", "messageRows"].includes(key)
// 		)
// 	),
// } as const;

export const FORM_CONFIG = spreadKeys(FORM_LABELS, [
	"namePlaceholder",
	"emailPlaceholder",
	"messagePlaceholder",
	"messageRows",
]) as unknown as FormConfig; // HACK: somewhat dirty way to assert the type, but is required because of the way Object.* works sadly

export interface FormConfig {
	namePlaceholder: string;
	emailPlaceholder: string;
	messagePlaceholder: string;
	messageRows: number;
}
