import { InternalHeroSection } from "@/components/InternalHeroSection";
import { DASHBOARD_TIPS } from "@/config/internal/dashboard-page";
import { DashboardTips } from "./_components/DashboardTips";
import { RenderDashboardCards } from "./_components/RenderDashboardCards";

export default function DashboardPage() {
	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-450 mx-auto space-y-6">
			<InternalHeroSection
				title="Dashboard"
				description="Welcome to the internal dashboard. Manage your automation workflows, monitor system status, and configure settings from here."
			/>

			<RenderDashboardCards />
			<DashboardTips {...DASHBOARD_TIPS} />
		</div>
	);
}
