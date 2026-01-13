import { Calendar } from "@/components/ui/calendar";

export type ReportCalendarProps = {
	date: Date;
	specificDate?: Date;
	className?: string;
};

const ReportCalendar = ({ ...props }: ReportCalendarProps) => {
	const { date, className } = props;

	const completeDate = new Date(date.getDate(), date.getMonth(), date.getFullYear());

	return (
		<Calendar
			mode="single"
			defaultMonth={new Date()}
			selected={completeDate}
			className={className}
		/>
	);
};

export { ReportCalendar };
