import type { IconType } from "react-icons";

// Priority levels used across news, queue, etc.
export type Priority = "high" | "normal" | "low" | "urgent";

// Status types for notifications, statistics, etc.
export type StatusType = "info" | "success" | "warning" | "error";
export type ProcessingStatus = "processing" | "idle" | "active" | "paused" | "failed";
export type TrendType = "up" | "down" | "neutral";

// Common styling interface for data with icons
export type ClassNameDataWithIcon = {
	classNameColor: string;
	classNameBg: string;
	icon: IconType;
};

// Generic interface for items with optional styling
export interface StylableItem {
	className?: string;
}
