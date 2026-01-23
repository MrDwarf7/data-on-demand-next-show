"use client";

import { useState } from "react";

import { SubmitButton } from "@/components/generic/SubmitButton";
import { CONTACT_SUBJECTS, FORM_CONFIG } from "@/config/external/contact-config";
import { sendContactMessage } from "../actions";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
					<Field>
						<FieldLabel htmlFor="input-field-name">Name</FieldLabel>
						<Input
							id="input-field-name"
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder={FORM_CONFIG.namePlaceholder}
							className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
							required
						/>
						<FieldDescription>
							Please enter your name (can be your username or first name).
						</FieldDescription>
					</Field>

					<div>
						{/* 	<label className="block text-sm font-medium text-foreground mb-2">Name</label> */}
						{/* 	<input */}
						{/* 		type="text" */}
						{/* 		name="name" */}
						{/* 		value={formData.name} */}
						{/* 		onChange={handleChange} */}
						{/* 		placeholder={FORM_CONFIG.namePlaceholder} */}
						{/* 		className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" */}
						{/* 		required */}
						{/* 	/> */}
						{/* </div> */}
						{/* <div> */}
						<Label className="block text-sm font-medium text-foreground mb-2">Email</Label>
						<Input
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
					<Label className="block text-sm font-medium text-foreground mb-2">Subject</Label>
					<Select
						name="subject"
						value={formData.subject}
						defaultValue={formData.subject}
						required
						// onValueChange={(value) => handleChange}
					>
						<SelectTrigger className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground">
							<SelectValue placeholder="Select a subject..." />
						</SelectTrigger>

						<SelectContent className="w-full p-1">
							{CONTACT_SUBJECTS.map((subject) => (
								<SelectItem key={subject.value} value={subject.value}>
									{subject.label}
								</SelectItem>
							))}{" "}
						</SelectContent>
					</Select>
				</div>

				<div>
					<Label className="block text-sm font-medium text-foreground mb-2">Message</Label>
					<Textarea
						name="message"
						value={formData.message}
						onChange={handleChange}
						placeholder={FORM_CONFIG.messagePlaceholder}
						rows={FORM_CONFIG.messageRows}
						className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
						required
					/>
				</div>

				<SubmitButton text="Send Message" pendingText="Sending..." />
			</form>
		</div>
	);
}
