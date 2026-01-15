"use client";

import { useState } from "react";
import { FiBell, FiMail } from "react-icons/fi";
import { CalloutCard } from "@/components/generic/CalloutCard";
import { OptionButton } from "@/components/generic/OptionButton";
import { SectionCard } from "@/components/generic/SectionCard";
import { ToggleSwitch } from "@/components/generic/ToggleSwitch";
import { EMAIL_DIGEST_OPTIONS } from "@/config/internal/user-settings-config";

export function NotificationsSection() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(false);
	const [weeklyReport, setWeeklyReport] = useState(true);

	return (
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
	);
}
