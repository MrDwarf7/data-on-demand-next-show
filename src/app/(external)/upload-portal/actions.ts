"use server";

import { UPLOAD_CONFIG } from "@/config/external/upload-config";
import { renameFile, toDisk } from "@/lib/file-utils";

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

const writeToStorage = async (file: File): Promise<UploadedFile> => {
	const filename = renameFile(file.name);
	const filepath = `./public/uploads/${filename}`;
	// TODO: [backend] : Change to use a 'toDatabase' function when DB is set up
	await toDisk(file, filepath);

	return {
		id: filename,
		name: file.name,
		status: "uploaded",
	};
};

const supportedMimeType = (fileType: string): boolean => {
	if (
		fileType &&
		UPLOAD_CONFIG.acceptedFileTypes.includes(
			fileType as (typeof UPLOAD_CONFIG.acceptedFileTypes)[number]
		)
	) {
		return true;
	} else {
		return false;
	}
};

const validFile = (file: File): boolean => {
	// TODO: [cleanup] : We'd prefer to use MIME type checks over splitting file names as this can be DANGEROUS.

	const fileType = file.type;
	const fileName = file.name.toLowerCase();

	if (supportedMimeType(fileType)) {
		return true;
	}

	// Check if file extension is accepted
	const extension = `.${fileName.split(".").pop()}`;
	return UPLOAD_CONFIG.supportedExtensions.includes(extension);
};

export const uploadFiles = async (
	_prevState: FileUploadState,
	formData: FormData
): Promise<FileUploadState> => {
	try {
		const process = formData.get("process") as string;
		const allFiles = formData.getAll("files").filter((f): f is File => f instanceof File);
		const validFiles = allFiles.filter(validFile);

		console.log(
			"Files to upload:",
			validFiles.map((f) => f.name)
		);
		console.log("Selected process:", process);
		console.log(
			"Rejected files:",
			allFiles.filter((f) => !validFile(f)).map((f) => f.name)
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
