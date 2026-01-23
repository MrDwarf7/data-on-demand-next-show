export interface InternalHeroSectionProps {
	title: string;
	description: string;
}

export const InternalHeroSection = ({ title, description }: InternalHeroSectionProps) => {
	return (
		<>
			<h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
			<p className="text-sm text-muted-foreground mt-1">{description}</p>
		</>
	);
};
