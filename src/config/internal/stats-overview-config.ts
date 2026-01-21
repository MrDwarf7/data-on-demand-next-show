import type { IconType } from "react-icons";
import { FiActivity, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import { PROCESSES } from "@/constants/processes";
import type { ValueAndLabel } from "@/types/common";

export type TimeRange = "24h" | "7d" | "30d" | "90d";

export interface StatsCard {
	title: string;
	value: string;
	change: string;
	trend: "up" | "down";
	icon: IconType;
	gradient: string;
	bgGradient: string;
}

export interface StatCardConfig {
	title: string;
	type: "count" | "percentage" | "time" | "custom";
	isIncreaseGood: boolean;
	baseDaily?: number; // For 'count'
	baseValue?: number; // For 'percentage' and 'time'
	variation?: number; // For 'percentage' and 'time'
	customValueGenerator?: (days: number) => string; // for 'custom' type
	icon: IconType;
	gradient: string;
	bgGradient: string;
}

const statCardConfigs: StatCardConfig[] = [
	{
		title: "Total Processes",
		type: "count",
		isIncreaseGood: true,
		baseDaily: 500,
		icon: FiActivity,
		gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
		bgGradient: "bg-info-10",
	},
	{
		title: "Success Rate",
		type: "percentage",
		isIncreaseGood: true,
		baseValue: 98,
		variation: 2,
		icon: FiCheckCircle,
		gradient: "bg-gradient-to-r from-green-400 to-green-600",
		bgGradient: "bg-success-10",
	},
	{
		title: "Avg Processing Time",
		type: "time",
		isIncreaseGood: false,
		baseValue: 2.4,
		variation: 0.5,
		icon: FiClock,
		gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
		bgGradient: "bg-info-10",
	},
	{
		title: "Active Users",
		type: "count",
		isIncreaseGood: true,
		baseDaily: 50,
		icon: FiUsers,
		gradient: "bg-gradient-to-r from-yellow-400 to-red-500",
		bgGradient: "bg-warning-10",
	},
];

const generateValue = (config: StatCardConfig, days: number): string => {
	let rawValue: number;
	switch (config.type) {
		case "count":
			rawValue = (config.baseDaily ?? 0) * days * (0.8 + Math.random() * 0.4);
			return Math.floor(rawValue).toLocaleString("en-US");
		case "percentage":
			rawValue = (config.baseValue ?? 0) + (Math.random() * 2 - 1) * (config.variation ?? 0);
			return `${rawValue.toFixed(1)}%`;
		case "time":
			rawValue = (config.baseValue ?? 0) + (Math.random() * 2 - 1) * (config.variation ?? 0);
			return `${rawValue.toFixed(1)}s`;
		case "custom":
			if (config.customValueGenerator) {
				return config.customValueGenerator(days);
			}
			throw new Error("Custom generator not provided");
		default:
			throw new Error("Unknown config type");
	}
};

// Generic composable function to generate change (random, with bias towards "good" changes)
const generateChange = (config: StatCardConfig): string => {
	const delta = Math.random() * 20;
	const preferPositive = config.isIncreaseGood;
	const signProb = Math.random();
	// Bias: 70% chance of preferred sign direction
	const sign = preferPositive ? (signProb < 0.7 ? "+" : "-") : signProb < 0.7 ? "-" : "+";
	return `${sign}${delta.toFixed(1)}%`;
};

// Helper to get days from time range
const getDaysFromTimeRange = (timeRange: TimeRange): number => {
	switch (timeRange) {
		case "24h":
			return 1;
		case "7d":
			return 7;
		case "30d":
			return 30;
		case "90d":
			return 90;
	}
};

// Generic assemble full stat card from config, value, and change
const assembleStatCards = (config: StatCardConfig, value: string, change: string): StatsCard => {
	const changeNum = parseFloat(change);
	const isPositiveChange = changeNum > 0;
	const isGood = config.isIncreaseGood ? isPositiveChange : !isPositiveChange;
	const trend = isGood ? "up" : "down";

	return {
		title: config.title,
		value,
		change,
		trend,
		icon: config.icon,
		gradient: config.gradient,
		bgGradient: config.bgGradient,
	};
};

// Function to generate array of StatsCards for a given time range using provided configs
export const generateStatsCards = (timeRange: TimeRange): StatsCard[] => {
	const days = getDaysFromTimeRange(timeRange);
	return statCardConfigs.map((config) => {
		const value = generateValue(config, days);
		const change = generateChange(config);
		return assembleStatCards(config, value, change);
	});
};

export interface RecentActivity {
	id: number;
	action: string;
	process: string;
	time: string;
	status: "success" | "error" | "processing" | "info";
}

const knownActions = [
	"Batch process completed",
	"New document uploaded",
	"Error detected",
	"Queue cleared",
	"System maintenance",
];

const generateRecentActivityStatus = (): RecentActivity["status"] => {
	return ["success", "error", "processing", "info"][
		Math.floor(Math.random() * 4)
	] as RecentActivity["status"];
};

export const generateRecentActivity = (length: number): RecentActivity[] =>
	Array.from({ length: length }, (_, idx) => {
		return {
			id: idx,
			action: knownActions[Math.floor(Math.random() * knownActions.length)],
			process: PROCESSES[Math.floor(Math.random() * PROCESSES.length)],
			time: `${Math.floor(Math.random() * 59) + 1} minutes ago`,
			status: generateRecentActivityStatus(),
		};
	});

export const RECENT_ACTIVITY: RecentActivity[] = generateRecentActivity(5);
export interface SystemMetric extends ValueAndLabel<number> {
	color: string;
}

const generateMetricValue = (baseTen: number, length: number) =>
	Array.from({ length }, () => () => {
		return Math.floor(Math.random() * baseTen) + 1;
	});

type SystemMetricLabelColorPairs = Pick<SystemMetric, "label" | "color">;

const generateMetricLabelColorPairs = (length: number): SystemMetricLabelColorPairs[] =>
	Object.keys(PROCESSES)
		.slice(0, length)
		.map((key) => {
			const colors = ["bg-info", "bg-success", "bg-warning", "bg-error"];
			return {
				label: PROCESSES[Number(key)],
				color: colors[Number(key) % colors.length],
			};
		});

export const generateSystemMetrics = (length: number): SystemMetric[] => {
	const generators = generateMetricValue(100, length);
	const labelColorPairs = generateMetricLabelColorPairs(length);

	return generators.map((gen, index) => ({
		value: gen(),
		label: labelColorPairs[index].label,
		color: labelColorPairs[index].color,
	}));
};

export const SYSTEM_METRICS: SystemMetric[] = generateSystemMetrics(4);

export interface TopProcess {
	name: string;
	count: number;
	percentage: number;
}

const knownTopProcessNames = [
	"Invoice Processing",
	"Contract Review",
	"Data Extraction",
	"Email Automation",
	"Report Generation",
];

export const generateTopProcesses = (length: number): TopProcess[] => {
	const processCounts = Array.from({ length }, () => Math.floor(Math.random() * 5000) + 1000);
	const total = processCounts.reduce((sum, count) => sum + count, 0);
	const percentages = processCounts.map((count) => Math.round((count / total) * 100));

	return Array.from({ length }, (_, i) => {
		return {
			name: knownTopProcessNames[i],
			count: processCounts[i],
			percentage: percentages[i],
		};
	});
};

export const TOP_PROCESSES: TopProcess[] = generateTopProcesses(5);
export const TIME_RANGES: TimeRange[] = ["24h", "7d", "30d", "90d"];
