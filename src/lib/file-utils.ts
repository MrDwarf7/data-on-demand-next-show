import type { RecentFile } from "@/config/internal/file-flow-config";

/**
 * Get a filter function for files based on selected tab
 */
export const getFileFilter = (selectedTab: string) => (file: RecentFile) => {
	switch (selectedTab) {
		case "recent":
			return true;
		case "processed":
			return file.status === "processed";
		default:
			return file.status === selectedTab;
	}
};
