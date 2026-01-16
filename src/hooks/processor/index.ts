"use client";

import { useMemo, useRef, useState } from "react";
import { useClearCache } from "./clearCache";
import { useProcessFiles } from "./processFiles";
import type { ProcessedFile } from "./types";

export interface UseFileProcessorReturn {
	processFiles: (files: File[], process: string) => Promise<ProcessedFile[]>;
	isProcessing: boolean;
	error: string | null;
	processedFiles: ProcessedFile[] | null;
	clearCache: () => void;
}

export function useFileProcessor(): UseFileProcessorReturn {
	const cacheRef = useRef<Map<string, ProcessedFile[]>>(new Map());
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [processedFiles, setProcessedFiles] = useState<ProcessedFile[] | null>(null);

	const processFiles = useProcessFiles(cacheRef, setIsProcessing, setError, setProcessedFiles);
	const clearCache = useClearCache(cacheRef, setProcessedFiles);

	// Memoized return to prevent unnecessary re-renders
	return useMemo(
		() => ({
			processFiles,
			isProcessing,
			error,
			processedFiles,
			clearCache,
		}),
		[processFiles, isProcessing, error, processedFiles, clearCache]
	);
}
