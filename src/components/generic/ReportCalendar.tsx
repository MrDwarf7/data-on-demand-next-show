"use client";

import { addDays } from "date-fns";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export type ReportCalendarProps = {
	defaultOpenDate: Date;
	specificDate?: Date;
	className?: string;
};

// We need to track the number of selected dats.
// First one (start date) and second one (end date).
// Once a full selection has been made, we can:
// 1. Close the picker,
// 2. Update the report data based on the selected range.
// 3. Fire any callbacks or backend calls to optimisticlly fetch the report range (or cache locally. (cookie? Local Storage?))

const closestMonday = (date: Date): Date => {
	if (date.getDay() === 1) {
		return date;
	} else {
		const nearMondayBackwards = addDays(date, -((date.getDay() + 6) % 7));
		const nearMondayForwards = addDays(date, (8 - date.getDay()) % 7);

		// boolean - is nearMondayBackwards closer? -> returns Date
		return Math.abs(date.getTime() - nearMondayBackwards.getTime()) <=
			Math.abs(date.getTime() - nearMondayForwards.getTime())
			? nearMondayBackwards
			: nearMondayForwards;
	}
};

const ReportCalendar = ({ ...props }: ReportCalendarProps) => {
	const { defaultOpenDate, className } = props;
	const today = new Date();
	const closestMondayDate = closestMonday(today);
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: closestMondayDate,
		to: addDays(closestMondayDate, 6),
	});

	// console.log("Closest Monday date calculated:", closestMondayDate);

	return (
		<Calendar
			mode="range"
			defaultMonth={dateRange?.from || defaultOpenDate}
			selected={dateRange}
			onSelect={setDateRange}
			numberOfMonths={2}
			className={cn("rounded-lg border inset-shadow-2xs drop-shadow-sm", className)}
		/>
	);
};

export { ReportCalendar };
