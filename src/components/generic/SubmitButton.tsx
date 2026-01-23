"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface SubmitButtonProps {
	text: string;
	pendingText: string;
	className?: string;
}

export function SubmitButton({ text, pendingText, className }: SubmitButtonProps) {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			disabled={pending}
			className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 
${className || ""} `}
		>
			{pending ? pendingText : text}
		</Button>
	);
}
