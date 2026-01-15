"use client";

import { FiDownload, FiEye, FiTrash2 } from "react-icons/fi";
import type { FileTabType } from "@/config/internal/file-flow-config";

interface FileActionsProps {
	status: FileTabType;
	onView: () => void;
	onDownload: () => void;
	onDelete: () => void;
}

export function FileActions({ status, onView, onDownload, onDelete }: FileActionsProps) {
	return (
		<div className="flex gap-1">
			<button
				type="button"
				className="p-2 hover:bg-accent rounded-lg transition-colors"
				onClick={onView}
			>
				<FiEye className="w-4 h-4 text-muted-foreground" />
			</button>
			{status === "processed" && (
				<button
					type="button"
					className="p-2 hover:bg-accent rounded-lg transition-colors"
					onClick={onDownload}
				>
					<FiDownload className="w-4 h-4 text-muted-foreground" />
				</button>
			)}
			<button
				type="button"
				className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
				onClick={onDelete}
			>
				<FiTrash2 className="w-4 h-4 text-red-600" />
			</button>
		</div>
	);
}
