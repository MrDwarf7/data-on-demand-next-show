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
	const iconElement = icon({ size: 20 });

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
				<span className="shrink-0">{iconElement}</span>
				<span className="flex-1">{title}</span>
			</Link>
		);
	}

	return (
		<div className="inline-block w-full" key={title}>
			<Link href={path} onClick={handleOnClick()}>
				<Button tabIndex={-1} variant="secondary" className={classNameC} aria-label={title}>
					<span className="mr-2 inline-flex">{iconElement}</span>
					{title}
				</Button>
			</Link>
		</div>
	);
};
