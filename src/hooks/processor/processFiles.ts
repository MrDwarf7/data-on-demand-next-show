import { useCallback } from "react";
import type { ProcessedFile } from "./types";

const processFileName = async (
	filename: string,
	process: string,
	date: string,
	uuid: string
): Promise<string> => {
	// Async offloading for regex operations
	await new Promise((resolve) => setTimeout(resolve, 1)); // Simulate async work

	// Use functional regex processing
	const ext = filename.split(".").pop() || "bin";
	const sanitizedProcess = process.replace(/[^a-zA-Z0-9-_]/g, "_");

	return `${date}-${sanitizedProcess}-${uuid}.${ext}`;
};

const generateUUID = async (): Promise<string> => {
	// Async UUID generation (placeholder for backend API call)
	await new Promise((resolve) => setTimeout(resolve, 5));
	return crypto.randomUUID().slice(0, 8);
};

export function useProcessFiles(
	cacheRef: React.RefObject<Map<string, ProcessedFile[]>>,
	setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>,
	setProcessedFiles: React.Dispatch<React.SetStateAction<ProcessedFile[] | null>>
) {
	// Memoized cache key generator
	const getCacheKey = useCallback((files: File[], process: string) => {
		const fileHashes = files
			.map((f) => `${f.name}-${f.size}-${f.lastModified}`)
			.sort()
			.join("|");
		return `${process}-${fileHashes}`;
	}, []);

	// Memoized processing function
	const processFiles = useCallback(
		async (files: File[], process: string): Promise<ProcessedFile[]> => {
			const cacheKey = getCacheKey(files, process);

			// Check cache first (useRef for persistence)
			const cached = cacheRef.current.get(cacheKey);
			if (cached) {
				setProcessedFiles(cached);
				return cached;
			}

			setIsProcessing(true);
			setError(null);

			try {
				const date = new Date().toISOString().split("T")[0].replace(/-/g, "_");

				// Parallel async processing
				const processedFiles = await Promise.all(
					files.map(async (file) => {
						const uuid = await generateUUID();
						const newName = await processFileName(file.name, process, date, uuid);

						return {
							originalFile: file,
							newName,
							size: file.size,
							type: file.type,
						};
					})
				);

				// Cache result
				cacheRef.current.set(cacheKey, processedFiles);
				setProcessedFiles(processedFiles);

				return processedFiles;
			} catch (err) {
				const errorMessage = err instanceof Error ? err.message : "Processing failed";
				setError(errorMessage);
				throw new Error(errorMessage);
			} finally {
				setIsProcessing(false);
			}
		},
		[
			getCacheKey,
			setIsProcessing,
			setError,
			setProcessedFiles,
			cacheRef.current.get,
			cacheRef.current.set,
		]
	);

	return processFiles;
}
