import {
	FiAlertCircle,
	FiCheckCircle,
	FiClock,
	FiLoader,
	FiMinus,
	FiPauseCircle,
	FiTrendingUp,
} from "react-icons/fi";
import type { ClassNameDataWithIcon } from "@/types/common";

export type CommonStatus =
	| "active"
	| "idle"
	| "paused"
	| "failed"
	| "processed"
	| "processing"
	| "completed"
	| "pending"
	| "all"
	| "success"
	| "warning"
	| "error"
	| "info";

export const COMMON_STATUSES: CommonStatus[] = [
	"active",
	"idle",
	"paused",
	"failed",
	"processed",
	"processing",
	"completed",
	"pending",
	"all",
	"success",
	"warning",
	"error",
	"info",
];

export const STATUS_STYLES: Record<CommonStatus, ClassNameDataWithIcon> = {
	active: {
		icon: FiTrendingUp,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	idle: {
		icon: FiMinus,
		classNameColor: "text-neutral-foreground",
		classNameBg: "bg-neutral-10",
	},
	paused: {
		icon: FiPauseCircle,
		classNameColor: "text-warning-foreground",
		classNameBg: "bg-warning-10",
	},
	failed: {
		icon: FiAlertCircle,
		classNameColor: "text-error-foreground",
		classNameBg: "bg-error-10",
	},
	processed: {
		icon: FiCheckCircle,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	processing: {
		icon: FiLoader,
		classNameColor: "text-info-foreground",
		classNameBg: "bg-info-10",
	},
	completed: {
		icon: FiCheckCircle,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	pending: {
		icon: FiClock,
		classNameColor: "text-info-foreground",
		classNameBg: "bg-info-10",
	},
	all: {
		icon: FiClock,
		classNameColor: "text-neutral-foreground",
		classNameBg: "bg-neutral-10",
	},
	success: {
		icon: FiCheckCircle,
		classNameColor: "text-success-foreground",
		classNameBg: "bg-success-10",
	},
	warning: {
		icon: FiPauseCircle,
		classNameColor: "text-warning-foreground",
		classNameBg: "bg-warning-10",
	},
	error: {
		icon: FiAlertCircle,
		classNameColor: "text-error-foreground",
		classNameBg: "bg-error-10",
	},
	info: {
		icon: FiClock,
		classNameColor: "text-info-foreground",
		classNameBg: "bg-info-10",
	},
};
