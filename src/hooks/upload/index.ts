"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useFileProcessor } from "../processor";
import { useHandleFiles } from "./handleFiles";
import { useHandleRemoveFile } from "./handleRemoveFile";
import { useHandleUpload } from "./handleUpload";
import { useSimulateProgress } from "./simulateProgress";
import type { FileUploadItem, UseFileUploadReturn } from "./types";

export function useFileUpload(): UseFileUploadReturn {
	const searchParams = useSearchParams();
	const currentProcess = useMemo(() => {
		// Process is always available via URL params
		return searchParams.get("process") || "";
	}, [searchParams]);

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

	const handleFiles = useHandleFiles(setFiles);
	const handleRemoveFile = useHandleRemoveFile(setFiles);
	const simulateProgress = useSimulateProgress(setFiles);
	const handleUpload = useHandleUpload({
		files,
		isUploading,
		currentProcess,
		processFiles,
		simulateProgress,
		setFiles,
		setIsUploading,
	});

	return {
		files,
		isUploading,
		overallProgress,
		handleFiles,
		handleRemoveFile,
		handleUpload,
		currentProcess,
		isProcessing,
		reset: () => {
			setFiles([]);
			setIsUploading(false);
		},
	};
}
