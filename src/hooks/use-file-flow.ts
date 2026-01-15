import { FILE_STATS, RECENT_FILES } from "@/config/internal/file-flow-config";

// Hook to get file statistics
export function useFileStats() {
	// TODO: [backend] : Replace with backend call
	return FILE_STATS;
}

// Hook to get recent files
export function useRecentFiles() {
	// TODO: [backend] : Replace with backend call
	return RECENT_FILES;
}
