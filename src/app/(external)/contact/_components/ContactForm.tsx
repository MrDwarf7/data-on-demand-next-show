"use client";

import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { CONTACT_SUBJECTS, FORM_CONFIG } from "@/config/external/contact-config";
import { sendContactMessage } from "../actions";

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "general",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 sm:p-8">
			<h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
			<form action={sendContactMessage} className="space-y-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-foreground mb-2">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder={FORM_CONFIG.namePlaceholder}
							className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
							required
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-foreground mb-2">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder={FORM_CONFIG.emailPlaceholder}
							className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
							required
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-foreground mb-2">Subject</label>
					<select
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
					>
						{CONTACT_SUBJECTS.map((subject) => (
							<option key={subject.value} value={subject.value}>
								{subject.label}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-foreground mb-2">Message</label>
					<textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder={FORM_CONFIG.messagePlaceholder}
						rows={FORM_CONFIG.messageRows}
						className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
				>
					<FiSend className="w-4 h-4" />
					Send Message
				</button>
			</form>
		</div>
	);
}
