"use client";

import { useState } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import {
	QUEUE_FILTERS,
	QUEUE_ITEMS,
	QUEUE_STATS,
	QUEUE_TYPE_STYLES,
	type QueueStatsType,
	type QueueTypePriority,
} from "@/config/internal/queue-data-config";

export default function QueueDataPage() {
	const [filter, setFilter] = useState("all");
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000);
	};

	const getStatusIcon = (status: Lowercase<QueueStatsType>) => {
		const styles = QUEUE_TYPE_STYLES[status] || QUEUE_TYPE_STYLES.default;
		return <styles.icon className={`w-5 h-5 ${styles.classNameColor}`} />;
	};

	const getStatusBadge = (status: Lowercase<QueueStatsType>) => {
		const styles = QUEUE_TYPE_STYLES[status as keyof typeof QUEUE_TYPE_STYLES];
		return (
			<span
				className={`px-3 py-1 rounded-full text-xs font-medium ${styles.classNameBg} ${styles.classNameColor}`}
			>
				{styles.icon && <styles.icon className="w-3 h-3 inline-block mr-1" />}
			</span>
		);
	};

	const getPriorityBadge = (priority: QueueTypePriority) => {
		const styles = QUEUE_TYPE_STYLES[priority] || QUEUE_TYPE_STYLES.default;
		const prio = styles.priority ? styles.priority : QUEUE_TYPE_STYLES.default.priority;
		return (
			<span
				className={`px-3 py-1 rounded-full text-xs font-medium border ${styles.classNameBg} ${styles.classNameColor} ${prio?.classNamePriority}`}
			>
				{prio?.priorityLevel ? prio.priorityLevel.toUpperCase() : ""}
			</span>
		);
	};

	const filteredItems =
		filter === "all" ? QUEUE_ITEMS : QUEUE_ITEMS.filter((item) => item.status === filter);

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-400 mx-auto space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Queue Data</h1>
					<p className="text-sm text-muted-foreground mt-1">
						Monitor and manage processing queues in real-time
					</p>
				</div>
				<button
					type="button"
					onClick={handleRefresh}
					className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg ${
						refreshing ? "opacity-50" : ""
					}`}
					disabled={refreshing}
				>
					<FiRefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
					Refresh
				</button>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{QUEUE_STATS.map((stat) => (
					<div
						key={stat.label}
						className={`${stat.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
					>
						<p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
						<p className={`text-3xl font-bold ${stat.classNameColor}`}>{stat.count}</p>
					</div>
				))}
			</div>

			<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 sm:p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div className="flex items-center gap-2">
						<FiFilter className="w-5 h-5 text-muted-foreground" />
						<h2 className="text-lg font-semibold text-foreground">Filter by Status</h2>
					</div>
					<div className="flex flex-wrap gap-2">
						{QUEUE_FILTERS.map((status) => (
							<button
								type="button"
								key={status}
								onClick={() => setFilter(status)}
								className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
									filter === status
										? "bg-blue-600 text-white shadow-lg"
										: "bg-accent/50 text-foreground hover:bg-accent"
								}`}
							>
								{status.charAt(0).toUpperCase() + status.slice(1)}
							</button>
						))}
					</div>
				</div>

				<div className="space-y-3">
					{filteredItems.map((item) => (
						<div
							key={item.id}
							className="bg-background border border-accent/50 rounded-lg p-4 hover:border-accent transition-all"
						>
							<div className="flex flex-col lg:flex-row lg:items-center gap-4">
								<div className="flex items-start gap-3 flex-1">
									{getStatusIcon(item.status)}
									<div className="flex-1 min-w-0">
										<div className="flex items-center gap-2 mb-1">
											<h3 className="font-semibold text-foreground">{item.process}</h3>
											<span className="text-xs text-muted-foreground">{item.id}</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Submitted by {item.user} • {item.submitted}
										</p>
									</div>
								</div>

								<div className="flex flex-wrap items-center gap-2">
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}
									>
										{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
									</span>
									{item.priority.priorityLevel && getPriorityBadge(item.priority.priorityLevel)}
								</div>

								<div className="text-sm text-right min-w-30">
									{item.status === "completed" && (
										<p className="text-green-600 font-medium">✓ Done in {item.completedIn}</p>
									)}
									{item.status === "processing" && (
										<p className="text-purple-600 font-medium">~{item.estimatedTime} remaining</p>
									)}
									{item.status === "pending" && (
										<p className="text-blue-600 font-medium">ETA: {item.estimatedTime}</p>
									)}
									{item.status === "failed" && (
										<p className="text-red-600 font-medium text-xs">{item.error}</p>
									)}
									{item.status === "paused" && (
										<p className="text-orange-600 font-medium text-xs">{item.reason}</p>
									)}
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredItems.length === 0 && (
					<div className="text-center py-12">
						<p className="text-muted-foreground">No items found for this filter</p>
					</div>
				)}
			</div>
		</div>
	);
}
