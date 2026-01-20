"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
	const router = useRouter();

	const { className, classNameActive, classNameNotActive, path, title, icon } = props;

	function classNameConditional(pathName: string) {
		if (pathName === path) {
			return cn(className, classNameActive);
		}
		return cn(className, classNameNotActive);
	}

	const isSamePath = pathName === path;
	const handleSamePathClick = (e: React.MouseEvent) => {
		e.preventDefault();
		// Hard reload to reset state
		window.location.href = path;
	};

	if (variant === "link") {
		return (
			<Link
				href={path}
				className={classNameConditional(pathName)}
				onClick={isSamePath ? handleSamePathClick : undefined}
			>
				{icon && <span className="shrink-0">{icon}</span>}
				<span className="flex-1">{title}</span>
			</Link>
		);
	}

	return (
		<div className="inline-block" key={title}>
			<Link href={path} onClick={isSamePath ? handleSamePathClick : undefined}>
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
