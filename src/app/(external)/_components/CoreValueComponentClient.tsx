"use client";
import { useState } from "react";

export interface CoreValueCardProps {
	lines: string[];
	lineIds: string[];
}

export const CoreValueCardClient = ({ lines, lineIds }: CoreValueCardProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	//
	return (
		<>
			{!isExpanded ? (
				<button
					type="button"
					onClick={() => setIsExpanded(true)}
					className="mt-3 text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
				>
					Read more →
				</button>
			) : (
				<div className="mt-4 space-y-3 text-sm text-muted-foreground text-left max-w-md mx-auto">
					{lines.map((lines, idx) => (
						<p key={`${lineIds}__core_value_card_${lineIds[idx]}`}>{lines}</p>
					))}

					<button
						type="button"
						onClick={() => setIsExpanded(false)}
						className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
					>
						← Show less
					</button>
				</div>
			)}
		</>
	);
};
