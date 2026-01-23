"use client";

import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiClock, FiFile } from "react-icons/fi";
import { ErrorMessage } from "@/components/generic/ErrorMessage";
import { FileActions } from "@/components/generic/FileActions";
import type { IconTypeMap } from "@/config/external/statistics-config";
import {
	FILE_TABS,
	type FileTabType,
	type RecentFile,
	STATUS_BADGE_STYLES,
} from "@/config/internal/file-flow-config";
import { useRecentFiles } from "@/hooks/use-file-flow";

/**
 * Get a filter function for files based on selected tab
 */
export const getFileFilter = (selectedTab: string) => (file: RecentFile) => {
	switch (selectedTab) {
		case "recent":
			return true;
		case "processed":
			return file.status === "processed";
		default:
			return file.status === selectedTab;
	}
};

export function FileHistory() {
	const [selectedTab, setSelectedTab] = useState("recent");
	const recentFiles = useRecentFiles();

	const getStatusBadge = (status: FileTabType) => {
		const styles = STATUS_BADGE_STYLES[status];
		return (
			<span
				className={`px-3 py-1 rounded-full text-xs font-medium ${styles.classNameBg} ${styles.classNameColor}`}
			>
				{status.charAt(0).toUpperCase() + status.slice(1)}
			</span>
		);
	};

	const getStatusIcon = (status: FileTabType) => {
		var styles = STATUS_BADGE_STYLES[status];
		const nIcons: IconTypeMap = {
			processed: FiCheckCircle,
			processing: FiClock,
			failed: FiAlertCircle,
			default: FiFile,
		};

		styles.icon = nIcons[status] || nIcons.default;
		return <styles.icon className={`w-4 h-4 ${styles.classNameColor}`} />;
	};

	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-4 sm:p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-semibold text-foreground">File History</h2>
				<div className="flex gap-2">
					{FILE_TABS.map((tab) => (
						<button
							type="button"
							key={tab}
							onClick={() => setSelectedTab(tab)}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
								selectedTab === tab
									? "bg-blue-600 text-white shadow-lg"
									: "bg-accent/50 text-foreground hover:bg-accent"
							}`}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>
			</div>

			<div className="space-y-3">
				{recentFiles.filter(getFileFilter(selectedTab)).map((file) => (
					<div
						key={file.id}
						className="bg-background border border-accent/50 rounded-lg p-4 hover:border-accent transition-all"
					>
						<div className="flex flex-col lg:flex-row lg:items-center gap-4">
							<div className="flex items-start gap-3 flex-1 min-w-0">
								<div className="mt-1">{getStatusIcon(file.status)}</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<FiFile className="w-4 h-4 text-muted-foreground shrink-0" />
										<h3 className="font-semibold text-foreground truncate">{file.name}</h3>
									</div>
									<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
										<span>{file.size}</span>
										<span>•</span>
										<span>{file.id}</span>
										<span>•</span>
										<span>{file.processType}</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										Uploaded by {file.uploadedBy} • {file.uploadedAt}
									</p>
									<ErrorMessage error={file.error} />
								</div>
							</div>

							<div className="flex items-center gap-2">
								{getStatusBadge(file.status)}
								<FileActions
									status={file.status}
									onView={() => console.log("View", file.id)}
									onDownload={() => console.log("Download", file.id)}
									onDelete={() => console.log("Delete", file.id)}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
