"use client";

import type { ReactNode } from "react";

interface SectionCardProps {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}

export function SectionCard({ icon, title, children }: SectionCardProps) {
	return (
		<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
			<h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
				{icon}
				{title}
			</h2>
			<div className="space-y-6">{children}</div>
		</div>
	);
}
