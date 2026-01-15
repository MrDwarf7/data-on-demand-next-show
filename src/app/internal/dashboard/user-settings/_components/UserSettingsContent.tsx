"use client";

import { useState } from "react";
import { FiBell, FiGlobe, FiMail, FiSave, FiShield, FiUser } from "react-icons/fi";
import { ActionButton } from "@/components/generic/ActionButton";
import { CalloutCard } from "@/components/generic/CalloutCard";
import { FormInput } from "@/components/generic/FormInput";
import { OptionButton } from "@/components/generic/OptionButton";
import { SectionCard } from "@/components/generic/SectionCard";
import { SelectDropdown } from "@/components/generic/SelectDropdown";
import { ToggleSwitch } from "@/components/generic/ToggleSwitch";
import {
	DATE_FORMAT_OPTIONS,
	EMAIL_DIGEST_OPTIONS,
	LANGUAGE_OPTIONS,
	PROFILE_CONFIG,
	TIMEZONE_OPTIONS,
} from "@/config/internal/user-settings-config";

export function UserSettingsContent() {
	const [activeSection, setActiveSection] = useState("profile");
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(false);
	const [weeklyReport, setWeeklyReport] = useState(true);

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

			{activeSection === "notifications" && (
				<div className="space-y-6">
					<SectionCard icon={<FiBell className="w-5 h-5" />} title="Notification Preferences">
						<ToggleSwitch
							label="Email Notifications"
							description="Receive notifications via email"
							checked={emailNotifications}
							onChange={setEmailNotifications}
						/>
						<ToggleSwitch
							label="Push Notifications"
							description="Receive push notifications in browser"
							checked={pushNotifications}
							onChange={setPushNotifications}
						/>
						<ToggleSwitch
							label="Weekly Report"
							description="Receive weekly summary of activities"
							checked={weeklyReport}
							onChange={setWeeklyReport}
						/>
						<CalloutCard
							icon={<FiMail className="w-5 h-5" />}
							title="Email Digest"
							description="Choose how often you want to receive email updates"
						>
							<div className="flex gap-2">
								{EMAIL_DIGEST_OPTIONS.map((option) => (
									<OptionButton key={option}>{option}</OptionButton>
								))}
							</div>
						</CalloutCard>
					</SectionCard>
				</div>
			)}

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
