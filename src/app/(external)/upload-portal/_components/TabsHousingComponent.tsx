import { FiSend } from "react-icons/fi";
import { TabsContentAutomation } from "@/app/(external)/upload-portal/_components/TabsContentAutomation";
import { TabsContentHumans } from "@/app/(external)/upload-portal/_components/TabsContentHumans";
import { TabsTriggerBar } from "@/app/(external)/upload-portal/_components/TabsTriggerBar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { TabOptions } from "@/types/local";

const TabsMainComponent = ({ ...props }) => {
	const { className, defaultTab } = props;

	// Changing the order of the array will change the order of the tabs
	const availableTabs: TabOptions[] = ["humans", "automations"];
	// Tabs can essentially be turned on and off by adding or removing them from this array,
	// bear in mind if you add a tab in this array but WITHOUT a component + index value, it will show up as a tab,
	// but will not have any content

	return (
		<>
			<Tabs defaultValue={defaultTab} className={cn("mt-4", className)}>
				<TabsTriggerBar availableTabs={availableTabs} />
				<div className="p-2">
					<TabsContentHumans singleKey={availableTabs[0]} />
					<TabsContentAutomation singleKey={availableTabs[1]} />
				</div>
			</Tabs>
			<span className="flex justify-end">
				<FiSend className="absolute mt-3 ml-3 text-white opacity-0" />
				<Button className="bg-accent hover:bg-ring rounded-lg" type="submit">
					Send Files
				</Button>
			</span>
		</>
	);
};

export { TabsMainComponent };
