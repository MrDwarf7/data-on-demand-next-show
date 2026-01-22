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

export const uploadFiles = async (
	_prevState: FileUploadState,
	formData: FormData
): Promise<FileUploadState> => {
	try {
		const process = formData.get("process") as string;
		const files = formData.getAll("files").filter((f): f is File => f instanceof File);

		// Simple validation
		if (!process || files.length === 0) {
			return { success: false, uploadedFiles: [], error: "Validation failed" };
		}

		// Save files with proper naming
		const uploadedFiles = await Promise.all(
			files.map(async (file) => {
				const now = new Date();
				const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
				const timeStr = now.toISOString().slice(11, 19).replace(/:/g, ""); // HHMMSS
				const uuid = crypto.randomUUID();
				const ext = file.name.split(".").pop() || "";
				const filename = `${dateStr}-${timeStr}-${file.name.replace(/\.[^/.]+$/, "")}-${uuid}.${ext}`;
				const filepath = `./public/uploads/${filename}`;

				const buffer = await file.arrayBuffer();
				await writeFile(filepath, Buffer.from(buffer));

				return {
					id: filename,
					name: file.name,
					status: "uploaded",
				};
			})
		);

		return { success: true, uploadedFiles, error: null };
	} catch (error) {
		return { success: false, uploadedFiles: [], error: "Upload failed" };
	}
};
