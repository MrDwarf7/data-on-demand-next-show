"use client";

import { forwardRef } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface FormInputProps {
	label: string;
	type?: "text" | "email" | "password" | "textarea";
	placeholder?: string;
	defaultValue?: string;
	rows?: number;
	required?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormInputProps>(
	({ label, type = "text", placeholder, defaultValue, rows, required }, ref) => {
		const inputClassName =
			"w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground";

		return (
			<div>
				<label className="block text-sm font-medium text-foreground mb-2">{label}</label>
				{type === "textarea" ? (
					<Textarea
						ref={ref as React.Ref<HTMLTextAreaElement>}
						rows={rows}
						placeholder={placeholder}
						defaultValue={defaultValue}
						required={required}
						className={`${inputClassName} resize-none`}
					/>
				) : (
					<Input
						ref={ref as React.Ref<HTMLInputElement>}
						type={type}
						placeholder={placeholder}
						defaultValue={defaultValue}
						required={required}
						className={inputClassName}
					/>
				)}
			</div>
		);
	}
);

FormInput.displayName = "FormInput";
