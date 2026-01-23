import { writeFile } from "fs/promises";
// import { revalidatePath } from "next/cache";

export const renameFile = (originalName: string): string => {
	const now = new Date();
	const dateStr = now.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
	const timeStr = now.toISOString().slice(11, 19).replace(/:/g, ""); // HHMMSS
	const uuid = crypto.randomUUID();

	const ext = originalName.split(".").pop() || "";
	const filename = `${dateStr}-${timeStr}-${originalName.replace(/\.[^/.]+$/, "")}-${uuid}.${ext}`;
	return filename;
};

// const toDatabase = async (file: File): Promise<void> => {
// 	// TODO: [backend] swappable with actual DB logic
// };

export const toDisk = async (file: File, filepath: string): Promise<void> => {
	const buffer = await file.arrayBuffer();
	await writeFile(filepath, Buffer.from(buffer));
};
