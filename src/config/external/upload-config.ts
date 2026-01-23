// export const SUPPORTED_FILE_TYPES = {
// 	CSV: "text/csv",
// 	XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 	XLS: "application/vnd.ms-excel",
// 	JSON: "application/json",
// 	TXT: "text/plain",
// } as const;
//
// export const SUPPORTED_EXTENSIONS = [".csv", ".xlsx", ".xls", ".json", ".txt"] as const;
//
// export type SupportedFileType = (typeof SUPPORTED_FILE_TYPES)[keyof typeof SUPPORTED_FILE_TYPES];
// export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];
//
// export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
// export const MIN_FILE_SIZE = 100 * 1024; // 100KB
//
// /**
//  * Configuration for file types and their extensions.
//  */
// const FILE_TYPE_CONFIGS = [
// 	{ type: SUPPORTED_FILE_TYPES.CSV, extensions: [".csv"] as SupportedExtension[] },
// 	{ type: SUPPORTED_FILE_TYPES.XLSX, extensions: [".xlsx"] as SupportedExtension[] },
// 	{ type: SUPPORTED_FILE_TYPES.XLS, extensions: [".xls"] as SupportedExtension[] },
// 	{ type: SUPPORTED_FILE_TYPES.JSON, extensions: [".json"] as SupportedExtension[] },
// 	{ type: SUPPORTED_FILE_TYPES.TXT, extensions: [".txt"] as SupportedExtension[] },
// ] as const;
//
// /**
//  * Generates a mapping of supported MIME types to their corresponding file extensions using functional programming.
//  */
// export function getAcceptedTypesMap(): Record<SupportedFileType, SupportedExtension[]> {
// 	return FILE_TYPE_CONFIGS.reduce(
// 		(acc, config) => {
// 			acc[config.type] = config.extensions;
// 			return acc;
// 		},
// 		{} as Record<SupportedFileType, SupportedExtension[]>
// 	);
// }
//
// export const ACCEPTED_TYPES_MAP = getAcceptedTypesMap();

import type { FileSizeSuffix } from "next";

export const ONE_KB = 1024;
export const ONE_MB = ONE_KB * 1024;
export const ONE_GB = ONE_MB * 1024;
export const ONE_TB = ONE_GB * 1024;

export type FileSizeStrs = keyof FileSizeSuffix | "bytes";

export const FILE_SIZE_STRS = ["bytes", "KB", "MB", "GB", "TB"] as FileSizeStrs[];
export const FILE_SIZE_VALUES = [1, ONE_KB, ONE_MB, ONE_GB, ONE_TB];

export const humanReadableFileSize = (sizeInBytes: number): string => {
	const i = FILE_SIZE_VALUES.findIndex((_value, index) => {
		return sizeInBytes < FILE_SIZE_VALUES[index + 1] || index === FILE_SIZE_VALUES.length - 1;
	});

	return `${(sizeInBytes / FILE_SIZE_VALUES[i]).toFixed(2)} ${FILE_SIZE_STRS[i].toString()}`;
};

const maxFileSize = ONE_MB * 100; // 100 MB

export const UPLOAD_CONFIG = {
	acceptedFileTypes: [
		"application/pdf",
		"text/plain", // macos parses csv files as text/plain
		"text/csv",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx files
		"application/vnd.ms-excel", // .xls files

		// testing viable options
		"application/json",
	],

	// Human Readable file type labels
	supportedExtensions: [
		//
		".pdf",
		".csv",
		".xlsx",
		".xls",
		".json",
		".txt",
	],

	maxFileSize: maxFileSize,
	maxFileSizeDisplay: `${humanReadableFileSize(maxFileSize)}`,

	allowMultiple: true,
	maxFilesPerUpload: 30,
};
