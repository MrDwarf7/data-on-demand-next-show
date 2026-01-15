"use client";

import { useState } from "react";
import { FiBell, FiGlobe, FiMail, FiSave, FiShield, FiUser } from "react-icons/fi";
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
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
						<h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
							<FiUser className="w-5 h-5" />
							Profile Information
						</h2>

						<div className="space-y-6">
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
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">
										First Name
									</label>
									<input
										type="text"
										defaultValue="John"
										className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">
										Last Name
									</label>
									<input
										type="text"
										defaultValue="Doe"
										className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Email Address
								</label>
								<input
									type="email"
									defaultValue="john.doe@company.com"
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Job Title</label>
								<input
									type="text"
									defaultValue="Automation Specialist"
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Bio</label>
								<textarea
									rows={PROFILE_CONFIG.bioRows}
									defaultValue="Passionate about automation and efficiency."
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground resize-none"
								/>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
						>
							<FiSave className="w-4 h-4" />
							Save Changes
						</button>
					</div>
				</div>
			)}

			{activeSection === "notifications" && (
				<div className="space-y-6">
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
						<h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
							<FiBell className="w-5 h-5" />
							Notification Preferences
						</h2>

						<div className="space-y-6">
							<div className="flex items-center justify-between pb-4 border-b border-accent/50">
								<div>
									<h3 className="font-medium text-foreground">Email Notifications</h3>
									<p className="text-sm text-muted-foreground mt-1">
										Receive notifications via email
									</p>
								</div>
								<button
									type="button"
									onClick={() => setEmailNotifications(!emailNotifications)}
									className={`relative w-14 h-7 rounded-full transition-colors ${
										emailNotifications ? "bg-blue-600" : "bg-accent"
									}`}
								>
									<div
										className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
											emailNotifications ? "translate-x-7" : ""
										}`}
									/>
								</button>
							</div>

							<div className="flex items-center justify-between pb-4 border-b border-accent/50">
								<div>
									<h3 className="font-medium text-foreground">Push Notifications</h3>
									<p className="text-sm text-muted-foreground mt-1">
										Receive push notifications in browser
									</p>
								</div>
								<button
									type="button"
									onClick={() => setPushNotifications(!pushNotifications)}
									className={`relative w-14 h-7 rounded-full transition-colors ${
										pushNotifications ? "bg-blue-600" : "bg-accent"
									}`}
								>
									<div
										className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
											pushNotifications ? "translate-x-7" : ""
										}`}
									/>
								</button>
							</div>

							<div className="flex items-center justify-between pb-4 border-b border-accent/50">
								<div>
									<h3 className="font-medium text-foreground">Weekly Report</h3>
									<p className="text-sm text-muted-foreground mt-1">
										Receive weekly summary of activities
									</p>
								</div>
								<button
									type="button"
									onClick={() => setWeeklyReport(!weeklyReport)}
									className={`relative w-14 h-7 rounded-full transition-colors ${
										weeklyReport ? "bg-blue-600" : "bg-accent"
									}`}
								>
									<div
										className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
											weeklyReport ? "translate-x-7" : ""
										}`}
									/>
								</button>
							</div>

							<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
								<div className="flex items-start gap-3">
									<FiMail className="w-5 h-5 text-blue-600 mt-0.5" />
									<div>
										<h4 className="font-medium text-foreground mb-1">Email Digest</h4>
										<p className="text-sm text-muted-foreground">
											Choose how often you want to receive email updates
										</p>
										<div className="flex gap-2 mt-3">
											{EMAIL_DIGEST_OPTIONS.map((option) => (
												<button
													type="button"
													key={option}
													className="px-3 py-1.5 bg-background hover:bg-accent border border-accent/50 rounded-lg text-sm font-medium transition-all"
												>
													{option}
												</button>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			{activeSection === "security" && (
				<div className="space-y-6">
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
						<h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
							<FiShield className="w-5 h-5" />
							Security Settings
						</h2>

						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Current Password
								</label>
								<input
									type="password"
									placeholder="Enter current password"
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									New Password
								</label>
								<input
									type="password"
									placeholder="Enter new password"
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Confirm New Password
								</label>
								<input
									type="password"
									placeholder="Confirm new password"
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
								/>
							</div>

							<button
								type="button"
								className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
							>
								Update Password
							</button>

							<div className="pt-6 border-t border-accent/50">
								<h3 className="font-medium text-foreground mb-4">Two-Factor Authentication</h3>
								<p className="text-sm text-muted-foreground mb-4">
									Add an extra layer of security to your account
								</p>
								<button
									type="button"
									className="px-6 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-lg font-medium transition-all"
								>
									Enable 2FA
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{activeSection === "preferences" && (
				<div className="space-y-6">
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
						<h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
							<FiGlobe className="w-5 h-5" />
							General Preferences
						</h2>

						<div className="space-y-6">
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Language</label>
								<select className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground">
									{LANGUAGE_OPTIONS.map((lang) => (
										<option key={lang.value} value={lang.value}>
											{lang.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
								<select className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground">
									{TIMEZONE_OPTIONS.map((tz) => (
										<option key={tz.value} value={tz.value}>
											{tz.label}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">
									Date Format
								</label>
								<select className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground">
									{DATE_FORMAT_OPTIONS.map((fmt) => (
										<option key={fmt.value} value={fmt.value}>
											{fmt.label}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
						>
							<FiSave className="w-4 h-4" />
							Save Preferences
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
