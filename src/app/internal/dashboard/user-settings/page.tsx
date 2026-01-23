import { InternalHeroSection } from "@/components/InternalHeroSection";
import { UserSettingsPageClient } from "./_components/UserSettingsPageClient";

export default function UserSettingsPage() {
	return (
		// <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
		<div className="p-4 sm:p-6 lg:p-8 max-w-450 mx-auto space-y-6">
			<InternalHeroSection
				title="Settings"
				description="Manage your account settings and preferences"
			/>

			<UserSettingsPageClient />
		</div>
	);
}
