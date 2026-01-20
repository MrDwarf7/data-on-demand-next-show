"use client";

import { useMemo, useState } from "react";
import { useUploadStore } from "@/store/store";
import { useFileProcessor } from "../processor";
import { useHandleFiles } from "./handleFiles";
import { useHandleRemoveFile } from "./handleRemoveFile";
import { useHandleUpload } from "./handleUpload";
import { useSimulateProgress } from "./simulateProgress";
import type { FileUploadItem, UseFileUploadReturn } from "./types";

export function useFileUpload(): UseFileUploadReturn {
	const { selectedProcess } = useUploadStore();
	const currentProcess = useMemo(() => {
		// Process is always available via store
		return selectedProcess || "";
	}, [selectedProcess]);

	const { processFiles, isProcessing } = useFileProcessor();
	const [files, setFiles] = useState<FileUploadItem[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const [progressMap, setProgressMap] = useState<Map<string, number>>(new Map());

	const overallProgress = useMemo(
		() =>
			files.length > 0
				? Math.round(
						files.reduce((sum, f) => sum + (progressMap.get(f.id) || f.progress), 0) / files.length
					)
				: 0,
		[files, progressMap]
	);

	const handleFiles = useHandleFiles(setFiles);
	const handleRemoveFile = useHandleRemoveFile(setFiles);
	const simulateProgress = useSimulateProgress(setFiles, setProgressMap);
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
		progressMap,
		handleFiles,
		handleRemoveFile,
		handleUpload,
		currentProcess,
		isProcessing,
		reset: () => {
			setFiles([]);
			setIsUploading(false);
			setProgressMap(new Map());
		},
	};
}
