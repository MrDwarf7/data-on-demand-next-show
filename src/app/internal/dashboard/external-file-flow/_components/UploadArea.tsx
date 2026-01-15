"use client";

import { useState } from "react";
import { MdUploadFile } from "react-icons/md";
import { UPLOAD_CONFIG } from "@/config/internal/file-flow-config";

export function UploadArea() {
	const [dragActive, setDragActive] = useState(false);

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

	return (
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
	);
}
