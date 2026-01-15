"use client";

import type { ReactNode } from "react";

interface OptionButtonProps {
	children: ReactNode;
	selected?: boolean;
	onClick?: () => void;
}

export function OptionButton({ children, selected, onClick }: OptionButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`px-3 py-1.5 bg-background hover:bg-accent border border-accent/50 rounded-lg text-sm font-medium transition-all ${
				selected ? "bg-blue-100 border-blue-500 text-blue-700" : ""
			}`}
		>
			{children}
		</button>
	);
}
