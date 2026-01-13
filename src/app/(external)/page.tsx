import { RenderCoreValues } from "@/app/(external)/_components/CoreValueComponent";
import { tileClassValues } from "@/app/(external)/_components/HeaderbarComponent";
import { RenderGridItems } from "@/app/(external)/_components/RenderGridItems";
import { RenderTile } from "@/components/generic/RenderTile";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { EXTERNAL_MENU_ITEMS } from "@/config/external/headerbar-config";

const filteredMenuItems = EXTERNAL_MENU_ITEMS.filter((item) => {
	if (!item.path) return false; // none/empty
	if (item.path === "/") return false; // root/home
	if (item.path.startsWith("/internal") || item.icon === undefined || null) return false; // all internal paths should be excluded
	return true;
});

export default function Home() {
	return (
		<div className="relative flex min-h-237.5 w-full flex-col items-start justify-start overflow-hidden">
			<BackgroundRippleEffect cellSize={50} />
			<div className="relative flex min-h-237.5 w-full flex-col items-start justify-start overflow-hidden">
				<div className="absolute inset-0 z-10 pointer-events-none">
					<MaxWidthWrapper className="mt-6 sm:mt-10 h-full">
						<div className="py-6 sm:py-10 mx-auto text-center flex flex-col items-center max-w-4xl">
							<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl px-4">
								Robotics Processing and Automation.
							</h1>
							<h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl mt-3 sm:mt-4 px-4">
								The central hub for <span className="text-blue-600">all things automated</span>.
							</h2>

							<p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-prose px-4">
								Welcome to Data On Demand - The Smart Automation team&apos;s new platform for
								providing better service through three core principles:{" "}
								<span className="text-blue-600 font-medium">consistency</span>,{" "}
								<span className="text-blue-600 font-medium">visibility</span>, and{" "}
								<span className="text-blue-600 font-medium">transparency</span>.
							</p>

							<RenderGridItems />

							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10 sm:mt-12 mb-6 sm:mb-8 w-full max-w-2xl px-4 pointer-events-auto">
								{/* Render the individual buttons under the cards  */}
								{filteredMenuItems.map((item) => (
									<RenderTile
										icon={item.icon}
										key={item.path}
										path={item.path}
										title={item.title}
										{...tileClassValues}
									/>
								))}
							</div>
						</div>
					</MaxWidthWrapper>
				</div>
			</div>
			<RenderCoreValues />
		</div>
	);
}
