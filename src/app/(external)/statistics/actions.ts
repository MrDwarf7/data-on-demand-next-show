"use server";

import { revalidatePath } from "next/cache";
import { SAMPLE_TABLE_DATA, type StatisticsTableData } from "@/config/external/statistics-config";

export const refreshStatistics = async (
	// // TODO: maybe needed later
	// _prevState: undefined,
	// _formData: FormData
): Promise<void> => {
	// Invalidate the statistics page cache
	revalidatePath("/statistics");
};

// Simulate async data fetching with delay for future backend integration
export const getStatisticsData = async (): Promise<StatisticsTableData> => {
	// Simulate network delay for better UX testing
	// TODO: [backend] move to backend service
	await new Promise((resolve) => setTimeout(resolve, 300));

	return SAMPLE_TABLE_DATA;
};
