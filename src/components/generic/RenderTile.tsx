"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { JSX } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TileProps } from "@/types/local";

interface RenderTileProps extends TileProps {
	className?: string;
	classNameActive?: string;
	classNameNotActive?: string;
	variant?: "button" | "link";
}

// HACK: very hacky until refactoring of the picker and such.
// Currently do this to allow users to reset ProcessPicker items and such
// as it's natural for users to just click again on the same link to "reset" things.

export const RenderTile = ({ variant = "button", ...props }: RenderTileProps): JSX.Element => {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const { className, classNameActive, classNameNotActive, title, icon } = props;
	const path = props.path || "/";

	const classNameC =
		pathName === path ? cn(className, classNameActive) : cn(className, classNameNotActive);

	const handleOnClick = () => {
		if (searchParams.size === 0) return;

		if (pathName === path) {
			return (e: React.MouseEvent) => {
				e.preventDefault();
				window.location.href = path;
			};
		}
	};

	if (variant === "link") {
		return (
			<Link href={path} className={classNameC} onClick={handleOnClick()}>
				<span className="shrink-0">{icon({ size: 20 })}</span>
				<span className="flex-1">{title}</span>
			</Link>
		);
	}

	return (
		<div className="inline-block w-full" key={title}>
			<Link href={path} onClick={handleOnClick()}>
				{/* <Button tabIndex={-1} variant="secondary" className={classNameC} aria-label={title}> */}
				<Button
					tabIndex={-1}
					variant="secondary"
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all gap-2 shadow-lg hover:bg-ring/20 ${
						pathName === path && "bg-blue-600 hover:bg-blue-700 text-white"
					}`}
					aria-label={title}
				>
					<span className="mr-2 inline-flex">{icon({ size: 20 })}</span>
					{title}
				</Button>
			</Link>
		</div>
	);
};
