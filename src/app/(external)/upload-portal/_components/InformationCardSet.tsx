import { ReportCalendar } from "@/components/generic/ReportCalendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// import { Calendar } from "@/components/ui/calendar"; // Temp until proper data cards are put together
import { cn } from "@/lib/utils";

type TDateAsString<T> = T extends Date ? string : never;

function InformationCardSet() {
	const localDate = new Date();
	const lastReportDate = new Date().toLocaleDateString() as TDateAsString<string>;

	function classNameMerge(...classNames: string[]) {
		return cn("text-md mt-2", ...classNames);
	}

	// TODO: [backend] : Replace with live data

	const pending = 588;
	const exception = 14;
	const completed = 200;

	return (
		<div className="flex flex-col justify-center gap-y-8 items-center gap-x-0 overflow-hidden sm:flex sm:flex-row sm:justify-evenly sm:gap-x-2 lg:flex lg:flex-row lg:justify-evenly lg:gap-x-4">
			<Card className="">
				<CardContent>
					<div className="min-w-full p-4 whitespace-nowrap gap-y-2">
						<h1 className="text-2xl font-bold mb-2">Current Queue volume</h1>

						<p className={classNameMerge()}>
							Pending: <span className="text-yellow-500">{pending}</span>
						</p>
						<br />
						<p className={classNameMerge()}>
							Exception: <span className="text-red-500">{exception}</span>
						</p>
						<br />
						<p className={classNameMerge()}>
							Completed: <span className="text-green-500">{completed}</span>
						</p>
					</div>
				</CardContent>
			</Card>
			{/* <Calendar /> */}
			{/* <Calendar /> */}
			{/* normal calendar is a placeholder for time being */}
			{/* card with nested report cal renders, currently at: 250 x 395.19 */}
			<Card>
				<CardContent>
					<h1 className="flex text-2xl font-bold my-2 justify-center text-center">
						Report Calendar
					</h1>
					<div className="flex justify-center items-center">
						<ReportCalendar defaultOpenDate={localDate} />
					</div>
					<CardFooter className="flex justify-center items-center">
						<p className="text-muted-foreground text-sm justify-center text-center">
							Last report date: <span className="text-ring font-semibold">{lastReportDate}</span>
						</p>
					</CardFooter>

					{/* Or can place ProcessPicker here, though not ideal */}
				</CardContent>
			</Card>
		</div>
	);
}

export { InformationCardSet };
