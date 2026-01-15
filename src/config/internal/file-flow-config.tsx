import { FiAlertCircle, FiCheckCircle, FiClock, FiUpload } from "react-icons/fi";
import type { ClassNameDataWithIcon } from "@/config/external/statistics-config";
import type { LabelValuePair } from "../external/contact-config";

// TODO: Flatten out the data in here and ensure we're not repeating things,
// once we're calling API's and such it will be easier to manage though.

export interface FileStat extends ClassNameDataWithIcon {
	lv: LabelValuePair;
}

export type FileTabType = (typeof FILE_TABS)[number];

export const FILE_TABS = ["recent", "processed", "processing", "failed"] as const;

export const STATUS_BADGE_STYLES: Record<string, ClassNameDataWithIcon> = {
	processed: {
		icon: FiCheckCircle,
		classNameColor: "text-green-600",
		classNameBg: "bg-green-500/10",
	},
	processing: {
		icon: FiClock,
		classNameColor: "text-purple-600",
		classNameBg: "bg-purple-500/10",
	},
	failed: {
		icon: FiAlertCircle,
		classNameColor: "text-red-600",
		classNameBg: "bg-red-500/10",
	},
};

export const FILE_STATS: FileStat[] = [
	{
		lv: {
			label: "Total Uploads Today",
			value: "247",
		},
		// icon: <FiUpload className="w-5 h-5" />,
		icon: FiUpload,
		classNameColor: "text-blue-600",
		classNameBg: "bg-blue-500/10",
	},
	{
		lv: {
			label: "Successfully Processed",
			value: "234",
		},
		// icon: <FiCheckCircle className="w-5 h-5" />,
		icon: FiCheckCircle,
		classNameColor: "text-green-600",
		classNameBg: "bg-green-500/10",
	},
	{
		lv: {
			label: "In Progress",
			value: "8",
		},
		// icon: <FiClock className="w-5 h-5" />,
		icon: FiClock,
		classNameColor: "text-purple-600",
		classNameBg: "bg-purple-500/10",
	},
	{
		lv: {
			label: "Failed",
			value: "5",
		},
		// icon: <FiAlertCircle className="w-5 h-5" />,
		icon: FiAlertCircle,
		classNameColor: "text-red-600",
		classNameBg: "bg-red-500/10",
	},
];

export interface RecentFile {
	id: string;
	name: string;
	size: string;
	uploadedBy: string;
	uploadedAt: string;
	status: (typeof FILE_TABS)[number];
	// "processed" | "processing" | "failed"; // TODO: use same as in other const arrays (when moving to hook -> backend)
	processType: string;
	error?: string;
}

export const RECENT_FILES: RecentFile[] = [
	{
		id: "F-1047",
		name: "invoice_batch_2024_01.pdf",
		size: "2.4 MB",
		uploadedBy: "John Doe",
		uploadedAt: "5 mins ago",
		status: "processed",
		processType: "Invoice Processing",
	},
	{
		id: "F-1046",
		name: "contract_review_draft.docx",
		size: "845 KB",
		uploadedBy: "Jane Smith",
		uploadedAt: "12 mins ago",
		status: "processing",
		processType: "Contract Review",
	},
	{
		id: "F-1045",
		name: "data_export_jan.xlsx",
		size: "5.1 MB",
		uploadedBy: "Bob Johnson",
		uploadedAt: "25 mins ago",
		status: "processed",
		processType: "Data Extraction",
	},
	{
		id: "F-1044",
		name: "report_q1_2024.pdf",
		size: "1.8 MB",
		uploadedBy: "Alice Williams",
		uploadedAt: "1 hour ago",
		status: "failed",
		processType: "Report Generation",
		error: "Invalid file format",
	},
	{
		id: "F-1043",
		name: "email_list_customers.csv",
		size: "324 KB",
		uploadedBy: "Charlie Brown",
		uploadedAt: "2 hours ago",
		status: "processed",
		processType: "Email Automation",
	},
];

export const UPLOAD_CONFIG = {
	supportedFormats: "PDF, DOCX, XLSX, CSV",
	maxSize: "10MB",
	uploadText: "Upload Files",
	dragDropText: "Drag and drop files here, or click to browse",
	buttonText: "Choose Files",
};
