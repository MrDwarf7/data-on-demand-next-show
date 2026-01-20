import { cn } from "@/lib/utils";

export interface HeroSectionProps {
	title: string;
	description: string;
	center?: boolean;
	divClassName?: string;
	h1ClassName?: string;
	paragraphClassName?: string;
}

export const HeroSection = ({ ...props }: HeroSectionProps) => {
	//

	const { center = true } = props;

	return (
		<div className={cn(props.divClassName, `text-${center ? "center" : "left"} mb-10 sm:mb-16`)}>
			<h1
				className={cn(
					props.h1ClassName,
					"text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
				)}
			>
				{props.title}
			</h1>
			<p
				className={cn(
					props.paragraphClassName,
					"text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto"
				)}
			>
				{props.description}
			</p>
		</div>
	);
};
