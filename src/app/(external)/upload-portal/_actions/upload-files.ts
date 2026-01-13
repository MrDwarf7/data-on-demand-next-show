import { writeFile } from "fs";
import { join } from "path";

export async function UploadFilesToDisk(data: FormData) {
	"use server";
	const file: File | null = data.get("file") as unknown as File;

	try {
		if (!file || file === null || file === undefined || file.size === 0) {
			throw new Error("No file found");
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		// console.log("Buffer: ", buffer.toString());

		const filePath = join(process.cwd(), "public", "uploads", file.name);
		writeFile(filePath, buffer, () => {
			// console.log("File written at path: ", filePath);
		});
	} catch (error) {
		console.error(error);
	}

	return { success: true };
}
