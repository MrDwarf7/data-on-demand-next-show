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

export const uploadFiles = async (
	_prevState: FileUploadState,
	formData: FormData
): Promise<FileUploadState> => {
	try {
		const process = formData.get("process") as string;
		const files = formData.getAll("files").filter((f): f is File => f instanceof File);

		console.log(
			"Files to upload:",
			files.map((f) => f.name)
		);
		console.log("Selected process:", process);
		// Simple validation
		if (!process || files.length === 0) {
			return { success: false, uploadedFiles: [], error: "Validation failed" };
		}

		// Save files with proper naming
		const uploadedFiles = await Promise.all(files.map(writeToStorage));

		return { success: true, uploadedFiles, error: null };
	} catch (error) {
		return { success: false, uploadedFiles: [], error: "Upload failed" };
	}
};
