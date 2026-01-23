"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SETTINGS_SECTIONS, type SettingsSectionId } from "@/config/internal/user-settings-config";
import { UserSettingsContent } from "./UserSettingsContent";

// type Section = (typeof SETTINGS_SECTIONS)[number]["value"];

// TODO: [perf] convert to server action almost entirely

// TODO : we can do this with handing down the search params
export function UserSettingsPageClient() {
	const [activeSection, setActiveSection] = useState<SettingsSectionId>("profile");

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
			<div className="lg:col-span-1">
				<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 space-y-2">
					{SETTINGS_SECTIONS.map((section) => (
						<Button
							variant="ghost"
							key={section.value}
							type="button"
							onClick={() => setActiveSection(section.value)}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all shadow-lg hover:bg-ring/20 ${
								activeSection === section.value && "bg-blue-600 hover:bg-blue-700 text-white "
								// 	? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
								// 	: "text-foreground hover:bg-blue-700/10"
							}`}
						>
							{section.icon({
								className: section.classNameIcon,
							})}
							{section.label}
						</Button>
					))}
				</div>
			</div>

			<UserSettingsContent activeSection={activeSection} />
		</div>
	);
}
