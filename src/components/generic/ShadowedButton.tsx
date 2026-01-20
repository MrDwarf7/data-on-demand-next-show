import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ShadowedButtonProps extends ButtonProps {
	roundedLevel?: "sm" | "md" | "lg" | "xl" | "2xl";
	shadowLevel?: "sm" | "md" | "lg" | "xl" | "2xl";
	bgColor?: string;
	hoverEnabled?: boolean;
	// hoverBgColor?: string;
	percentageShadow?: number;
	whitespaceWrap?: boolean;
}

const ShadowedButton = ({
	children,
	...props
}: React.ComponentPropsWithoutRef<"button"> & ShadowedButtonProps) => {
	const Comp = props.asChild ? Slot : "button";
	const {
		className,
		roundedLevel = "xl",
		shadowLevel = "lg",
		hoverEnabled = true,
		percentageShadow = 50,
		whitespaceWrap = true,
	} = props;

	const bgColor = props.bgColor
		? props.bgColor.startsWith("bg-")
			? props.bgColor.slice(3)
			: props.bgColor
		: "blue-600";

	const hoverBgColor = ((bgColor: string) => {
		const bgParts = bgColor.split("-");
		const colorBase = bgParts.slice(0, -1).join("-");
		const incremented = parseInt(bgParts[bgParts.length - 1], 10) + 100;
		return `bg-${colorBase}-${incremented}`;
	})(bgColor);

	const base = cn(
		className,
		`bg-${bgColor} rounded-${roundedLevel}`,
		"font-medium transition-all text-white"
	);
	const hover =
		hoverEnabled && cn(`hover:${hoverBgColor} hover:shadow-${hoverBgColor}/${percentageShadow}`);
	const shadow = cn(`shadow-${shadowLevel} shadow-${bgColor}/${percentageShadow}`);
	const style = cn(base, shadow, hover, `${whitespaceWrap && "whitespace-nowrap"}`);

	return <Comp className={style}>{children}</Comp>;
};

ShadowedButton.displayName = "ShadowedButton";

export { ShadowedButton };
