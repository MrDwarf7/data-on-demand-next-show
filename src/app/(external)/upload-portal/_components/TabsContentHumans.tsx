"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FiAlertCircle, FiUploadCloud } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import {
	ACCEPTED_TYPES_MAP,
	MAX_FILE_SIZE,
	SUPPORTED_EXTENSIONS,
} from "@/config/external/upload-config";
import { useFileUpload } from "@/hooks/upload";
import { useUploadStore } from "@/store/store";
import { FileItemStatus } from "./FileItemStatus";

const OverallProgressIndicator = React.memo(
	({ overallProgress, isUploading }: { overallProgress: number; isUploading: boolean }) => {
		if (!isUploading) return null;

		return (
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<span className="text-sm font-medium">Overall Progress</span>
					<span className="text-sm text-muted-foreground">{overallProgress}%</span>
				</div>
				<Progress value={overallProgress} className="w-full" />
			</div>
		);
	}
);

// TODO: See other [...] todo items regarding further refactoring
// TODO: [tabs_content] :
// TODO: [process_picker] :

const TabsContentHumans = () => {
	console.log("Rendering TabsContentHumans"); // PERF: Still re-rendering on each progress tick... Hmmmm
	const { selectedProcess } = useUploadStore();
	const hasProcessSelected = !!selectedProcess;
	const {
		files,
		isUploading,
		overallProgress,
		progressMap,
		handleFiles,
		handleRemoveFile,
		handleUpload,
		// reset, // use later if actually need it
	} = useFileUpload();

	const fileInputRef = useRef<HTMLInputElement>(null);
	// Server-side logging has been implemented in the uploadFiles server action
	// NOTE: Possible to use server actions for the upload process here?
	// NOTE: Possible to use service workers for the upload process here?

	const uploadCompleted =
		files.length > 0 && files.every((f) => f.status === "completed" || f.status === "error");

	const fileItems = useMemo(
		() =>
			files.map((fileItem) => (
				<div
					key={fileItem.id}
					className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-accent/30"
				>
					<div className="flex-1 min-w-0">
						<div className="space-y-1">
							<p className="text-sm font-medium text-foreground truncate">{fileItem.newName}</p>
							<p className="text-xs text-muted-foreground truncate opacity-75">
								{fileItem.file.name}
							</p>
						</div>
						<p className="text-xs text-muted-foreground">
							{(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
						</p>
					</div>

					<FileItemStatus
						fileItem={fileItem}
						handleRemoveFile={handleRemoveFile}
						isUploading={isUploading}
						progressMap={progressMap}
					/>
				</div>
			)),
		[files, handleRemoveFile, isUploading, progressMap]
	);

	const dropZoneProps = {
		onDrop: handleFiles, // This is our POST. hook -> hook handles calling /api/uploads
		accept: ACCEPTED_TYPES_MAP,
		maxSize: MAX_FILE_SIZE,
		multiple: true,
	};

	const { /* getRootProps,*/ getInputProps, isDragActive } = useDropzone(dropZoneProps);

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (isUploading) {
				event.preventDefault();
				event.returnValue = "Upload is in progress. Are you sure you want to leave?";
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isUploading]);

	return (
		<TabsContent value="humans" className="mt-6">
			{!hasProcessSelected && files.length > 0 && (
				<div className="mb-2 p-2 rounded-md flex items-center gap-2">
					<FiAlertCircle className="h-4 w-4 text-destructive" />
					<p className="text-xs text-destructive">
						Please select a process before uploading files.
					</p>
				</div>
			)}

			<div className="mb-8">
				<div
					className={`
						relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
						transition-all duration-300 ease-in-out
						border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600
						hover:bg-accent/10
						${isDragActive ? "border-blue-500 bg-blue-500/10" : ""}
					`}
					onClick={openFileDialog}
				>
					<input {...getInputProps()} ref={fileInputRef} />
					{/* Form for humans to upload data - server action can be added here */}
					<FiUploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold text-foreground mb-2">
						{isDragActive ? "Drop files here..." : "Drag & drop files here"}
					</h3>
					<p className="text-muted-foreground mb-4">or click to browse from your computer</p>
					<p className="text-sm text-muted-foreground">
						Supported formats: {SUPPORTED_EXTENSIONS.join(", ")}
					</p>
				</div>
			</div>

			{/* Don't allow the upload button unless there's atleast 1 file */}
			{files.length > 0 && (
				<div className="mb-8 bg-accent/20 border border-accent/50 rounded-xl p-6">
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-lg font-semibold text-foreground">
							{uploadCompleted ? "Uploaded Files" : "Selected Files"}
						</h4>
						{!uploadCompleted && (
							<Button
								onClick={handleUpload} // Server-side logging implemented
								disabled={isUploading || !hasProcessSelected}
								className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400" // TODO: We should be using the semantic color tokens we set up here
							>
								{isUploading ? "Uploading..." : "Upload Files"}
							</Button>
						)}
					</div>

					<OverallProgressIndicator overallProgress={overallProgress} isUploading={isUploading} />

					<div className="space-y-3 max-h-96 overflow-y-auto">{fileItems}</div>
				</div>
			)}
		</TabsContent>
	);
};

export { TabsContentHumans };
