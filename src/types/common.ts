import type { IconType } from "react-icons";

// Priority levels used across news, queue, etc.
export type Priority = "high" | "normal" | "low" | "urgent";

// Status types for notifications, statistics, etc.
export type StatusType = "info" | "success" | "warning" | "error";
export type ProcessingStatus = "processing" | "idle" | "active" | "paused" | "failed";
export type OperationStatus =
	| "pending"
	| "processing"
	| "completed"
	| "failed"
	| "success"
	| "error";
export type TrendType = "up" | "down" | "neutral";
export type StatTrend = Extract<TrendType, "up" | "down">; // without "neutral"

export interface ValueAndLabel<V = string, L = string> {
	value: V;
	label: L;
}

// Generic interface for items with optional styling
export interface StylableItem {
	className?: string;
}

// Common styling interface for data with icons
export type ClassNameDataWithIcon = {
	classNameColor: string;
	classNameBg: string;
	icon: IconType;
};

export type PriorityLevelData = {
	priorityLevel?: Priority;
	classNamePriority?: string;
};

export interface ClassNameDataWithIconPriority extends ClassNameDataWithIcon {
	priority?: PriorityLevelData;
}
