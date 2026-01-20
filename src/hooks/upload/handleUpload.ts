import { useCallback } from "react";
import type { FileUploadItem, ProcessedFile } from "./types";

interface UseHandleUploadParams {
	files: FileUploadItem[];
	isUploading: boolean;
	currentProcess: string;
	processFiles: (files: File[], process: string) => Promise<ProcessedFile[]>;
	simulateProgress: (fileIds: string[]) => Promise<void>;
	setFiles: React.Dispatch<React.SetStateAction<FileUploadItem[]>>;
	setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useHandleUpload({
	files,
	isUploading,
	currentProcess,
	processFiles,
	simulateProgress,
	setFiles,
	setIsUploading,
}: UseHandleUploadParams) {
	return useCallback(async () => {
		if (files.length === 0 || isUploading) return;

		setIsUploading(true);
		const fileIds = files.map((f) => f.id);

		setFiles((prev) =>
			prev.map((f) => (fileIds.includes(f.id) ? { ...f, status: "uploading" as const } : f))
		);

		try {
			// Process files first (async, expensive operations)
			const processedFiles = await processFiles(
				files.map((f) => f.file),
				currentProcess
			);

			// Validate all files have the same type
			const fileTypes = files.map((f) => f.file.type);
			const uniqueTypes = [...new Set(fileTypes)];
			if (uniqueTypes.length > 1) {
				throw new Error("All uploaded files must have the same type");
			}

			// Create FormData with processed names
			const formData = new FormData();
			formData.append("process", currentProcess);
			formData.append("fileType", uniqueTypes[0]); // All files have the same type

			processedFiles.forEach(({ originalFile, newName }) => {
				// Create new File with processed name
				const renamedFile = new File([originalFile], newName, {
					type: originalFile.type,
					lastModified: originalFile.lastModified,
				});
				formData.append("files", renamedFile);
			});

			const response = await fetch("/api/uploads", {
				method: "POST",
				body: formData,
			});
			const result = await response.json();

			if (!result.success) {
				// Handle errors
				setFiles((prev) =>
					prev.map((f) => {
						const fileErrors = result.errors?.files || result.errors?.general || [];
						return fileIds.includes(f.id)
							? {
									...f,
									status: "error" as const,
									error: fileErrors.join(", ") || "Upload failed",
								}
							: f;
					})
				);
			} else {
				// Update files with processed names (status remains "uploading")
				setFiles((prev) =>
					prev.map((f) => {
						const processed = processedFiles.find((p) => p.originalFile === f.file);
						return fileIds.includes(f.id)
							? {
									...f,
									newName: processed?.newName,
								}
							: f;
					})
				);

				await simulateProgress(fileIds);
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error && error.message === "All uploaded files must have the same type"
					? "All files must be of the same type (e.g., all CSV or all TXT)"
					: "Network error";
			setFiles((prev) =>
				prev.map((f) =>
					fileIds.includes(f.id)
						? {
								...f,
								status: "error" as const,
								error: errorMessage,
							}
						: f
				)
			);
		}

		setIsUploading(false);
	}, [
		files,
		isUploading,
		currentProcess,
		processFiles,
		simulateProgress,
		setFiles,
		setIsUploading,
	]);
}
