// "use client";

import { Suspense } from "react";
import { ProcessPicker } from "@/app/(external)/upload-portal/_components/ProcessPicker";
import {
	ProcessPickerSkeleton,
	UploadAreaSkeleton,
} from "@/app/(external)/upload-portal/_components/Skeletons";
import { TabsContentAutomation } from "@/app/(external)/upload-portal/_components/TabsContentAutomation";
import { TabsContentHumans } from "@/app/(external)/upload-portal/_components/TabsContentHumans";
import { TabsTriggerBar } from "@/app/(external)/upload-portal/_components/TabsTriggerBar";
import { Tabs } from "@/components/ui/tabs";
import type { TabOptions } from "@/types/local";
import {
	UploadPortalPageProps,
	UploadPortalPagePropsResolved,
} from "@/app/(external)/upload-portal/page";
import { useProcesses } from "@/hooks/use-processes";

interface UploadSectionProps extends UploadPortalPageProps {
	showAutomationTab?: boolean;
	availableTabs?: TabOptions[];
	defaultTab?: TabOptions;
}

interface FileWithStatus {
	file: File;
	isRejected: boolean;
	errors: string[];
}

export const UploadSection = async ({
	showAutomationTab = true,
	availableTabs,
	defaultTab = "humans",
	searchParams,
}: UploadSectionProps) => {
	// const [selectedFiles, setSelectedFiles] = useState<FileWithStatus[]>([]);

	const [params, processList] = await Promise.all([searchParams, useProcesses()]);

	const selectedProcess = params.process ?? null;

	const tabsToShow = availableTabs || (showAutomationTab ? ["humans", "automations"] : ["humans"]);

	// const handleFilesChange = (files: FileWithStatus[]) => {
	// 	setSelectedFiles(files);
	// };

	return (
		<>
			<div className="mb-6 flex flex-row justify-end">
				<Suspense fallback={<ProcessPickerSkeleton />}>
					<ProcessPicker
						processList={processList}
						selectedProcess={selectedProcess}

						// selectedFilesCount={selectedFiles.filter((f) => !f.isRejected).length}
					/>
				</Suspense>
			</div>

			<Tabs defaultValue={defaultTab} className="mt-4">
				{tabsToShow.length > 1 && <TabsTriggerBar availableTabs={tabsToShow} />}
				<div className="p-2">
					<Suspense fallback={<UploadAreaSkeleton />}>
						{/* <TabsContentHumans selectedFiles={selectedFiles} onFilesChange={handleFilesChange} /> */}
						<TabsContentHumans selectedProcess={selectedProcess} />
					</Suspense>
					{showAutomationTab && (
						<Suspense fallback={<UploadAreaSkeleton />}>
							<TabsContentAutomation />
						</Suspense>
					)}
				</div>
			</Tabs>
		</>
	);
};
