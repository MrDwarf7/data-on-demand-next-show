"use server";

import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { UploadSection } from "@/components/UploadSection";
import { Skeleton } from "@/components/ui/skeleton";
import { RenderInfoTiles } from "./_components/RenderTileData";
import { UploadPortalStatsCards } from "./_components/StatsCards";

// TODO: See other [...] todo items regarding further refactoring
// TODO: [tabs_content] :
// TODO: [process_picker] :

async function tabsContentLoading() {
	return (
		<Skeleton>
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
					<p className="text-muted-foreground">Loading upload interface...</p>
				</div>
			</div>
		</Skeleton>
	);
}

export default async function UploadPortalPage() {
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
				<Suspense fallback={tabsContentLoading()}>
					<UploadSection />
				</Suspense>
			</div>

			<RenderInfoTiles />
		</>
	);
}
