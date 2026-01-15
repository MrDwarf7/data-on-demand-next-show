"use client";

import { useState } from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";
import { PriorityBadge, StatusBadge, StatusIcon } from "@/components/generic/QueueBadges";
import { QUEUE_FILTERS } from "@/config/internal/queue-data-config";
import type { QueueItemDisplay } from "@/lib/queue-utils";

interface QueueDataClientProps {
	items: QueueItemDisplay[];
}

export function QueueDataClient({ items }: QueueDataClientProps) {
	const [filter, setFilter] = useState("all");
	const [refreshing, setRefreshing] = useState(false);

	const handleRefresh = () => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 1000);
	};

	const filteredItems = filter === "all" ? items : items.filter((item) => item.status === filter);

	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
				<div className="flex items-center gap-2">
					<FiFilter className="w-5 h-5 text-muted-foreground" />
					<h2 className="text-lg font-semibold text-foreground">Filter by Status</h2>
				</div>
				<div className="flex items-center gap-4">
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
			</div>

			<div className="space-y-3">
				{filteredItems.map((item) => (
					<div
						key={item.id}
						className="bg-background border border-accent/50 rounded-lg p-4 hover:border-accent transition-all"
					>
						<div className="flex flex-col lg:flex-row lg:items-center gap-4">
							<div className="flex items-start gap-3 flex-1">
								<StatusIcon status={item.status} />
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
								<StatusBadge status={item.status}>
									{item.status.charAt(0).toUpperCase() + item.status.slice(1)}
								</StatusBadge>
								{item.priority.priorityLevel && (
									<PriorityBadge priority={item.priority.priorityLevel} />
								)}
							</div>

							<div className="text-sm text-right min-w-30">
								<p className={item.statusDisplay.className}>{item.statusDisplay.text}</p>
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
	);
}
