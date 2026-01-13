import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SelectedCategory } from "./_components/selectedCategory";

export default function NewsPage() {
	return (
		<MaxWidthWrapper className="py-8 sm:py-12">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-10 sm:mb-16">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
						News & Updates
					</h1>
					<p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
						Stay informed about system updates, maintenance schedules, and important announcements
					</p>
				</div>

				<SelectedCategory />

				<div className="mt-12 bg-accent/20 border border-accent rounded-2xl p-6 sm:p-8">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
						<div>
							<h3 className="text-lg font-semibold text-foreground mb-2">Subscribe to Updates</h3>
							<p className="text-sm text-muted-foreground">
								Get notified about important news and system updates
							</p>
						</div>
						<button
							type="button"
							className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all whitespace-nowrap"
						>
							Subscribe Now
						</button>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
