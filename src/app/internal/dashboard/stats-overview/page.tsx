"use client";

import { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FiAlertCircle, FiCheckCircle, FiServer, FiTrendingUp, FiZap } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import {
	RECENT_ACTIVITY,
	STATS_CARDS,
	SYSTEM_METRICS,
	TIME_RANGES,
	TOP_PROCESSES,
} from "@/config/internal/stats-overview-config";

export default function StatsOverviewPage() {
	const [timeRange, setTimeRange] = useState("24h");

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Statistics Overview</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Real-time insights into your automation performance
					</p>
				</div>
				<div className="flex gap-2">
					{TIME_RANGES.map((range) => (
						<button
							type="button"
							key={range}
							onClick={() => setTimeRange(range)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
								timeRange === range
									? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
									: "bg-accent/50 text-foreground hover:bg-accent"
							}`}
						>
							{range}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
				{STATS_CARDS.map((stat, index) => (
					<div
						key={stat.title}
						className={`relative overflow-hidden rounded-xl border border-accent/50 bg-gradient-to-br ${stat.bgGradient} p-6 transition-all hover:shadow-xl hover:scale-[1.02] group`}
						style={{ animationDelay: `${index * 100}ms` }}
					>
						<div className="flex items-start justify-between mb-4">
							<div
								className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
							>
								{stat.icon}
							</div>
							<div
								className={`flex items-center gap-1 text-sm font-medium ${
									stat.trend === "up" ? "text-green-600" : "text-red-600"
								}`}
							>
								<FiTrendingUp className="w-4 h-4" />
								{stat.change}
							</div>
						</div>
						<h3 className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</h3>
						<p className="text-3xl font-bold text-foreground">{stat.value}</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 bg-accent/30 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-blue-600 text-white">
								<HiOutlineChartBar className="w-5 h-5" />
							</div>
							<h2 className="text-xl font-semibold text-foreground">Performance Metrics</h2>
						</div>
					</div>
					<div className="h-[300px] flex items-center justify-center bg-accent/20 rounded-lg border-2 border-dashed border-accent/50">
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
								<HiOutlineChartBar className="w-8 h-8" />
							</div>
							<p className="text-muted-foreground font-medium">Chart visualization placeholder</p>
							<p className="text-sm text-muted-foreground mt-1">
								Integrate Chart.js or Recharts here
							</p>
						</div>
					</div>
				</div>

				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 rounded-lg bg-purple-600 text-white">
							<FiServer className="w-5 h-5" />
						</div>
						<h2 className="text-xl font-semibold text-foreground">System Health</h2>
					</div>
					<div className="space-y-4">
						{SYSTEM_METRICS.map((metric) => (
							<div key={metric.name}>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium text-foreground">{metric.name}</span>
									<span className="text-sm font-semibold text-foreground">{metric.value}%</span>
								</div>
								<div className="w-full h-2 bg-accent/50 rounded-full overflow-hidden">
									<div
										className={`h-full ${metric.color} rounded-full transition-all duration-500`}
										style={{ width: `${metric.value}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 rounded-lg bg-green-600 text-white">
							<FiZap className="w-5 h-5" />
						</div>
						<h2 className="text-xl font-semibold text-foreground">Top Processes</h2>
					</div>
					<div className="space-y-4">
						{TOP_PROCESSES.map((process, index) => (
							<div key={process.name} className="group">
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-3">
										<span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
										<span className="text-sm font-medium text-foreground">{process.name}</span>
									</div>
									<span className="text-sm font-semibold text-foreground">
										{process.count.toLocaleString()}
									</span>
								</div>
								<div className="w-full h-2 bg-accent/50 rounded-full overflow-hidden">
									<div
										className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 group-hover:from-green-400 group-hover:to-emerald-400"
										style={{ width: `${process.percentage}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center gap-3 mb-6">
						<div className="p-2 rounded-lg bg-orange-600 text-white">
							<AiOutlineClockCircle className="w-5 h-5" />
						</div>
						<h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
					</div>
					<div className="space-y-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
						{RECENT_ACTIVITY.map((activity) => (
							<div
								key={activity.id}
								className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-accent/30 hover:border-accent/60 transition-all"
							>
								<div
									className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
										activity.status === "success"
											? "bg-green-500"
											: activity.status === "error"
												? "bg-red-500"
												: activity.status === "processing"
													? "bg-blue-500 animate-pulse"
													: "bg-gray-500"
									}`}
								/>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
									<p className="text-xs text-muted-foreground truncate">{activity.process}</p>
									<p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
								</div>
								{activity.status === "error" && (
									<FiAlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
								)}
								{activity.status === "success" && (
									<FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
