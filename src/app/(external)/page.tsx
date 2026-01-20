import { RenderCoreValues } from "@/app/(external)/_components/CoreValueComponent";
import { RenderGridItems } from "@/app/(external)/_components/RenderGridItems";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// import { Suspense } from "react";
// import { RenderTiles } from "./_components/RenderTiles";

type Keyword = {
	word: string;
	eol: string;
};

export default function Home() {
	const keywords: Keyword[] = [
		{ word: "consistency", eol: ", " },
		{ word: "visibility", eol: ", and " },
		{ word: "transparency", eol: "." },
	];

	const formattedKeyWords = (keywords: Keyword[]) =>
		keywords.map((word) => (
			<span key={word.word} className="text-blue-600 font-medium">
				{word.word}
				{word.eol}
			</span>
		));

	return (
		<>
			{/* <div className="relative flex min-h-237.5 w-full flex-col items-start justify-start overflow-hidden"> */}
			<BackgroundRippleEffect cellSize={50} />
			<MaxWidthWrapper className="py-8 sm:py-12">
				{/* <MaxWidthWrapper className="mt-6 sm:mt-10 h-full"> */}
				<div className="relative flex min-h-237.5 w-full flex-col items-start justify-start overflow-hidden">
					{/* Keeps the pointer useable */}
					<div className="absolute inset-0 z-10 pointer-events-none">
						{/* <div className="py-6 sm:py-10 mx-auto text-center flex flex-col items-center max-w-4xl"> */}
						<h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl px-4">
							Robotics Processing and Automation.
						</h1>
						<h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl mt-3 sm:mt-4 px-4">
							The central hub for <span className="text-blue-600">all things automated</span>.
						</h2>
						<p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-prose px-4">
							Welcome to Data On Demand - The Smart Automation team&apos;s new platform for
							providing better service through three core principles: {formattedKeyWords(keywords)}
						</p>
						<RenderGridItems />
						{/* Render the individual buttons under the cards */}

						{/* Honestly not sure what to do with this seciton. Looks rather empty without them, but they don't look great tbh ......... */}

						{/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10 sm:mt-12 mb-6 sm:mb-8 w-full max-w-2xl px-4 pointer-events-auto"> */}
						{/* 	<Suspense fallback={<div>Loading...</div>}> */}
						{/* 		<RenderTiles /> */}
						{/* 	</Suspense> */}
						{/* </div> */}
						{/* </div> */}
					</div>
				</div>
				<RenderCoreValues />
			</MaxWidthWrapper>
			{/* </div> */}
		</>
	);
}
