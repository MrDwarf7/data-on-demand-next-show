import { FiZap } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";
import type { TopProcess } from "@/config/internal/stats-overview-config";

export interface TopProcessesSkeletonProps {
	count: number;
}

export const TopProcessesSkeleton = ({ count }: TopProcessesSkeletonProps) => (
	<Skeleton className="space-y-4">
		{Array.from({ length: count }).map((_, index) => (
			<Skeleton key={index.toString()} className="group">
				<Skeleton className="flex items-center justify-between mb-2">
					<Skeleton className="flex items-center gap-3">
						<Skeleton className="text-lg font-bold text-muted-foreground" />
						<Skeleton className="text-sm font-medium text-foreground" />
					</Skeleton>
					<Skeleton className="text-sm font-semibold text-foreground">
						<Skeleton />
					</Skeleton>
				</Skeleton>
				<Skeleton className="w-full h-2 bg-accent/50 rounded-full overflow-hidden">
					<Skeleton className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 group-hover:from-green-400 group-hover:to-emerald-400" />
				</Skeleton>
			</Skeleton>
		))}
	</Skeleton>
);

export const TopProcesses = ({ topProcesses }: { topProcesses: TopProcess[] }) => {
	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 rounded-lg bg-green-600 text-white">
					<FiZap className="w-5 h-5" />
				</div>
				<h2 className="text-xl font-semibold text-foreground">Top Processes</h2>
			</div>
			<div className="space-y-4">
				{topProcesses.map((process, index) => (
					<div
						key={`${process.name}__${process.count}__${process.percentage}__${index}`}
						className="group"
					>
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
								className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 group-hover:from-green-400 group-hover:to-emerald-400"
								style={{ width: `${process.percentage}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
