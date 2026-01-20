import { useCallback } from "react";
import type { FileUploadItem } from "./types";

export function useSimulateProgress(
	setFiles: React.Dispatch<React.SetStateAction<FileUploadItem[]>>,
	setProgressMap: React.Dispatch<React.SetStateAction<Map<string, number>>>
) {
	return useCallback(
		async (fileIds: string[]) => {
			const totalTime = 3000;
			const updateInterval = 100;
			const totalUpdates = totalTime / updateInterval;

			for (let i = 1; i <= totalUpdates; i++) {
				await new Promise((resolve) => setTimeout(resolve, updateInterval));
				const progress = Math.round((i / totalUpdates) * 100);
				setProgressMap((prev) => fileIds.reduce((map, id) => map.set(id, progress), new Map(prev)));
				if (progress >= 100) {
					setFiles((prev) =>
						prev.map((f) =>
							fileIds.includes(f.id)
								? {
										...f,
										status: "completed",
									}
								: f
						)
					);
				}
			}
		},
		[setFiles, setProgressMap]
	);
}
