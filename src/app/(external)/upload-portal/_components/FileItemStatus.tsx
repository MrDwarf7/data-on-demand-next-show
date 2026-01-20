import React from "react";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FileUploadItem } from "@/hooks/upload/types";

interface FileItemStatusProps {
	fileItem: FileUploadItem;
	handleRemoveFile: (id: string) => void;
	isUploading: boolean;
	progressMap: Map<string, number>;
}

export const FileItemStatus = React.memo(
	({
		fileItem,
		handleRemoveFile,
		isUploading,
		progressMap,
	}: FileItemStatusProps): React.JSX.Element => {
		const progress = progressMap.get(fileItem.id) || fileItem.progress;
		// Prefer progress bar when progress is active (0 < progress < 100)
		if (progress > 0 && progress < 100) {
			return (
				<div className="w-20">
					<Progress value={progress} className="h-2" />
				</div>
			);
		}

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
	}
);
