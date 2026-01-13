import { FiActivity, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";

export const STATS_CARDS = [
	{
		title: "Total Processes",
		value: "12,847",
		change: "+12.5%",
		trend: "up",
		icon: <FiActivity className="w-6 h-6" />,
		gradient: "from-blue-500 to-cyan-500",
		bgGradient: "from-blue-500/10 to-cyan-500/10",
	},
	{
		title: "Success Rate",
		value: "98.2%",
		change: "+2.1%",
		trend: "up",
		icon: <FiCheckCircle className="w-6 h-6" />,
		gradient: "from-green-500 to-emerald-500",
		bgGradient: "from-green-500/10 to-emerald-500/10",
	},
	{
		title: "Avg Processing Time",
		value: "2.4s",
		change: "-8.3%",
		trend: "up",
		icon: <FiClock className="w-6 h-6" />,
		gradient: "from-purple-500 to-pink-500",
		bgGradient: "from-purple-500/10 to-pink-500/10",
	},
	{
		title: "Active Users",
		value: "1,247",
		change: "+18.2%",
		trend: "up",
		icon: <FiUsers className="w-6 h-6" />,
		gradient: "from-orange-500 to-red-500",
		bgGradient: "from-orange-500/10 to-red-500/10",
	},
];

export const RECENT_ACTIVITY = [
	{
		id: 1,
		action: "Batch process completed",
		process: "Invoice Processing",
		time: "2 minutes ago",
		status: "success",
	},
	{
		id: 2,
		action: "New document uploaded",
		process: "Contract Review",
		time: "5 minutes ago",
		status: "processing",
	},
	{
		id: 3,
		action: "Error detected",
		process: "Data Extraction",
		time: "12 minutes ago",
		status: "error",
	},
	{
		id: 4,
		action: "Queue cleared",
		process: "Email Automation",
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
	{ name: "CPU Usage", value: 67, color: "bg-blue-500" },
	{ name: "Memory", value: 82, color: "bg-purple-500" },
	{ name: "Storage", value: 45, color: "bg-green-500" },
	{ name: "Network", value: 34, color: "bg-orange-500" },
];

export const TOP_PROCESSES = [
	{ name: "Invoice Processing", count: 3421, percentage: 28 },
	{ name: "Contract Review", count: 2847, percentage: 23 },
	{ name: "Data Extraction", count: 2156, percentage: 18 },
	{ name: "Email Automation", count: 1893, percentage: 16 },
	{ name: "Report Generation", count: 1530, percentage: 15 },
];

export const TIME_RANGES = ["24h", "7d", "30d", "90d"];
