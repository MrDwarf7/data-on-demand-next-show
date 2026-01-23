"use client";

import { useSearchParams } from "next/navigation";
import { TIME_RANGES, type TimeRange } from "@/config/internal/stats-overview-config";

import { usePushFrom } from "@/lib/push-from-t";
import { Button } from "@/components/ui/button";

export const TimeRangePicker = () => {
	const searchParams = useSearchParams();
	const currentTimeRange = (searchParams.get("range") as TimeRange) || "24h";

	const handleTimeRangeChange = usePushFrom<TimeRange>("range");

	return (
		<div className="flex gap-2">
			{TIME_RANGES.map((range) => (
				<Button
					variant="ghost"
					type="button"
					key={range}
					onClick={() => handleTimeRangeChange(range)}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						currentTimeRange === range && "bg-blue-600 hover:bg-blue-700 text-white"
					}`}
				>
					{range}
				</Button>
			))}
		</div>
	);
};
