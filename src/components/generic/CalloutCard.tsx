"use client";

import type { ReactNode } from "react";

interface CalloutCardProps {
	icon: ReactNode;
	title: string;
	description: string;
	children: ReactNode;
}

export function CalloutCard({ icon, title, description, children }: CalloutCardProps) {
	return (
		<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
			<div className="flex items-start gap-3">
				<div className="text-blue-600 mt-0.5">{icon}</div>
				<div className="flex-1">
					<h4 className="font-medium text-foreground mb-1">{title}</h4>
					<p className="text-sm text-muted-foreground mb-3">{description}</p>
					{children}
				</div>
			</div>
		</div>
	);
}
