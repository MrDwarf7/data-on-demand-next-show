"use server";

import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { RenderInfoTiles } from "./_components/RenderTileData";
import { TabsContentLoading } from "./_components/Skeletons";
import { UploadPortalStatsCards } from "./_components/StatsCards";

// TODO: See other [...] todo items regarding further refactoring
// TODO: [tabs_content] :
// TODO: [process_picker] :

export interface UploadPortalPageProps {
	searchParams: Promise<{ process?: string }>;
}

export interface UploadPortalPagePropsResolved {
	process?: string | null;
}

export default async function UploadPortalPage({ searchParams }: UploadPortalPageProps) {
	// Queue statistics (TODO: [backend] : Replace with live data)
	const statCardsProps = { lastReportDate: new Date() };

	return (
		<>
			<HeroSection
				title="Upload Portal"
				description="Submit your documents for automated processing. Select a process type and upload your files to get started."
			/>

			{/* Stats and Calendar Row */}
			<UploadPortalStatsCards {...statCardsProps} />

			{/* Upload Section */}
			<div className="mb-8">
				<Suspense fallback={<TabsContentLoading />}>
					<UploadSection searchParams={searchParams} />
				</Suspense>
			</div>

			<RenderInfoTiles />
		</>
	);
}
