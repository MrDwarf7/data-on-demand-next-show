"use client";

import { useSearchParams } from "next/navigation";
import { useActionState, useRef } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { FiAlertCircle, FiUploadCloud, FiX } from "react-icons/fi";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import {
	ACCEPTED_TYPES_MAP,
	MAX_FILE_SIZE,
	SUPPORTED_EXTENSIONS,
} from "@/config/external/upload-config";
import { uploadFiles } from "../actions";

interface FileWithStatus {
	file: File;
	isRejected: boolean;
	errors: string[];
}

interface TabsContentHumansProps {
	selectedFiles: FileWithStatus[];
	onFilesChange: (files: FileWithStatus[]) => void;
}

const TabsContentHumans = ({ selectedFiles, onFilesChange }: TabsContentHumansProps) => {
	const searchParams = useSearchParams();
	const selectedProcess = searchParams.get("process");
	const hasProcessSelected = !!selectedProcess;

	const [state, formAction, isPending] = useActionState(uploadFiles, {
		success: false,
		uploadedFiles: [],
		error: null,
	});

	// Extract valid files for form submission
	// const formFiles = selectedFiles.filter((f) => !f.isRejected).map((f) => f.file);

	const inputRef = useRef<HTMLInputElement>(null);

	const dropZoneProps = {
		accept: ACCEPTED_TYPES_MAP,
		maxSize: MAX_FILE_SIZE,
		multiple: true,
		// there's also an 'event' param here if needed
		onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			// Combine accepted and rejected files and sync with parent state
			const allFiles: FileWithStatus[] = [
				...acceptedFiles.map((file) => ({ file, isRejected: false, errors: [] })), // where files are accepted
				...rejectedFiles.map((rejection) => ({
					file: rejection.file,
					isRejected: true,
					errors: rejection.errors.map((err) => err.message),
				})),
			];
			onFilesChange(allFiles);

			// Set the input's files for form submission
			if (inputRef.current) {
				const dt = new DataTransfer();
				for (const file of acceptedFiles) {
					dt.items.add(file);
				}
				inputRef.current.files = dt.files;
			}
		},
	};

	const { isDragActive, getInputProps, getRootProps } = useDropzone(dropZoneProps);

	const inputProps = getInputProps();

	const removeFile = (indexToRemove: number) => {
		onFilesChange(selectedFiles.filter((_, index) => index !== indexToRemove));
	};

	const hasRejectedFiles = selectedFiles.some((f) => f.isRejected);
	const validFilesForDisplay = selectedFiles.filter((f) => !f.isRejected);

	return (
		<TabsContent value="humans" className="mt-6">
			{!hasProcessSelected && validFilesForDisplay.length > 0 && (
				<div className="mb-2 p-2 rounded-md flex items-center gap-2">
					<FiAlertCircle className="h-4 w-4 text-destructive" />
					<p className="text-xs text-destructive">
						Please select a process before uploading files.
					</p>
				</div>
			)}

			<div className="mb-8">
				<form action={formAction}>
					<input type="hidden" name="process" value={selectedProcess || ""} />
					<div
						{...getRootProps()}
						onClick={() => inputRef.current?.click()}
						className={`
							relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
							transition-all duration-300 ease-in-out
							border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600
							hover:bg-accent/10
							${isDragActive ? "border-blue-500 bg-blue-500/10" : ""}
						`}
					>
						<input {...inputProps} name="files" ref={inputRef} />
						<FiUploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
						<h3 className="text-xl font-semibold text-foreground mb-2">
							{isDragActive ? "Drop files here..." : "Drag & drop files here"}
						</h3>
						<p className="text-muted-foreground mb-4">or click to browse from your computer</p>
						<p className="text-sm text-muted-foreground">
							Supported formats: {SUPPORTED_EXTENSIONS.join(", ")}
						</p>
					</div>

					{selectedFiles.length > 0 && (
						<div className="mt-6 bg-accent/20 border border-accent/50 rounded-xl p-6">
							<div className="flex items-center justify-between mb-4">
								<h4 className="text-lg font-semibold text-foreground">
									{state.success ? "Uploaded Files" : "Selected Files"}
								</h4>
								{!state.success && (
									<button
										type="submit"
										disabled={isPending || !hasProcessSelected || hasRejectedFiles}
										className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md disabled:opacity-50"
									>
										{
											// TODO: [cleanup] Clean up this double-nested ternary later
											isPending
												? "Uploading..."
												: hasRejectedFiles
													? "Remove Invalid Files"
													: "Upload Files"
										}
									</button>
								)}
							</div>

							{isPending && (
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium">Uploading files...</span>
									</div>
									<Progress value={undefined} className="w-full" />
									<p className="text-xs text-muted-foreground mt-2">
										Please wait while we process your files
									</p>
								</div>
							)}

							{state.error && (
								<div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
									<p className="text-sm text-destructive">{state.error}</p>
								</div>
							)}

							{state.success && (
								<div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
									<p className="text-sm text-green-700 dark:text-green-400">
										Files uploaded successfully!
									</p>
								</div>
							)}

							<div className="space-y-3 max-h-96 overflow-y-auto">
								{state.success
									? state.uploadedFiles.map((file) => (
											<div
												key={file.id}
												className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-accent/30"
											>
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-foreground truncate">
														{file.name}
													</p>
													<p className="text-xs text-muted-foreground">{file.status}</p>
												</div>
											</div>
										))
									: selectedFiles.map((fileWithStatus, index) => (
											<div
												key={`${fileWithStatus.file.name}-${fileWithStatus.file.size}-${index}`}
												className={`flex items-center gap-3 p-3 bg-background/50 rounded-lg border ${
													fileWithStatus.isRejected
														? "border-destructive/50 bg-destructive/5"
														: "border-accent/30"
												}`}
											>
												<div className="flex-1 min-w-0">
													<p
														className={`text-sm font-medium truncate ${
															fileWithStatus.isRejected ? "text-destructive" : "text-foreground"
														}`}
													>
														{fileWithStatus.file.name}
														{fileWithStatus.isRejected && " (Invalid)"}
													</p>
													<p className="text-xs text-muted-foreground">
														{(fileWithStatus.file.size / 1024 / 1024).toFixed(2)} MB
														{fileWithStatus.isRejected && ` - ${fileWithStatus.errors.join(", ")}`}
													</p>
												</div>
												<button
													type="button"
													onClick={() => removeFile(index)}
													className="shrink-0 p-1 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
													title="Remove file"
												>
													<FiX className="w-4 h-4" />
												</button>
											</div>
										))}
							</div>
						</div>
					)}
				</form>
			</div>
		</TabsContent>
	);
};

export { TabsContentHumans };
