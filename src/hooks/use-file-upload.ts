"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { uploadFiles } from "@/actions/upload";
import { useFileProcessor } from "./use-file-processor";

type UploadStatus = "pending" | "uploading" | "completed" | "error";

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
	currentProcess: string | null;
	isProcessing: boolean;
}

// Extract process from URL path
function getProcessFromPath(pathname: string): string | null {
	const segments = pathname.split("/").filter(Boolean);
	// Assuming URL structure like /upload-portal/<process>
	return segments.length >= 2 ? segments[1] : null;
}

export function useFileUpload(): UseFileUploadReturn {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentProcess = useMemo(() => {
		// Check search params first (for upload-portal)
		const processParam = searchParams.get("process");
		if (processParam) return processParam;
		// Fallback to path segments

		// TODO: If there is no process selected, we should be generating a toast message telling the user to select one.
		// TODO: Furthermore, we should NOT be making the upload button clickable if there is no process selected.
		return getProcessFromPath(pathname);
	}, [pathname, searchParams]);

	const { processFiles, isProcessing } = useFileProcessor();
	const [files, setFiles] = useState<FileUploadItem[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	const overallProgress = useMemo(
		() =>
			files.length > 0
				? Math.round(files.reduce((sum, f) => sum + f.progress, 0) / files.length)
				: 0,
		[files]
	);

	const handleFiles = useCallback((fileList: FileList | File[]) => {
		const newFiles = Array.from(fileList).map((file) => ({
			id: `${Date.now()}-${Math.random()}`,
			file,
			progress: 0,
			status: "pending" as UploadStatus,
		}));
		setFiles((prev) => [...prev, ...newFiles]);
	}, []);

	const handleRemoveFile = useCallback((id: string) => {
		setFiles((prev) => prev.filter((f) => f.id !== id));
	}, []);

	const simulateProgress = useCallback(async (fileIds: string[]) => {
		const totalTime = 3000;
		const updateInterval = 100;
		const totalUpdates = totalTime / updateInterval;

		for (let i = 1; i <= totalUpdates; i++) {
			await new Promise((resolve) => setTimeout(resolve, updateInterval));
			const progress = Math.round((i / totalUpdates) * 100);
			setFiles((prev) =>
				prev.map((f) =>
					fileIds.includes(f.id)
						? {
								...f,
								progress,
								status: progress >= 100 ? "completed" : "uploading",
							}
						: f
				)
			);
		}
	}, []);

	const handleUpload = useCallback(async () => {
		if (files.length === 0 || isUploading || !currentProcess) return;

		setIsUploading(true);
		const fileIds = files.map((f) => f.id);

		setFiles((prev) =>
			prev.map((f) => (fileIds.includes(f.id) ? { ...f, status: "uploading" as UploadStatus } : f))
		);

		try {
			// Process files first (async, expensive operations)
			const processedFiles = await processFiles(
				files.map((f) => f.file),
				currentProcess
			);

			// Create FormData with processed names
			const formData = new FormData();
			formData.append("process", currentProcess);

			processedFiles.forEach(({ originalFile, newName }) => {
				// Create new File with processed name
				const renamedFile = new File([originalFile], newName, {
					type: originalFile.type,
					lastModified: originalFile.lastModified,
				});
				formData.append("files", renamedFile);
			});

			const result = await uploadFiles(formData);

			if (!result.success) {
				// Handle errors
				setFiles((prev) =>
					prev.map((f, index) => {
						const fileErrors = result.errors?.files?.[index] || result.errors?.general;
						return fileIds.includes(f.id)
							? {
									...f,
									status: "error" as UploadStatus,
									error: fileErrors?.join(", ") || "Upload failed",
								}
							: f;
					})
				);
			} else {
				// Update files with processed names
				setFiles((prev) =>
					prev.map((f) => {
						const processed = processedFiles.find((p) => p.originalFile === f.file);
						return fileIds.includes(f.id)
							? {
									...f,
									newName: processed?.newName,
									status: "completed" as UploadStatus,
								}
							: f;
					})
				);

				await simulateProgress(fileIds);
			}
		} catch (error) {
			setFiles((prev) =>
				prev.map((f) =>
					fileIds.includes(f.id)
						? {
								...f,
								status: "error" as UploadStatus,
								error: "Network error",
							}
						: f
				)
			);
		}

		setIsUploading(false);
	}, [files, isUploading, currentProcess, processFiles, simulateProgress]);

	return {
		files,
		isUploading,
		overallProgress,
		handleFiles,
		handleRemoveFile,
		handleUpload,
		currentProcess,
		isProcessing,
	};
}
