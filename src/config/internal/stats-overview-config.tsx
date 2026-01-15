import { FiActivity, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import { PROCESSES } from "@/constants/processes";

export const STATS_CARDS = [
	{
		title: "Total Processes",
		value: "12,847",
		change: "+12.5%",
		trend: "up",
		icon: <FiActivity className="w-6 h-6" />,
		gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
		bgGradient: "bg-info-10",
	},
	{
		title: "Success Rate",
		value: "98.2%",
		change: "+2.1%",
		trend: "up",
		icon: <FiCheckCircle className="w-6 h-6" />,
		gradient: "bg-gradient-to-r from-green-400 to-green-600",
		bgGradient: "bg-success-10",
	},
	{
		title: "Avg Processing Time",
		value: "2.4s",
		change: "-8.3%",
		trend: "up",
		icon: <FiClock className="w-6 h-6" />,
		gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
		bgGradient: "bg-info-10",
	},
	{
		title: "Active Users",
		value: "1,247",
		change: "+18.2%",
		trend: "up",
		icon: <FiUsers className="w-6 h-6" />,
		gradient: "bg-gradient-to-r from-yellow-400 to-red-500",
		bgGradient: "bg-warning-10",
	},
];

export const RECENT_ACTIVITY = [
	{
		id: 1,
		action: "Batch process completed",
		process: PROCESSES[0],
		time: "2 minutes ago",
		status: "success",
	},
	{
		id: 2,
		action: "New document uploaded",
		process: PROCESSES[1],
		time: "5 minutes ago",
		status: "processing",
	},
	{
		id: 3,
		action: "Error detected",
		process: PROCESSES[2],
		time: "12 minutes ago",
		status: "error",
	},
	{
		id: 4,
		action: "Queue cleared",
		process: PROCESSES[3],
		time: "25 minutes ago",
		status: "success",
	},
	{
		id: 5,
		action: "System maintenance",
		process: "Database Optimization",
		time: "1 hour ago",
		status: "info",
	},
];

export const SYSTEM_METRICS = [
	{ name: "CPU Usage", value: 67, color: "bg-info" },
	{ name: "Memory", value: 82, color: "bg-info" },
	{ name: "Storage", value: 45, color: "bg-success" },
	{ name: "Network", value: 34, color: "bg-warning" },
];

export const TOP_PROCESSES = [
	{ name: "Invoice Processing", count: 3421, percentage: 28 },
	{ name: "Contract Review", count: 2847, percentage: 23 },
	{ name: "Data Extraction", count: 2156, percentage: 18 },
	{ name: "Email Automation", count: 1893, percentage: 16 },
	{ name: "Report Generation", count: 1530, percentage: 15 },
];

export const TIME_RANGES = ["24h", "7d", "30d", "90d"];
