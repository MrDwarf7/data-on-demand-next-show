"use server";

import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

interface ProcessPickerState {
	selectedProcess?: string;
	error: string | null;
}

interface UploadedFile {
	id: string;
	name: string;
	status: string;
}

interface FileUploadState {
	success: boolean;
	uploadedFiles: UploadedFile[];
	error: string | null;
}

export const selectProcess = async (
	prevState: ProcessPickerState,
	formData: FormData
): Promise<ProcessPickerState> => {
	const process = formData.get("process") as string;

	if (!process) {
		return { selectedProcess: prevState.selectedProcess, error: "Please select a process" };
	}

	// TODO: Update user session or database
	revalidatePath("/upload-portal");
	return { selectedProcess: process, error: null };
};

const renameFile = (originalName: string): string => {
	const now = new Date();
	const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
	const timeStr = now.toISOString().slice(11, 19).replace(/:/g, ""); // HHMMSS
	const uuid = crypto.randomUUID();

	const ext = originalName.split(".").pop() || "";
	const filename = `${dateStr}-${timeStr}-${originalName.replace(/\.[^/.]+$/, "")}-${uuid}.${ext}`;
	return filename;
};

// const toDatabase = async (file: File): Promise<void> => {
// 	// TODO: [backend] swappable with actual DB logic
// };

const toDisk = async (file: File, filepath: string): Promise<void> => {
	const buffer = await file.arrayBuffer();
	await writeFile(filepath, Buffer.from(buffer));
};

const writeToStorage = async (file: File): Promise<UploadedFile> => {
	const filename = renameFile(file.name);
	const filepath = `./public/uploads/${filename}`;
	await toDisk(file, filepath);

	return {
		id: filename,
		name: file.name,
		status: "uploaded",
	};
};

const isFileTypeValid = (file: File): boolean => {
	const fileType = file.type;
	const fileName = file.name.toLowerCase();

	// Check if MIME type is accepted
	if (
		fileType &&
		[
			"text/csv",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"application/vnd.ms-excel",
			"application/json",
			"text/plain",
		].includes(fileType)
	) {
		return true;
	}

	// TODO: [cleanup] : We'd prefer to use MIME type checks over splitting file names as this can be DANGEROUS.
	//
	// Check if file extension is accepted
	const extension = `.${fileName.split(".").pop()}`;
	return [".csv", ".xlsx", ".xls", ".json", ".txt"].includes(extension);
};

export const uploadFiles = async (
	_prevState: FileUploadState,
	formData: FormData
): Promise<FileUploadState> => {
	try {
		const process = formData.get("process") as string;
		const allFiles = formData.getAll("files").filter((f): f is File => f instanceof File);
		const validFiles = allFiles.filter(isFileTypeValid);

		console.log(
			"Files to upload:",
			validFiles.map((f) => f.name)
		);
		console.log("Selected process:", process);
		console.log(
			"Rejected files:",
			allFiles.filter((f) => !isFileTypeValid(f)).map((f) => f.name)
		);

		// Validation
		if (!process || validFiles.length === 0) {
			return {
				success: false,
				uploadedFiles: [],
				error: "No valid files to upload or process not selected",
			};
		}

		// Save files with proper naming
		const uploadedFiles = await Promise.all(validFiles.map(writeToStorage));

		return { success: true, uploadedFiles, error: null };
	} catch (error) {
		return { success: false, uploadedFiles: [], error: "Upload failed" };
	}
};
