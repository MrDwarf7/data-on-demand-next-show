import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { SelectedCategory } from "./_components/selectedCategory";

export default function NewsPage() {
	return (
		// <MaxWidthWrapper className="py-8 sm:py-12">
		<div className="max-w-7xl mx-auto">
			<HeroSection
				title="News & Updates"
				description="Stay informed about system updates, maintenance schedules, and important announcements"
			/>

			<SelectedCategory />

			<div className="mt-12 bg-accent/20 border border-accent rounded-2xl p-6 sm:p-8">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div>
						<h3 className="text-lg font-semibold text-foreground mb-2">Subscribe to Updates</h3>
						<p className="text-sm text-muted-foreground">
							Get notified about important news and system updates
						</p>
					</div>
					{/* <ShadowedButton className="px-6 py-3"> */}
					<Button
						type="button"
						className="px-6 py-3 bg-blue-600 shadow-lg shadow-blue-600/50 hover:bg-blue-700 hover:shadow-blue-700/50 text-white rounded-lg font-medium transition-all whitespace-nowrap"
					>
						Subscribe Now
						{/* </ShadowedButton> */}
					</Button>
				</div>
			</div>
		</div>
		// </MaxWidthWrapper>
	);
}
