"use client";

import { useState } from "react";
import { FiGlobe, FiSave, FiShield, FiUser } from "react-icons/fi";
import { ActionButton } from "@/components/generic/ActionButton";
import { FormInput } from "@/components/generic/FormInput";
import { SectionCard } from "@/components/generic/SectionCard";
import { SelectDropdown } from "@/components/generic/SelectDropdown";
import {
	DATE_FORMAT_OPTIONS,
	LANGUAGE_OPTIONS,
	PROFILE_CONFIG,
	type SETTINGS_SECTIONS,
	TIMEZONE_OPTIONS,
} from "@/config/internal/user-settings-config";
import { NotificationsSection } from "./NotificationsSection";

type Section = (typeof SETTINGS_SECTIONS)[number]["id"];

export function UserSettingsContent() {
	const [activeSection, setActiveSection] = useState<Section>("profile");

	return (
		<div className="lg:col-span-3">
			{activeSection === "profile" && (
				<div className="space-y-6">
					<SectionCard icon={<FiUser className="w-5 h-5" />} title="Profile Information">
						<div className="flex items-center gap-6">
							<div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
								JD
							</div>
							<div>
								<button
									type="button"
									className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all text-sm"
								>
									Change Avatar
								</button>
								<p className="text-xs text-muted-foreground mt-2">
									{PROFILE_CONFIG.avatarFormats}. Max size {PROFILE_CONFIG.avatarMaxSize}.
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FormInput label="First Name" defaultValue="John" />
							<FormInput label="Last Name" defaultValue="Doe" />
						</div>

						<FormInput label="Email Address" type="email" defaultValue="john.doe@company.com" />
						<FormInput label="Job Title" defaultValue="Automation Specialist" />
						<FormInput
							label="Bio"
							type="textarea"
							rows={PROFILE_CONFIG.bioRows}
							defaultValue="Passionate about automation and efficiency."
						/>
					</SectionCard>

					<div className="flex justify-end">
						<ActionButton icon={<FiSave className="w-4 h-4" />}>Save Changes</ActionButton>
					</div>
				</div>
			)}

			{activeSection === "notifications" && <NotificationsSection />}

			{activeSection === "security" && (
				<div className="space-y-6">
					<SectionCard icon={<FiShield className="w-5 h-5" />} title="Security Settings">
						<FormInput
							label="Current Password"
							type="password"
							placeholder="Enter current password"
						/>
						<FormInput label="New Password" type="password" placeholder="Enter new password" />
						<FormInput
							label="Confirm New Password"
							type="password"
							placeholder="Confirm new password"
						/>
						<ActionButton>Update Password</ActionButton>
						<div className="pt-6 border-t border-accent/50">
							<h3 className="font-medium text-foreground mb-4">Two-Factor Authentication</h3>
							<p className="text-sm text-muted-foreground mb-4">
								Add an extra layer of security to your account
							</p>
							<ActionButton variant="secondary">Enable 2FA</ActionButton>
						</div>
					</SectionCard>
				</div>
			)}

			{activeSection === "preferences" && (
				<div className="space-y-6">
					<SectionCard icon={<FiGlobe className="w-5 h-5" />} title="General Preferences">
						<SelectDropdown label="Language" options={LANGUAGE_OPTIONS} />
						<SelectDropdown label="Timezone" options={TIMEZONE_OPTIONS} />
						<SelectDropdown label="Date Format" options={DATE_FORMAT_OPTIONS} />
					</SectionCard>

					<div className="flex justify-end">
						<ActionButton icon={<FiSave className="w-4 h-4" />}>Save Preferences</ActionButton>
					</div>
				</div>
			)}
		</div>
	);
}
