"use server";

export async function createNews(formData: FormData) {
	const data = Object.fromEntries(formData);
	console.log("Creating news:", data);
	// Here you would save to database, etc.
	// For now, just log
}
