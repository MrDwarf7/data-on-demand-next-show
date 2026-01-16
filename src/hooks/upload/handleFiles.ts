import { useCallback } from "react";
import type { FileUploadItem } from "./types";

export function useHandleFiles(setFiles: React.Dispatch<React.SetStateAction<FileUploadItem[]>>) {
	return useCallback(
		(fileList: FileList | File[]) => {
			const newFiles = Array.from(fileList).map((file) => ({
				id: `${Date.now()}-${Math.random()}`,
				file,
				progress: 0,
				status: "pending" as const,
			}));
			setFiles((prev) => [...prev, ...newFiles]);
		},
		[setFiles]
	);
}
