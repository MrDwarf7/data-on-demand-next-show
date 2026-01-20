import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
	MAX_FILE_SIZE,
	MIN_FILE_SIZE,
	SUPPORTED_FILE_TYPES,
} from "@/config/external/upload-config";

const FileSchema = z.object({
	name: z.string(),
	size: z
		.number()
		.min(MIN_FILE_SIZE, `File must be at least ${MIN_FILE_SIZE / 1024}kb`)
		.max(MAX_FILE_SIZE, `File must be at most ${MAX_FILE_SIZE / (1024 * 1024)}MB`),
	type: z.enum(
		Object.values(SUPPORTED_FILE_TYPES) as [string, ...string[]],
		"Unsupported file type"
	),
});

const UploadSchema = z.object({
	process: z.string().min(1, "Process is required"),
	files: z.array(FileSchema).min(1, "At least one file required"),
	fileType: z.string().optional(), // For backend enum
});

export interface UploadResult {
	success: boolean;
	errors?: Record<string, string[]>;
	jobId?: string;
	processedFiles?: Array<{
		originalName: string;
		newName: string;
		size: number;
	}>;
}

async function writeToStorage(file: File, newName: string): Promise<void> {
	const filePath = path.join("./public/uploads", newName);
	const buffer = new Uint8Array(await file.arrayBuffer());
	await fs.mkdir(path.dirname(filePath), { recursive: true });
	await fs.writeFile(filePath, buffer);
}

export async function uploadFiles(formData: FormData): Promise<UploadResult> {
	try {
		const process = formData.get("process") as string;
		const fileType = formData.get("fileType") as string;
		const fileData = formData.getAll("files"); //as File[];
		const files = fileData.filter((f): f is File => f instanceof File);

		console.log(
			`[UPLOAD] Starting upload process: 
       process: ${process},
       fileType: ${fileType},
       files: ${files.length},
       total size: ${files.reduce((sum, f) => sum + f.size, 0)} bytes`
		);

		// Validate with Zod
		const validationResult = UploadSchema.safeParse({
			process,
			fileType,
			files: files.map((f) => ({
				name: f.name,
				size: f.size,
				type: f.type,
			})),
		});

		if (!validationResult.success) {
			const errors: Record<string, string[]> = {};
			for (const issue of validationResult.error.issues) {
				const path = issue.path.join(".");
				if (!errors[path]) errors[path] = [];
				errors[path].push(issue.message);
			}
			console.error(`[UPLOAD] Validation failed for process: ${process}`, errors);
			return {
				success: false,
				errors,
			};
		}

		console.log(`[UPLOAD] Validation passed for process: ${process}`);

		// Process files keeping client-side naming
		const processedFiles = await Promise.all(
			files.map(async (file) => {
				const newName = file.name; // Keep the client-side renamed name

				console.log(
					`[UPLOAD] Processing file: ${file.name} -> ${newName}, size: ${file.size} bytes`
				);

				await writeToStorage(file, newName);

				return {
					originalName: file.name,
					newName,
					size: file.size,
				};
			})
		);

		console.log(`[UPLOAD] Processed ${processedFiles.length} files for process: ${process}`);

		const jobId = `upload-${Date.now()}`;
		console.log(`[UPLOAD] Upload completed successfully, jobId: ${jobId}`);

		return {
			success: true,
			jobId,
			processedFiles,
		};
	} catch (error) {
		console.error(`[UPLOAD] Upload failed with error:`, error);
		return {
			success: false,
			errors: { general: ["Upload failed"] },
		};
	}
}
