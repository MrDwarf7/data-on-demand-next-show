import Link from "next/link";
import { DASHBOARD_CARDS } from "@/config/internal/dashboard-page";

export const RenderDashboardCards = () => {
	return (
		<div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
			{DASHBOARD_CARDS.map((card) => (
				<Link
					key={card.path}
					href={card.path}
					className={`${card.classNameColor} border border-accent/50 rounded-lg p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group`}
				>
					<div className="flex flex-col h-full">
						<div className={`${card.iconColor} mb-4 transition-transform duration-200`}>
							{card.icon?.({ className: "w-8 h-8" })}
						</div>
						<h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{card.title}</h3>
						<p className="text-sm sm:text-base text-muted-foreground grow">{card.description}</p>
						<div className="mt-4 flex items-center text-sm font-medium text-foreground/75">
							<span>Go to {card.title}</span>
							<svg
								className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};
