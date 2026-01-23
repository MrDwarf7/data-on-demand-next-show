export interface DashboardTipsProps {
	mainTitle: string;
	subsections: Array<{
		subTitle: string;
		blurb: string;
	}>;
}

export const SubSectionTips = ({ subTitle, blurb }: { subTitle: string; blurb: string }) => {
	return (
		<div className="bg-accent/80 border border-accent/80 rounded-md p-4 sm:p-5">
			<h3 className="text-base sm:text-lg font-medium text-foreground mb-2">{subTitle}</h3>
			<p className="text-sm text-muted-foreground">{blurb}</p>
		</div>
	);
};

export const DashboardTips = ({ ...props }: DashboardTipsProps) => {
	const { mainTitle, subsections } = props;

	return (
		<div className="mt-8 sm:mt-12 bg-accent/30 border border-accent/50 rounded-lg p-5 sm:p-6 lg:p-8">
			<h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
				{mainTitle}
			</h2>
			<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
				{subsections.map((section) => (
					<SubSectionTips
						key={`${section.subTitle}__${section.blurb.slice(0, 8)}`}
						subTitle={section.subTitle}
						blurb={section.blurb}
					/>
				))}
			</div>
		</div>
	);
};
