import { ProcessPicker } from "@/app/(external)/upload-portal/_components/ProcessPicker";
import { TabsContentAutomation } from "@/app/(external)/upload-portal/_components/TabsContentAutomation";
import { TabsContentHumans } from "@/app/(external)/upload-portal/_components/TabsContentHumans";
import { TabsTriggerBar } from "@/app/(external)/upload-portal/_components/TabsTriggerBar";
import { Tabs } from "@/components/ui/tabs";
import type { TabOptions } from "@/types/local";

interface UploadSectionProps {
	showAutomationTab?: boolean;
	availableTabs?: TabOptions[];
	defaultTab?: TabOptions;
}

export const UploadSection = ({
	showAutomationTab = true,
	availableTabs,
	defaultTab = "humans",
}: UploadSectionProps) => {
	const tabsToShow = availableTabs || (showAutomationTab ? ["humans", "automations"] : ["humans"]);

	return (
		<div>
			<div className="mb-6 flex flex-row justify-end">
				<ProcessPicker />
			</div>

			<Tabs defaultValue={defaultTab} className="mt-4">
				{tabsToShow.length > 1 && <TabsTriggerBar availableTabs={tabsToShow} />}
				<div className="p-2">
					<TabsContentHumans />
					{showAutomationTab && <TabsContentAutomation />}
				</div>
			</Tabs>
		</div>
	);
};
