import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { EXTERNAL_CORE_VALUES } from "@/config/external/core-values";
import { CoreValueCardClient } from "./CoreValueComponentClient";

export interface CoreValueCardProps {
	value: (typeof EXTERNAL_CORE_VALUES)[0];
	className?: string;
}

export const CoreValueCard = (data: CoreValueCardProps) => {
	const lines = data.value.details.lines;
	const linesIds = lines.map((_, id) => `${id}__core_value_card`);

	return (
		<div className="flex flex-col items-center">
			<div className="shrink-0">
				<div className="flex items-center justify-center w-12 h-12 text-3xl bg-ring/90 rounded-md">
					{data.value.icon}
				</div>
			</div>
			<div className="mt-4 text-center">
				<h3 className="text-lg font-medium text-foreground">{data.value.name}</h3>
				<p className="mt-2 text-base text-muted-foreground">{data.value.summary}</p>

				<CoreValueCardClient lines={data.value.details.lines} lineIds={linesIds} />
			</div>
		</div>
	);
};

export const RenderCoreValues = () => {
	return (
		<MaxWidthWrapper className="py-10">
			<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
				{EXTERNAL_CORE_VALUES.map((value) => (
					<CoreValueCard key={value.name} value={value} />
				))}
			</div>
		</MaxWidthWrapper>
	);
};
