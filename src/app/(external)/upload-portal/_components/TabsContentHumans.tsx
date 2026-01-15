"use client";

import { useRef, useState } from "react";
import { FiCheckCircle, FiUploadCloud, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { useFileUpload } from "@/hooks/use-file-upload";
import type { UploadPortalTabs } from "@/types/local";

const TabsContentHumans = ({ ...props }: Partial<UploadPortalTabs>) => {
	const { singleKey: keyValue } = props;
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	// TODO: [backend] : We need to produce server-side logs when this happens, as well as during the upload process too
	// NOTE: Possible to use server actions for the upload process here?
	// NOTE: Possible to use service workers for the upload process here?
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
		<TabsContent value={keyValue as string} className="mt-6">
			<div className="mb-8">
				<div
					className={`
						relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
						transition-all duration-300 ease-in-out
						border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600
						hover:bg-accent/10
						${dragActive ? "border-blue-500 bg-blue-500/10" : ""}
					`}
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
						accept=".pdf,.doc,.docx,.xls,.xlsx" // TODO: [backend] : Move these 'viable' file types to a config file (hook really, so we can fetch from a DB table later)
					/>
					{/* Form for humans to upload data - server action can be added here */}
					<FiUploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold text-foreground mb-2">Drag & drop files here</h3>
					<p className="text-muted-foreground mb-4">or click to browse from your computer</p>
					<p className="text-sm text-muted-foreground">
						Supported formats: PDF, DOC, DOCX, XLS, XLSX
					</p>
				</div>
			</div>

			{files.length > 0 && (
				<div className="mb-8 bg-accent/20 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-semibold text-foreground">Selected Files</h4>
						<Button
							onClick={handleUpload} // See TODO at top of file regarding logging
							disabled={isUploading}
							className="bg-green-600 hover:bg-green-700" // TODO: We should be using the semantic color tokens we set up here
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
		</TabsContent>
	);
};

export { TabsContentHumans };
