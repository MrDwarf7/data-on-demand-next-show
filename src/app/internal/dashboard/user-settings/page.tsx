import { UserSettingsPageClient } from "./_components/UserSettingsPageClient";

export default function UserSettingsPage() {
	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage your account settings and preferences
				</p>
			</div>

			<UserSettingsPageClient />
		</div>
	);
}
