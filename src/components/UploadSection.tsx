import { Suspense } from "react";
import { ProcessPicker } from "@/app/(external)/upload-portal/_components/ProcessPicker";
import {
	ProcessPickerSkeleton,
	// UploadAreaSkeleton,
} from "@/app/(external)/upload-portal/_components/Skeletons";
import { TabsContentAutomation } from "@/app/(external)/upload-portal/_components/TabsContentAutomation";
import { TabsContentHumans } from "@/app/(external)/upload-portal/_components/TabsContentHumans";
import { TabsTriggerBar } from "@/app/(external)/upload-portal/_components/TabsTriggerBar";
import type { UploadPortalPageProps } from "@/app/(external)/upload-portal/page";
import { Tabs } from "@/components/ui/tabs";
import { useProcesses } from "@/hooks/use-processes";
import type { TabOptions } from "@/types/local";

interface UploadSectionProps extends UploadPortalPageProps {
	showAutomationTab?: boolean;
	availableTabs?: TabOptions[];
	defaultTab?: TabOptions;
}

export const UploadSection = async ({
	showAutomationTab = true,
	availableTabs,
	defaultTab = "humans",
	searchParams,
}: UploadSectionProps) => {
	const [params, processList] = await Promise.all([searchParams, useProcesses()]);
	const selectedProcess = params.process ?? null;
	const tabsToShow = availableTabs || (showAutomationTab ? ["humans", "automations"] : ["humans"]);

	return (
		<>
			<Suspense fallback={<ProcessPickerSkeleton />}>
				<ProcessPicker processList={processList} selectedProcess={selectedProcess} />
			</Suspense>

			<Tabs defaultValue={defaultTab} className="pt-4">
				<div className="p-2">
					<div className="flex flex-col items-center mb-4 pb-2">
						{tabsToShow.length > 1 && <TabsTriggerBar availableTabs={tabsToShow} />}
					</div>
					{/* <Suspense fallback={<UploadAreaSkeleton />}> */}
					<TabsContentHumans selectedProcess={selectedProcess} />
					{/* </Suspense> */}
					{showAutomationTab && (
						// {/* <Suspense fallback={<UploadAreaSkeleton />}> */}
						<TabsContentAutomation />
						// {/* </Suspense> */}
					)}
				</div>
			</Tabs>
		</>
	);
};
