import { useMemo } from "react";
import { PROCESS_PICKER_CONFIG } from "@/config/external/process-picker-items";
import type { DataItemsProps } from "@/types/local";

// TODO: [backend] : Replace with API call: fetch('/api/processes')
// const STATIC_PROCESSES = [
// 	{ id: "invoice-processing", name: "Invoice Processing" },
// 	{ id: "contract-review", name: "Contract Review" },
// 	{ id: "data-extraction", name: "Data Extraction" },
// 	{ id: "email-automation", name: "Email Automation" },
// 	{ id: "report-generation", name: "Report Generation" },
// ] as const;

export type ProcessItem = DataItemsProps;

export function useProcesses(): Readonly<ProcessItem[]> {
	// TODO: [backend] : Add loading state, error handling when fetching from API
	//
	// if (process.env.NODE_ENV === "development") {
	// 	return useMemo(() => processPickerItems, []);
	// } else {
	// 	return useMemo(() => STATIC_PROCESSES, []);
	// }

	// return processPickerItems;
	return useMemo(() => PROCESS_PICKER_CONFIG, []);
}
