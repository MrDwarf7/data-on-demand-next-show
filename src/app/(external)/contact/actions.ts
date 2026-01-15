"use server";

export async function sendContactMessage(formData: FormData) {
	const data = Object.fromEntries(formData);
	console.log("Sending contact message:", data);
	// Here you would send email, save to database, etc.
	// For now, just log
}
