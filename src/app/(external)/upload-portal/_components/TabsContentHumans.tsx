"use client";

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { FiAlertCircle, FiCheckCircle, FiUploadCloud, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import {
	ACCEPTED_TYPES_MAP,
	MAX_FILE_SIZE,
	SUPPORTED_EXTENSIONS,
} from "@/config/external/upload-config";
import { useFileUpload } from "@/hooks/upload";
import type { FileUploadItem } from "@/hooks/upload/types";

// import type { FileUploadItem } from "@/hooks/upload/types";
// import type { UploadPortalTabs } from "@/types/local";

// type TabsContentHumansProps = Partial<UploadPortalTabs> & {
// 	files: FileUploadItem[];
// 	// isUploading: boolean;
// 	// overallProgress: number;
// 	// handleFiles: (files: FileList | File[]) => void;
// 	// handleRemoveFile: (id: string) => void;
// 	// handleUpload: () => Promise<void>;
// 	// hasProcessSelected: boolean;
// };

interface FileItemStatusProps {
	fileItem: FileUploadItem;
	handleRemoveFile: (id: string) => void;
	isUploading: boolean;
}

const FileItemStatus = ({
	fileItem,
	handleRemoveFile,
	isUploading,
}: FileItemStatusProps): React.JSX.Element => {
	switch (fileItem.status) {
		case "error": {
			return (
				<>
					<p className="text-xs text-destructive">
						{fileItem.error}
						<span className="ml-1">
							<FiAlertCircle className="inline w-3 h-3 mr-1" />
						</span>
					</p>

					<Button
						variant="ghost"
						size="sm"
						onClick={() => handleRemoveFile(fileItem.id)}
						disabled={isUploading}
						className="p-1 h-8 w-8"
					>
						<FiX className="w-4 h-4" />
					</Button>
				</>
			);
		}
		case "uploading": {
			return (
				<div className="w-20">
					<Progress value={fileItem.progress} className="h-2" />
				</div>
			);
		}
		case "completed": {
			return (
				<div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
					<FiCheckCircle className="w-3 h-3 text-white" />
				</div>
			);
		}
		case "pending": {
			return <p className="text-xs text-muted-foreground">Pending upload</p>;
		}
	}
};

// TODO: See other [...] todo items regarding further refactoring
// TODO: [tabs_content] :
// TODO: [process_picker] :

const TabsContentHumans = () => {
	const searchParams = useSearchParams();
	const hasProcessSelected = !!searchParams.get("process");
	const {
		files,
		isUploading,
		overallProgress,
		handleFiles,
		handleRemoveFile,
		handleUpload,
		reset,
	} = useFileUpload();

	const fileInputRef = useRef<HTMLInputElement>(null);
	// Server-side logging has been implemented in the uploadFiles server action
	// NOTE: Possible to use server actions for the upload process here?
	// NOTE: Possible to use service workers for the upload process here?

	const uploadCompleted =
		files.length > 0 && files.every((f) => f.status === "completed" || f.status === "error");

	const { /* getRootProps,*/ getInputProps, isDragActive } = useDropzone({
		onDrop: handleFiles, // This is our POST. hook -> hook handles calling /api/uploads
		accept: ACCEPTED_TYPES_MAP,
		maxSize: MAX_FILE_SIZE,
		multiple: true,
	});

	const openFileDialog = () => {
		fileInputRef.current?.click();
	};

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
									<div className="space-y-1">
										<p className="text-sm font-medium text-foreground truncate">
											{fileItem.newName}
										</p>
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
								/>

								{/* {!uploadCompleted && ( */}
								{/* 	<Button */}
								{/* 		variant="ghost" */}
								{/* 		size="sm" */}
								{/* 		onClick={() => handleRemoveFile(fileItem.id)} */}
								{/* 		disabled={isUploading} */}
								{/* 		className="p-1 h-8 w-8" */}
								{/* 	> */}
								{/* 		<FiX className="w-4 h-4" /> */}
								{/* 	</Button> */}
								{/* )} */}
							</div>
						))}
					</div>
				</div>
			)}
		</TabsContent>
	);
};

export { TabsContentHumans };
