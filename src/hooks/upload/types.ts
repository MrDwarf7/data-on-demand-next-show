export type UploadStatus = "pending" | "uploading" | "completed" | "error";

export interface FileUploadItem {
	id: string;
	file: File;
	progress: number;
	status: UploadStatus;
	error?: string;
	newName?: string;
}

export interface UseFileUploadReturn {
	files: FileUploadItem[];
	isUploading: boolean;
	overallProgress: number;
	handleFiles: (files: FileList | File[]) => void;
	handleRemoveFile: (id: string) => void;
	handleUpload: () => Promise<void>;
	currentProcess: string;
	isProcessing: boolean;
	reset: () => void;
}

export interface ProcessedFile {
	originalFile: File;
	newName: string;
	size: number;
	type: string;
}
