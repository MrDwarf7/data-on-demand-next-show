import type { ReactNode } from "react";
import { FiMinus, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import { PROCESSES } from "@/constants/processes";
import { STATUS_STYLES } from "@/constants/statuses";
import type { ClassNameDataWithIcon, TrendType } from "@/types/common";
import { createStyleGetter } from "@/utils/lookups";
export type { TrendType };

export interface IconTypeMap extends Record<string, IconType> {}

// a type + enum style mapping
// of a TrendType in -> color
// eg:
// "up" -> { classNameColor: "text-success-foreground", classNameBg: "bg-success-10" }
// or   -> TREND_TYPE_STYLES["up"].classNameColor -> "text-green-500"
export const TREND_TYPE_STYLES: Record<TrendType, ClassNameDataWithIcon> = {
	up: {
		icon: FiTrendingUp,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	down: {
		icon: FiTrendingDown,
		classNameColor: "text-error-foreground",
		classNameBg: "bg-error-10",
	},
	neutral: {
		icon: FiMinus,
		classNameColor: "text-neutral-foreground",
		classNameBg: "bg-neutral-10",
	},
};

export const getTrendStyles = createStyleGetter(TREND_TYPE_STYLES);

import type { CommonStatus } from "@/constants/statuses";

export type StatisticsStatus = Extract<CommonStatus, "active" | "idle" | "paused" | "failed">;

export const STATISTICS_STATUS_STYLES: Record<StatisticsStatus, ClassNameDataWithIcon> = {
	active: STATUS_STYLES.active,
	idle: STATUS_STYLES.idle,
	paused: STATUS_STYLES.paused,
	failed: STATUS_STYLES.failed,
};

export const getStatisticsStatusStyles = createStyleGetter(STATISTICS_STATUS_STYLES);

export interface StatisticMetric {
	label: string;
	value: string | number;
	change: string;
	trend: TrendType;
}

export const STATISTICS_METRICS: StatisticMetric[] = [
	{
		label: "Total Processes Today",
		value: "847",
		change: "+12.3%",
		trend: "up",
	},
	{
		label: "Success Rate",
		value: "98.5%",
		change: "+2.1%",
		trend: "up",
	},
	{
		label: "Avg Process Time",
		value: "2.3s",
		change: "-0.5s",
		trend: "up",
	},
	{
		label: "Active Queues",
		value: "12",
		change: "+3",
		trend: "neutral",
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
	status: StatisticsStatus;
	count: string | number;
	avgTime: string | ReactNode;
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
			process: PROCESSES[0],
			status: "active",
			count: "247",
			avgTime: "2.1s",
			successRate: "99.2%",
		},
		{
			id: 2,
			process: PROCESSES[1],
			status: "active",
			count: "189",
			avgTime: "3.4s",
			successRate: "97.8%",
		},
		{
			id: 3,
			process: PROCESSES[2],
			status: "active",
			count: "156",
			avgTime: "1.8s",
			successRate: "98.9%",
		},
		{
			id: 4,
			process: PROCESSES[3],
			status: "active",
			count: "134",
			avgTime: "0.9s",
			successRate: "99.5%",
		},
		{
			id: 5,
			process: PROCESSES[4],
			status: "idle",
			count: "89",
			avgTime: "4.2s",
			successRate: "96.3%",
		},
		{
			id: 2,
			process: PROCESSES[1],
			status: "active",
			count: "189",
			avgTime: "3.4s",
			successRate: "97.8%",
		},
		{
			id: 3,
			process: PROCESSES[2],
			status: "active",
			count: "156",
			avgTime: "1.8s",
			successRate: "98.9%",
		},
		{
			id: 4,
			process: PROCESSES[3],
			status: "active",
			count: "134",
			avgTime: "0.9s",
			successRate: "99.5%",
		},
		{
			id: 5,
			process: PROCESSES[4],
			status: "idle",
			count: "89",
			avgTime: "4.2s",
			successRate: "96.3%",
		},
	],
};
