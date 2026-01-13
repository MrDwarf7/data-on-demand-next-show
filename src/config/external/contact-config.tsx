import { FiClock, FiMail } from "react-icons/fi";
import type { ClassNameDataWithIcon } from "./statistics-config";

export interface ContactInfo extends ClassNameDataWithIcon {
	title: string;
	content: string;
	link: string | null;
}

export interface LabelValuePair {
	value: string;
	label: string;
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
	// {
	// 	// icon: <FiPhone className="w-6 h-6" />,
	// 	icon: FiPhone,
	// 	title: "Call Us",
	// 	content: "+1 (555) 123-4567",
	// 	link: "tel:+15551234567",
	// 	classNameColor: "text-green-600",
	// 	classNameBg: "bg-green-500/10",
	// },
	// {
	// 	// icon: <FiMapPin className="w-6 h-6" />,
	// 	icon: FiMapPin,
	// 	title: "Visit Us",
	// 	content: "123 Automation St, Tech City, TC 12345",
	// 	link: null,
	// 	classNameColor: "text-purple-600",
	// 	classNameBg: "bg-purple-500/10",
	// },
	{
		// icon: <FiClock className="w-6 h-6" />,
		icon: FiClock,
		title: "Office Hours",
		content: "Monday - Friday: 7:00 AM - 5:00 PM + Saturday",
		link: null,
		classNameColor: "text-orange-600",
		classNameBg: "bg-orange-500/10",
	},
];

export const CONTACT_SUBJECTS: LabelValuePair[] = [
	{ value: "general", label: "General Inquiry" },
	{ value: "support", label: "Technical Support" },
	{ value: "feedback", label: "Feedback" },
	{ value: "partnership", label: "Partnership Opportunity" },
	{ value: "other", label: "Other" },
];

export interface FormConfig {
	namePlaceholder: string;
	emailPlaceholder: string;
	messagePlaceholder: string;
	messageRows: number;
}

export const FORM_CONFIG: FormConfig = {
	namePlaceholder: "Your name",
	emailPlaceholder: "your.email@company.com",
	messagePlaceholder: "Tell us how we can help you...",
	messageRows: 6,
};
