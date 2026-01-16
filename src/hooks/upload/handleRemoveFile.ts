import { useCallback } from "react";
import type { FileUploadItem } from "./types";

export function useHandleRemoveFile(
	setFiles: React.Dispatch<React.SetStateAction<FileUploadItem[]>>
) {
	return useCallback(
		(id: string) => {
			setFiles((prev) => prev.filter((f) => f.id !== id));
		},
		[setFiles]
	);
}
