import { useMemo } from "react";
import type { DataItemsProps } from "@/types/local";

// TODO: [backend] : Replace with API call: fetch('/api/processes')
const getProcesses = (): DataItemsProps[] => [
	{ value: "number_one", label: "My Value 1" },
	{ value: "very_cool", label: "Super Cool 2" },
	{ value: "process_three_memes", label: "Memes 3" },
	{ value: "process_four_etc", label: "Process 4" },
	{ value: "5", label: "Process 5" },
	{ value: "6", label: "Process 6" },
	{ value: "7", label: "Process 7" },
	{ value: "8", label: "Process 8" },
	{ value: "9", label: "Process 9" },
	{ value: "10", label: "Process 10" },
	{ value: "11", label: "Process 11" },
	{ value: "12", label: "Process 12" },
	{ value: "13", label: "Process 13" },
	{ value: "14", label: "Process 14" },
	{ value: "15", label: "Process 15" },
	{ value: "16", label: "Process 16" },
	{ value: "17", label: "Process 17" },
	{ value: "18", label: "Process 18" },
];

export function useProcesses(): Readonly<DataItemsProps[]> {
	// TODO: [backend] : Add loading state, error handling when fetching from API
	return useMemo(() => getProcesses(), []);
}
