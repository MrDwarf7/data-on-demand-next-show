import { FiMinus, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons/lib";

export type TrendType = "up" | "down" | "neutral";

export interface IconTypeMap extends Record<string, IconType> {}

export type ClassNameDataWithIcon = {
	classNameColor: string;
	classNameBg: string;
	icon: IconType;
};

// a type + enum style mapping
// of a TrendType in -> color
// eg:
// "up" -> { classNameColor: "text-green-500", classNameBg: "bg-green-500/10" }
// or   -> TREND_TYPE_STYLES["up"].classNameColor -> "text-green-500"
export const TREND_TYPE_STYLES: Record<TrendType, ClassNameDataWithIcon> = {
	up: {
		icon: FiTrendingUp,
		classNameColor: "text-green-600",
		classNameBg: "bg-green-500/10",
	},
	down: {
		icon: FiTrendingDown,
		classNameColor: "text-red-600",
		classNameBg: "bg-red-500/10",
	},
	neutral: {
		icon: FiMinus,
		classNameColor: "text-gray-600",
		classNameBg: "bg-gray-500/10",
	},
};

export interface StatisticMetric {
	label: string;
	value: string | number; // TODO: convert
	change: string;
	trend: TrendType;
	classNameColor: string;
	classNameBg: string;
}

export const STATISTICS_METRICS: StatisticMetric[] = [
	{
		label: "Total Processes Today",
		value: "847",
		change: "+12.3%",
		trend: "up",
		classNameColor: "text-blue-600",
		classNameBg: "bg-blue-500/10",
	},
	{
		label: "Success Rate",
		value: "98.5%",
		change: "+2.1%",
		trend: "up",
		classNameColor: "text-green-600",
		classNameBg: "bg-green-500/10",
	},
	{
		label: "Avg Process Time",
		value: "2.3s",
		change: "-0.5s",
		trend: "up",
		classNameColor: "text-purple-600",
		classNameBg: "bg-purple-500/10",
	},
	{
		label: "Active Queues",
		value: "12",
		change: "+3",
		trend: "neutral",
		classNameColor: "text-orange-600",
		classNameBg: "bg-orange-500/10",
	},
];

// TODO: use similar to processPickerItems ??
export interface StatisticsColumn {
	key: string;
	label: string;
}

export interface StatisticsRow {
	id: number;
	process: string;
	status: "Active" | "Idle" | "Paused" | "Failed";
	count: string | number;
	avgTime: string | keyof Duration;
	successRate: string | number;
}

export interface StatisticsTableData {
	columns: StatisticsColumn[];
	rows: StatisticsRow[];
}

export const SAMPLE_TABLE_DATA: StatisticsTableData = {
	columns: [
		{ key: "process", label: "Process Name" },
		{ key: "status", label: "Status" },
		{ key: "count", label: "Count" },
		{ key: "avgTime", label: "Avg Time" },
		{ key: "successRate", label: "Success Rate" },
	],
	rows: [
		{
			id: 1,
			process: "Invoice Processing",
			status: "Active",
			count: "247",
			avgTime: "2.1s",
			successRate: "99.2%",
		},
		{
			id: 2,
			process: "Contract Review",
			status: "Active",
			count: "189",
			avgTime: "3.4s",
			successRate: "97.8%",
		},
		{
			id: 3,
			process: "Data Extraction",
			status: "Active",
			count: "156",
			avgTime: "1.8s",
			successRate: "98.9%",
		},
		{
			id: 4,
			process: "Email Automation",
			status: "Active",
			count: "134",
			avgTime: "0.9s",
			successRate: "99.5%",
		},
		{
			id: 5,
			process: "Report Generation",
			status: "Idle",
			count: "89",
			avgTime: "4.2s",
			successRate: "96.3%",
		},
	],
};
