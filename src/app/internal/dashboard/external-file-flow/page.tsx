"use client";

import { useState } from "react";
import {
	FiAlertCircle,
	FiCheckCircle,
	FiClock,
	FiDownload,
	FiEye,
	FiFile,
	FiTrash2,
} from "react-icons/fi";
import { MdUploadFile } from "react-icons/md";
import type { IconTypeMap } from "@/config/external/statistics-config";
import {
	FILE_TABS,
	type FileTabType,
	STATUS_BADGE_STYLES,
	UPLOAD_CONFIG,
} from "@/config/internal/file-flow-config";
import { useFileStats, useRecentFiles } from "@/hooks/use-file-flow";

export default function FileFlowPage() {
	const [selectedTab, setSelectedTab] = useState("recent");
	const [dragActive, setDragActive] = useState(false);
	const fileStats = useFileStats();
	const recentFiles = useRecentFiles();

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		console.log("Files dropped:", e.dataTransfer.files);
	};

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
		<div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">External File Flow</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage and monitor external file uploads and processing
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{fileStats.map((stat) => (
					<div
						key={stat.lv.label}
						className={`${stat.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
					>
						<div className={`${stat.classNameColor} mb-3`}>
							{stat.icon && <stat.icon className="w-8 h-8" />}
						</div>
						<p className="text-sm font-medium text-muted-foreground mb-1">{stat.lv.label}</p>
						<p className={`text-3xl font-bold ${stat.classNameColor}`}>{stat.lv.value}</p>
					</div>
				))}
			</div>

			<div
				className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 transition-all ${
					dragActive ? "border-blue-500 bg-blue-500/10" : "border-accent/50 bg-accent/20"
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
			>
				<div className="text-center">
					<div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
						<MdUploadFile className="w-8 h-8" />
					</div>
					<h3 className="text-lg font-semibold text-foreground mb-2">{UPLOAD_CONFIG.uploadText}</h3>
					<p className="text-sm text-muted-foreground mb-4">{UPLOAD_CONFIG.dragDropText}</p>
					<button
						type="button"
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
					>
						{UPLOAD_CONFIG.buttonText}
					</button>
					<p className="text-xs text-muted-foreground mt-4">
						Supported: {UPLOAD_CONFIG.supportedFormats} • Max size: {UPLOAD_CONFIG.maxSize}
					</p>
				</div>
			</div>

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
					{recentFiles
						.filter(
							(file) =>
								selectedTab === "recent" ||
								file.status === selectedTab ||
								(selectedTab === "processed" && file.status === "processed")
						)
						.map((file) => (
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
											{file.error && (
												<p className="text-xs text-red-600 mt-1">Error: {file.error}</p>
											)}
										</div>
									</div>

									<div className="flex items-center gap-2">
										{getStatusBadge(file.status)}
										<div className="flex gap-1">
											<button
												type="button"
												className="p-2 hover:bg-accent rounded-lg transition-colors"
											>
												<FiEye className="w-4 h-4 text-muted-foreground" />
											</button>
											{file.status === "processed" && (
												<button
													type="button"
													className="p-2 hover:bg-accent rounded-lg transition-colors"
												>
													<FiDownload className="w-4 h-4 text-muted-foreground" />
												</button>
											)}
											<button
												type="button"
												className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
											>
												<FiTrash2 className="w-4 h-4 text-red-600" />
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
