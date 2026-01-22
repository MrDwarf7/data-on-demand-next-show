import {
	getStatisticsStatusStyles,
	type StatisticsStatus,
	type StatisticsTableData,
} from "@/config/external/statistics-config";
import { getStatisticsData, refreshStatistics } from "../actions";

export const StatisticsTableSkeleton = () => {
	// HACK: should be generating an object at comp. time for these tbh
	const headers = ["header-1", "header-2", "header-3", "header-4", "header-5"];
	const rows = ["row-1", "row-2", "row-3", "row-4", "row-5"];

	return (
		<div className="bg-accent/20 border border-accent rounded-2xl p-6 sm:p-8">
			<div className="flex items-center justify-between mb-6">
				<div className="h-8 w-48 bg-accent/50 rounded animate-pulse" />
				<div className="h-10 w-32 bg-accent/50 rounded animate-pulse" />
			</div>
			<div className="space-y-4">
				{/* Header skeleton */}
				<div className="flex space-x-4">
					{headers.map((key) => (
						<div key={key} className="h-4 flex-1 bg-accent/50 rounded animate-pulse" />
					))}
				</div>
				{/* Row skeletons */}
				{rows.map((key) => (
					<div key={key} className="flex space-x-4 py-4">
						<div className="h-4 flex-1 bg-accent/30 rounded animate-pulse" />
						<div className="h-6 w-16 bg-accent/30 rounded-full animate-pulse" />
						<div className="h-4 w-12 bg-accent/30 rounded animate-pulse" />
						<div className="h-4 w-16 bg-accent/30 rounded animate-pulse" />
						<div className="h-4 w-20 bg-accent/30 rounded animate-pulse" />
					</div>
				))}
			</div>
		</div>
	);
};

export const StatisticsTable = async () => {
	const tableData = await getStatisticsData();

	return <StatisticsTableClient tableData={tableData} />;
};

// Client component for interactive elements
const StatisticsTableClient = ({ tableData }: { tableData: StatisticsTableData }) => {
	"use client";

	return (
		<div className="bg-accent/20 border border-accent rounded-2xl p-6 sm:p-8">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-bold text-foreground">Process Overview</h2>
				<form action={refreshStatistics}>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 shadow-lg shadow-blue-600/50 hover:bg-blue-700 hover:shadow-blue-700/50 text-white text-sm rounded-xl font-medium transition-all whitespace-nowrap"
					>
						Refresh Data
					</button>
				</form>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-accent">
							{tableData.columns.map((column) => (
								<th
									key={column.value}
									className="text-left py-4 px-4 text-sm font-semibold text-foreground"
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableData.rows.map((row, index) => (
							<tr
								key={`${row.id}-${index}`}
								className={`border-b border-accent/50 hover:bg-accent/30 transition-colors ${
									index % 2 === 0 ? "bg-accent/10" : ""
								}`}
							>
								<td className="py-4 px-4 font-medium text-foreground">{row.process}</td>
								<td className="py-4 px-4">
									<span
										className={`px-3 py-1 rounded-full text-xs font-medium ${getStatisticsStatusStyles(row.status as StatisticsStatus).classNameBg} ${getStatisticsStatusStyles(row.status as StatisticsStatus).classNameColor}`}
									>
										{row.status}
									</span>
								</td>
								<td className="py-4 px-4 text-muted-foreground">{row.count}</td>
								<td className="py-4 px-4 text-muted-foreground">{row.avgTime}</td>
								<td className="py-4 px-4 text-muted-foreground">{row.successRate}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
