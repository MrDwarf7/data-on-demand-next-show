"use client";

import type { ReactNode } from "react";

interface ActionButtonProps {
	children: ReactNode;
	onClick?: () => void;
	type?: "button" | "submit";
	variant?: "primary" | "secondary";
	icon?: ReactNode;
	className?: string;
}

export function ActionButton({
	children,
	onClick,
	type = "button",
	variant = "primary",
	icon,
	className = "",
}: ActionButtonProps) {
	const baseClass =
		"flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl";
	const variantClass =
		variant === "primary"
			? "bg-blue-600 hover:bg-blue-700 text-white"
			: "bg-accent hover:bg-accent/80 text-foreground";

	return (
		<button type={type} onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
			{icon}
			{children}
		</button>
	);
}
