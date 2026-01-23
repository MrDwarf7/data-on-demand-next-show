import { useCallback } from "react";
import type { FileRejection } from "react-dropzone";

export interface FileWithStatus {
	file: File;
	isRejected: boolean;
	errors: string[];
}

export interface DropzoneCallbackParams {
	setLocalFiles: React.Dispatch<React.SetStateAction<FileWithStatus[]>>;
	inputRef: React.RefObject<HTMLInputElement | null>;
}

export interface DropzoneCallbacks {
	onDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
	onDropRejected: (rejectedFiles: FileRejection[]) => void;
	acceptedFileTypeReduction: (acceptedFileTypes: string[]) => Record<string, string[]>;
}

/**
 * Handles bundling a handful of callbacks required to set up a dropzone using react-dropzone.
 * Much cleaner than having these defined inline in the component using the dropzone.
 */
export const useDropzoneCallbacks = ({
	setLocalFiles,
	inputRef,
}: DropzoneCallbackParams): DropzoneCallbacks => {
	const acceptedFileTypeReduction = useCallback((acceptedFileTypes: string[]) => {
		return acceptedFileTypes.reduce(
			(acc, type) => {
				acc[type] = [];
				return acc;
			},
			{} as Record<string, string[]>
		);
	}, []);

	// there's also an 'event' param here if needed
	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			// Combine accepted and rejected files and sync with parent state
			const allFiles: FileWithStatus[] = [
				...acceptedFiles.map((file) => ({ file, isRejected: false, errors: [] })), // where files are accepted
				...rejectedFiles.map((rejection) => ({
					file: rejection.file,
					isRejected: true,
					errors: rejection.errors.map((err) => err.message),
				})),
			];
			setLocalFiles(allFiles);

			// Set the input's files for form submission
			if (inputRef.current) {
				const dt = new DataTransfer();
				for (const file of acceptedFiles) {
					dt.items.add(file);
				}
				inputRef.current.files = dt.files;
			}
		},
		[inputRef?.current, setLocalFiles]
	);

	const onDropRejected = useCallback((_rejectedFiles: FileRejection[]) => {
		//
	}, []);

	return {
		onDrop,
		onDropRejected,
		acceptedFileTypeReduction,
	};
};
