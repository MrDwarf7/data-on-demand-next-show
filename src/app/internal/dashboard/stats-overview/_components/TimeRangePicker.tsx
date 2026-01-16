"use client";

import { useSearchParams } from "next/navigation";
import { TIME_RANGES } from "@/config/internal/stats-overview-config";
import type { TimeRange } from "@/hooks/use-stats-overview";
import { usePushFrom } from "@/lib/push-from-t";

export const TimeRangePicker = () => {
	const searchParams = useSearchParams();
	const currentTimeRange = (searchParams.get("range") as TimeRange) || "24h";

	const handleTimeRangeChange = usePushFrom<TimeRange>("range");

	return (
		<div className="flex gap-2">
			{TIME_RANGES.map((range) => (
				<button
					type="button"
					key={range}
					onClick={() => handleTimeRangeChange(range)}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						currentTimeRange === range
							? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
							: "bg-accent/50 text-foreground hover:bg-accent"
					}`}
				>
					{range}
				</button>
			))}
		</div>
	);
};
