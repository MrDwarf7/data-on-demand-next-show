import { FiActivity, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";
import { PROCESSES } from "@/constants/processes";

export type TimeRange = "24h" | "7d" | "30d" | "90d";

export interface StatsCard {
	title: string;
	value: string;
	change: string;
	trend: "up" | "down";
	icon: React.ReactElement;
	gradient: string;
	bgGradient: string;
}

export interface RecentActivity {
	id: number;
	action: string;
	process: string;
	time: string;
	status: "success" | "error" | "processing" | "info";
}

export interface SystemMetric {
	name: string;
	value: number;
	color: string;
}

export interface TopProcess {
	name: string;
	count: number;
	percentage: number;
}

interface StatsData {
	statsCards: StatsCard[];
	recentActivity: RecentActivity[];
	systemMetrics: SystemMetric[];
	topProcesses: TopProcess[];
}

// Mock data for different time ranges
const MOCK_DATA: Record<TimeRange, StatsData> = {
	"24h": {
		statsCards: [
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
		],
		recentActivity: [
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
		],
		systemMetrics: [
			{ name: "CPU Usage", value: 67, color: "bg-info" },
			{ name: "Memory", value: 82, color: "bg-info" },
			{ name: "Storage", value: 45, color: "bg-success" },
			{ name: "Network", value: 34, color: "bg-warning" },
		],
		topProcesses: [
			{ name: PROCESSES[0], count: 3421, percentage: 28 },
			{ name: PROCESSES[1], count: 2847, percentage: 23 },
			{ name: PROCESSES[2], count: 2156, percentage: 18 },
			{ name: PROCESSES[3], count: 1893, percentage: 16 },
			{ name: PROCESSES[4], count: 1530, percentage: 15 },
		],
	},
	"7d": {
		statsCards: [
			{
				title: "Total Processes",
				value: "89,929",
				change: "+15.2%",
				trend: "up",
				icon: <FiActivity className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Success Rate",
				value: "97.8%",
				change: "+1.8%",
				trend: "up",
				icon: <FiCheckCircle className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-green-400 to-green-600",
				bgGradient: "bg-success-10",
			},
			{
				title: "Avg Processing Time",
				value: "2.6s",
				change: "-5.1%",
				trend: "up",
				icon: <FiClock className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Active Users",
				value: "8,729",
				change: "+22.4%",
				trend: "up",
				icon: <FiUsers className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-yellow-400 to-red-500",
				bgGradient: "bg-warning-10",
			},
		],
		recentActivity: [
			{
				id: 1,
				action: "Weekly report generated",
				process: PROCESSES[4],
				time: "1 day ago",
				status: "success",
			},
			{
				id: 2,
				action: "Bulk data import completed",
				process: PROCESSES[2],
				time: "2 days ago",
				status: "success",
			},
			{
				id: 3,
				action: "System backup finished",
				process: "Database Optimization",
				time: "3 days ago",
				status: "success",
			},
			{
				id: 4,
				action: "Contract review batch processed",
				process: PROCESSES[1],
				time: "4 days ago",
				status: "processing",
			},
			{
				id: 5,
				action: "Email campaign sent",
				process: PROCESSES[3],
				time: "5 days ago",
				status: "success",
			},
		],
		systemMetrics: [
			{ name: "CPU Usage", value: 72, color: "bg-info" },
			{ name: "Memory", value: 85, color: "bg-info" },
			{ name: "Storage", value: 52, color: "bg-success" },
			{ name: "Network", value: 41, color: "bg-warning" },
		],
		topProcesses: [
			{ name: PROCESSES[0], count: 23947, percentage: 27 },
			{ name: PROCESSES[1], count: 19929, percentage: 22 },
			{ name: PROCESSES[2], count: 15092, percentage: 17 },
			{ name: PROCESSES[3], count: 13251, percentage: 15 },
			{ name: PROCESSES[4], count: 10710, percentage: 12 },
		],
	},
	"30d": {
		statsCards: [
			{
				title: "Total Processes",
				value: "384,410",
				change: "+18.7%",
				trend: "up",
				icon: <FiActivity className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Success Rate",
				value: "97.1%",
				change: "+1.2%",
				trend: "up",
				icon: <FiCheckCircle className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-green-400 to-green-600",
				bgGradient: "bg-success-10",
			},
			{
				title: "Avg Processing Time",
				value: "2.8s",
				change: "-3.2%",
				trend: "up",
				icon: <FiClock className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Active Users",
				value: "37,410",
				change: "+25.8%",
				trend: "up",
				icon: <FiUsers className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-yellow-400 to-red-500",
				bgGradient: "bg-warning-10",
			},
		],
		recentActivity: [
			{
				id: 1,
				action: "Monthly analytics compiled",
				process: PROCESSES[4],
				time: "1 week ago",
				status: "success",
			},
			{
				id: 2,
				action: "Large dataset processed",
				process: PROCESSES[2],
				time: "2 weeks ago",
				status: "success",
			},
			{
				id: 3,
				action: "System optimization completed",
				process: "Database Optimization",
				time: "3 weeks ago",
				status: "success",
			},
			{
				id: 4,
				action: "Contract portfolio reviewed",
				process: PROCESSES[1],
				time: "4 weeks ago",
				status: "processing",
			},
			{
				id: 5,
				action: "Bulk email communications sent",
				process: PROCESSES[3],
				time: "5 weeks ago",
				status: "success",
			},
		],
		systemMetrics: [
			{ name: "CPU Usage", value: 78, color: "bg-info" },
			{ name: "Memory", value: 88, color: "bg-info" },
			{ name: "Storage", value: 61, color: "bg-success" },
			{ name: "Network", value: 48, color: "bg-warning" },
		],
		topProcesses: [
			{ name: PROCESSES[0], count: 102647, percentage: 27 },
			{ name: PROCESSES[1], count: 85329, percentage: 22 },
			{ name: PROCESSES[2], count: 64632, percentage: 17 },
			{ name: PROCESSES[3], count: 56823, percentage: 15 },
			{ name: PROCESSES[4], count: 45979, percentage: 12 },
		],
	},
	"90d": {
		statsCards: [
			{
				title: "Total Processes",
				value: "1,153,230",
				change: "+22.1%",
				trend: "up",
				icon: <FiActivity className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Success Rate",
				value: "96.5%",
				change: "+0.8%",
				trend: "up",
				icon: <FiCheckCircle className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-green-400 to-green-600",
				bgGradient: "bg-success-10",
			},
			{
				title: "Avg Processing Time",
				value: "3.1s",
				change: "-1.5%",
				trend: "up",
				icon: <FiClock className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-blue-400 to-blue-600",
				bgGradient: "bg-info-10",
			},
			{
				title: "Active Users",
				value: "112,230",
				change: "+28.9%",
				trend: "up",
				icon: <FiUsers className="w-6 h-6" />,
				gradient: "bg-gradient-to-r from-yellow-400 to-red-500",
				bgGradient: "bg-warning-10",
			},
		],
		recentActivity: [
			{
				id: 1,
				action: "Quarterly financial report finalized",
				process: PROCESSES[4],
				time: "1 month ago",
				status: "success",
			},
			{
				id: 2,
				action: "Annual data archive completed",
				process: PROCESSES[2],
				time: "2 months ago",
				status: "success",
			},
			{
				id: 3,
				action: "Infrastructure upgrade finished",
				process: "Database Optimization",
				time: "3 months ago",
				status: "success",
			},
			{
				id: 4,
				action: "Full contract audit conducted",
				process: PROCESSES[1],
				time: "4 months ago",
				status: "processing",
			},
			{
				id: 5,
				action: "Global email campaign executed",
				process: PROCESSES[3],
				time: "5 months ago",
				status: "success",
			},
		],
		systemMetrics: [
			{ name: "CPU Usage", value: 82, color: "bg-info" },
			{ name: "Memory", value: 91, color: "bg-info" },
			{ name: "Storage", value: 68, color: "bg-success" },
			{ name: "Network", value: 55, color: "bg-warning" },
		],
		topProcesses: [
			{ name: PROCESSES[0], count: 307941, percentage: 27 },
			{ name: PROCESSES[1], count: 255987, percentage: 22 },
			{ name: PROCESSES[2], count: 193896, percentage: 17 },
			{ name: PROCESSES[3], count: 170469, percentage: 15 },
			{ name: PROCESSES[4], count: 137937, percentage: 12 },
		],
	},
};

// Function to get stats data (server-side compatible)
export function getStatsOverview(timeRange: TimeRange): StatsData {
	// TODO: [backend] : Replace with API call: fetch(`/api/stats?range=${timeRange}`)
	return MOCK_DATA[timeRange];
}

// Hook to fetch stats data (currently mock, easily replaceable with API call)
// export function useStatsOverview(timeRange: TimeRange): StatsData {
// 	return useMemo(() => {
// 		return getStatsOverview(timeRange);
// 	}, [timeRange]);
// }
