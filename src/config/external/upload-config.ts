export const SUPPORTED_FILE_TYPES = {
	CSV: "text/csv",
	XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	XLS: "application/vnd.ms-excel",
	JSON: "application/json",
	TXT: "text/plain",
} as const;

export const SUPPORTED_EXTENSIONS = [".csv", ".xlsx", ".xls", ".json", ".txt"] as const;

export type SupportedFileType = (typeof SUPPORTED_FILE_TYPES)[keyof typeof SUPPORTED_FILE_TYPES];
export type SupportedExtension = (typeof SUPPORTED_EXTENSIONS)[number];

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const MIN_FILE_SIZE = 100 * 1024; // 100KB

/**
 * Configuration for file types and their extensions.
 */
const FILE_TYPE_CONFIGS = [
	{ type: SUPPORTED_FILE_TYPES.CSV, extensions: [".csv"] as SupportedExtension[] },
	{ type: SUPPORTED_FILE_TYPES.XLSX, extensions: [".xlsx"] as SupportedExtension[] },
	{ type: SUPPORTED_FILE_TYPES.XLS, extensions: [".xls"] as SupportedExtension[] },
	{ type: SUPPORTED_FILE_TYPES.JSON, extensions: [".json"] as SupportedExtension[] },
	{ type: SUPPORTED_FILE_TYPES.TXT, extensions: [".txt"] as SupportedExtension[] },
] as const;

/**
 * Generates a mapping of supported MIME types to their corresponding file extensions using functional programming.
 */
export function getAcceptedTypesMap(): Record<SupportedFileType, SupportedExtension[]> {
	return FILE_TYPE_CONFIGS.reduce(
		(acc, config) => {
			acc[config.type] = config.extensions;
			return acc;
		},
		{} as Record<SupportedFileType, SupportedExtension[]>
	);
}

export const ACCEPTED_TYPES_MAP = getAcceptedTypesMap();
