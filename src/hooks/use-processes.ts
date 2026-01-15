import { useMemo } from "react";

// TODO: [backend] : Replace with API call: fetch('/api/processes')
const STATIC_PROCESSES = [
	{ id: "invoice-processing", name: "Invoice Processing" },
	{ id: "contract-review", name: "Contract Review" },
	{ id: "data-extraction", name: "Data Extraction" },
	{ id: "email-automation", name: "Email Automation" },
	{ id: "report-generation", name: "Report Generation" },
] as const;

export interface ProcessItem {
	id: string;
	name: string;
}

export function useProcesses(): ProcessItem[] {
	// TODO: [backend] : Add loading state, error handling when fetching from API
	return useMemo(() => STATIC_PROCESSES, []);
}
