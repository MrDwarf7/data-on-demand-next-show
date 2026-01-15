import { SETTINGS_SECTIONS } from "@/config/internal/user-settings-config";
import { UserSettingsContent } from "./_components/UserSettingsContent";

export default function UserSettingsPage() {
	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage your account settings and preferences
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-1">
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 space-y-2">
						{SETTINGS_SECTIONS.map((section) => (
							<div
								key={section.id}
								className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-foreground"
							>
								{section.icon}
								{section.label}
							</div>
						))}
					</div>
				</div>

				<UserSettingsContent />
			</div>
		</div>
	);
}
