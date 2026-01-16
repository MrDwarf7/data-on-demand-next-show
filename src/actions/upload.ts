"use server";

import { z } from "zod";

const FileSchema = z.object({
	name: z.string(),
	size: z.number().min(100 * 1024, "File must be at least 100kb"),
	type: z.string(),
});

const UploadSchema = z.object({
	process: z.string().min(1, "Process is required"),
	files: z.array(FileSchema).min(1, "At least one file required"),
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

export async function uploadFiles(formData: FormData): Promise<UploadResult> {
	try {
		const process = formData.get("process") as string;
		const files = formData.getAll("files") as File[];

		console.log(
			`[UPLOAD] Starting upload process: ${process}, files: ${files.length}, total size: ${files.reduce((sum, f) => sum + f.size, 0)} bytes`
		);

		// Validate with Zod
		const validationResult = UploadSchema.safeParse({
			process,
			files: files.map((f) => ({
				name: f.name,
				size: f.size,
				type: f.type,
			})),
		});

		if (!validationResult.success) {
			console.error(
				`[UPLOAD] Validation failed for process: ${process}`,
				validationResult.error.flatten().fieldErrors
			);
			return {
				success: false,
				errors: validationResult.error.flatten().fieldErrors,
			};
		}

		console.log(`[UPLOAD] Validation passed for process: ${process}`);

		// Process files with new naming (server-side simulation)
		const processedFiles = files.map((file) => {
			const date = new Date().toISOString().split("T")[0].replace(/-/g, "_");
			const uuid = crypto.randomUUID().slice(0, 8); // Server-side UUID
			const ext = file.name.split(".").pop() || "bin";
			const sanitizedProcess = process.replace(/[^a-zA-Z0-9-_]/g, "_");
			const newName = `${date}-${sanitizedProcess}-${uuid}.${ext}`;

			console.log(`[UPLOAD] Processing file: ${file.name} -> ${newName}, size: ${file.size} bytes`);

			return {
				originalName: file.name,
				newName,
				size: file.size,
			};
		});

		console.log(`[UPLOAD] Processed ${processedFiles.length} files for process: ${process}`);

		// TODO: [backend] : Replace with real upload logic
		console.log(`[UPLOAD] Simulating upload for ${processedFiles.length} files`);
		await new Promise((resolve) => setTimeout(resolve, 1000));

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
