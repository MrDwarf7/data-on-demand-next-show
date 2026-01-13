"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { JSX } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TileProps } from "@/types/local";

interface RenderTileProps extends TileProps {
	// navbarItem?: HTMLNextUIProps<"div" | "li">;
	className?: string;
	classNameActive?: string;
	classNameNotActive?: string;
	icon?: JSX.Element;
	variant?: "button" | "link";
}

const asIcon = (icon: JSX.Element | undefined) => {
	if (icon) {
		return <span className="mr-2 inline-flex">{icon}</span>;
	}
};

const RenderTile = ({ variant = "button", ...props }: RenderTileProps) => {
	const pathName = usePathname();

	const { className, classNameActive, classNameNotActive, path, title, icon } = props;

	function classNameConditional(pathName: string) {
		if (pathName === path) {
			return cn(className, classNameActive);
		}
		return cn(className, classNameNotActive);
	}

	if (variant === "link") {
		return (
			<Link href={path} className={classNameConditional(pathName)}>
				{icon && <span className="shrink-0">{icon}</span>}
				<span className="flex-1">{title}</span>
			</Link>
		);
	}

	return (
		<div className="inline-block" key={title}>
			<Link href={path}>
				<Button
					tabIndex={-1}
					variant="secondary"
					className={classNameConditional(pathName)}
					aria-label={title}
				>
					{asIcon(icon)}
					{title}
				</Button>
			</Link>
		</div>
	);
};

export { RenderTile };
