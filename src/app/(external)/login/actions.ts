"use server";

export async function authenticateUser(formData: FormData) {
	const data = Object.fromEntries(formData);
	console.log("Authenticating user:", data);
	// Here you would authenticate, set session, etc.
	// For now, just log
}
