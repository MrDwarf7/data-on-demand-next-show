import { FiAlertCircle, FiCheckCircle, FiClock, FiUpload } from "react-icons/fi";
import { MOCK_USERS } from "@/constants/mock-users";
import { PROCESSES } from "@/constants/processes";
import { STATUS_STYLES } from "@/constants/statuses";
import type { ClassNameDataWithIcon, ValueAndLabel } from "@/types/common";
import { createStyleGetter } from "@/utils/lookups";

// TODO: Flatten out the data in here and ensure we're not repeating things,
// once we're calling API's and such it will be easier to manage though.

export interface FileStat extends ClassNameDataWithIcon {
	lv: ValueAndLabel;
}

export type FileTabType = (typeof FILE_TABS)[number];

export type FileStatus = (typeof FILE_TABS)[number];

export const FILE_TABS = ["recent", "processed", "processing", "failed"] as const;

export const STATUS_BADGE_STYLES: Record<string, ClassNameDataWithIcon> = {
	processed: STATUS_STYLES.processed,
	processing: STATUS_STYLES.processing,
	failed: STATUS_STYLES.failed,
};

export const getFileFlowStyles = createStyleGetter(STATUS_BADGE_STYLES);

export const FILE_STATS: FileStat[] = [
	{
		lv: {
			label: "Total Uploads Today",
			value: "247",
		},
		// icon: <FiUpload className="w-5 h-5" />,
		icon: FiUpload,
		classNameColor: "text-info-foreground",
		classNameBg: "bg-info-10",
	},
	{
		lv: {
			label: "Successfully Processed",
			value: "234",
		},
		// icon: <FiCheckCircle className="w-5 h-5" />,
		icon: FiCheckCircle,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	{
		lv: {
			label: "In Progress",
			value: "8",
		},
		// icon: <FiClock className="w-5 h-5" />,
		icon: FiClock,
		classNameColor: "text-info-foreground",
		classNameBg: "bg-info-10",
	},
	{
		lv: {
			label: "Failed",
			value: "5",
		},
		// icon: <FiAlertCircle className="w-5 h-5" />,
		icon: FiAlertCircle,
		classNameColor: "text-error-foreground",
		classNameBg: "bg-error-10",
	},
];

export interface RecentFile {
	id: string;
	name: string;
	size: string;
	uploadedBy: string;
	uploadedAt: string;
	status: FileStatus;
	// "processed" | "processing" | "failed"; // TODO: [backend] : use same as in other const arrays (when moving to hook -> backend)
	processType: string;
	error?: string;
}

export const RECENT_FILES: RecentFile[] = [
	{
		id: "F-1047",
		name: "invoice_batch_2024_01.pdf",
		size: "2.4 MB",
		uploadedBy: MOCK_USERS[0],
		uploadedAt: "5 mins ago",
		status: "processed",
		processType: PROCESSES[0],
	},
	{
		id: "F-1046",
		name: "contract_review_draft.docx",
		size: "845 KB",
		uploadedBy: MOCK_USERS[1],
		uploadedAt: "12 mins ago",
		status: "processing",
		processType: PROCESSES[1],
	},
	{
		id: "F-1045",
		name: "data_export_jan.xlsx",
		size: "5.1 MB",
		uploadedBy: MOCK_USERS[2],
		uploadedAt: "25 mins ago",
		status: "processed",
		processType: PROCESSES[2],
	},
	{
		id: "F-1044",
		name: "report_q1_2024.pdf",
		size: "1.8 MB",
		uploadedBy: MOCK_USERS[3],
		uploadedAt: "1 hour ago",
		status: "failed",
		processType: PROCESSES[4],
		error: "Invalid file format",
	},
	{
		id: "F-1043",
		name: "email_list_customers.csv",
		size: "324 KB",
		uploadedBy: MOCK_USERS[4],
		uploadedAt: "2 hours ago",
		status: "processed",
		processType: PROCESSES[3],
	},
];

export const UPLOAD_CONFIG_FILE_FLOW = {
	supportedFormats: "PDF, DOCX, XLSX, CSV",
	maxSize: "10MB",
	uploadText: "Upload Files",
	dragDropText: "Drag and drop files here, or click to browse",
	buttonText: "Choose Files",
};
