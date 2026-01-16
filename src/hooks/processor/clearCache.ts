import { useCallback } from "react";
import type { ProcessedFile } from "./types";

export function useClearCache(
	cacheRef: React.RefObject<Map<string, ProcessedFile[]>>,
	setProcessedFiles: React.Dispatch<React.SetStateAction<ProcessedFile[] | null>>
) {
	return useCallback(() => {
		cacheRef.current.clear();
		setProcessedFiles(null);
	}, [setProcessedFiles, cacheRef.current.clear]);
}
