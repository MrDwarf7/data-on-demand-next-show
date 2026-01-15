"use client";

import { useRef, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { MdUploadFile } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UPLOAD_CONFIG } from "@/config/internal/file-flow-config";
import { useFileUpload } from "@/hooks/use-file-upload";

export function UploadArea() {
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const { files, isUploading, overallProgress, handleFiles, handleRemoveFile, handleUpload } =
		useFileUpload();

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
		handleFiles(e.dataTransfer.files);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			handleFiles(e.target.files);
		}
	};

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="space-y-6">
			<div
				className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 transition-all ${
					dragActive ? "border-blue-500 bg-blue-500/10" : "border-accent/50 bg-accent/20"
				}`}
				onDragEnter={handleDrag}
				onDragLeave={handleDrag}
				onDragOver={handleDrag}
				onDrop={handleDrop}
				onClick={openFileDialog}
			>
				<input
					ref={fileInputRef}
					type="file"
					multiple
					className="hidden"
					onChange={handleFileSelect}
					accept={UPLOAD_CONFIG.supportedFormats}
				/>
				<div className="text-center">
					<div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
						<MdUploadFile className="w-8 h-8" />
					</div>
					<h3 className="text-lg font-semibold text-foreground mb-2">{UPLOAD_CONFIG.uploadText}</h3>
					<p className="text-sm text-muted-foreground mb-4">{UPLOAD_CONFIG.dragDropText}</p>
					<Button
						type="button"
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
					>
						{UPLOAD_CONFIG.buttonText}
					</Button>
					<p className="text-xs text-muted-foreground mt-4">
						Supported: {UPLOAD_CONFIG.supportedFormats} • Max size: {UPLOAD_CONFIG.maxSize}
					</p>
				</div>
			</div>

			{files.length > 0 && (
				<div className="bg-accent/20 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-semibold text-foreground">Selected Files</h4>
						<Button
							onClick={handleUpload}
							disabled={isUploading}
							className="bg-green-600 hover:bg-green-700"
						>
							{isUploading ? "Uploading..." : "Upload Files"}
						</Button>
					</div>

					{isUploading && (
						<div className="mb-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium">Overall Progress</span>
								<span className="text-sm text-muted-foreground">{overallProgress}%</span>
							</div>
							<Progress value={overallProgress} className="w-full" />
						</div>
					)}

					<div className="space-y-3 max-h-96 overflow-y-auto">
						{files.map((fileItem) => (
							<div
								key={fileItem.id}
								className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-accent/30"
							>
								<div className="flex-1 min-w-0">
									<p className="text-sm font-medium text-foreground truncate">
										{fileItem.file.name}
									</p>
									<p className="text-xs text-muted-foreground">
										{(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
									</p>
								</div>

								{fileItem.status === "error" && (
									<p className="text-xs text-red-600">{fileItem.error}</p>
								)}

								{fileItem.status === "uploading" && (
									<div className="w-20">
										<Progress value={fileItem.progress} className="h-2" />
									</div>
								)}

								{fileItem.status === "completed" && (
									<div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
										<FiCheckCircle className="w-3 h-3 text-white" />
									</div>
								)}

								<Button
									variant="ghost"
									size="sm"
									onClick={() => handleRemoveFile(fileItem.id)}
									disabled={isUploading}
									className="p-1 h-8 w-8"
								>
									<FiX className="w-4 h-4" />
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
