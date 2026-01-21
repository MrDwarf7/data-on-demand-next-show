"use client";

import { useState } from "react";
import { SETTINGS_SECTIONS, type SettingsSectionId } from "@/config/internal/user-settings-config";
import { UserSettingsContent } from "./UserSettingsContent";

type Section = (typeof SETTINGS_SECTIONS)[number]["value"];

export function UserSettingsPageClient() {
	const [activeSection, setActiveSection] = useState<SettingsSectionId>("profile");

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
			<div className="lg:col-span-1">
				<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 space-y-2">
					{SETTINGS_SECTIONS.map((section) => (
						<button
							key={section.value}
							type="button"
							onClick={() => setActiveSection(section.value)}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
								activeSection === section.value
									? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
									: "text-foreground hover:bg-accent"
							}`}
						>
							{section.icon({
								className: section.classNameIcon,
							})}
							{section.label}
						</button>
					))}
				</div>
			</div>

			<UserSettingsContent activeSection={activeSection} />
		</div>
	);
}
