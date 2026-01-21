import type { ReactNode } from "react";
import { FiMinus, FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import { PROCESSES } from "@/constants/processes";
import { STATUS_STYLES } from "@/constants/statuses";
import type { ClassNameDataWithIcon, TrendType, ValueAndLabel } from "@/types/common";
import { createStyleGetter } from "@/utils/lookups";
export type { TrendType };

import type { CommonStatus } from "@/constants/statuses";

export interface IconTypeMap extends Record<string, IconType> {}

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

export type StatisticsStatus = Extract<CommonStatus, "active" | "idle" | "paused" | "failed">;

export const STATISTICS_STATUS_STYLES: Record<StatisticsStatus, ClassNameDataWithIcon> = {
	active: STATUS_STYLES.active,
	idle: STATUS_STYLES.idle,
	paused: STATUS_STYLES.paused,
	failed: STATUS_STYLES.failed,
};

export const getStatisticsStatusStyles = createStyleGetter(STATISTICS_STATUS_STYLES);

export interface StatisticMetric extends ValueAndLabel {
	change: string;
	trend: TrendType;
}

export const STATISTICS_METRICS: StatisticMetric[] = [
	{
		value: "847",
		label: "Total Processes Today",
		change: "+12.3%",
		trend: "up",
	},
	{
		value: "98.5%",
		label: "Success Rate",
		change: "+2.1%",
		trend: "up",
	},
	{
		value: "2.3s",
		label: "Avg Process Time",
		change: "-0.5s",
		trend: "up",
	},
	{
		value: "12",
		label: "Active Queues",
		change: "+3",
		trend: "neutral",
	},
];

export interface StatisticsColumn extends ValueAndLabel {}

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
		{ value: "process", label: "Process Name" },
		{ value: "status", label: "Status" },
		{ value: "count", label: "Count" },
		{ value: "avgTime", label: "Avg Time" },
		{ value: "successRate", label: "Success Rate" },
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
