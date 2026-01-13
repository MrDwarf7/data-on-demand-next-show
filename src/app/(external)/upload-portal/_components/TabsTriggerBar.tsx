import type React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TabOptions } from "@/types/local";

const TabsTriggerBar = ({ availableTabs }: { availableTabs: TabOptions[] }) => {
	const capitalizeLetters = (word: TabOptions) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	const createAvailableTabs = availableTabs.map(
		(indivTriggerValue: TabOptions): React.ReactNode => {
			return (
				<TabsTrigger key={indivTriggerValue} value={indivTriggerValue}>
					For {capitalizeLetters(indivTriggerValue)}
				</TabsTrigger>
			);
		}
	);

	return <TabsList className="grid w-full max-w-md grid-cols-2">{createAvailableTabs}</TabsList>;
};

export { TabsTriggerBar };
