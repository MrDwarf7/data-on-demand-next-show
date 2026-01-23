import type React from "react";

import "@/app/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import FooterBlock from "@/app/(external)/_components/FooterComponent";
import { HeaderBar } from "@/app/(external)/_components/HeaderBar";
import ProviderWrapper from "@/components/ProviderWrapper";
import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

// import TitleHeader from "@/components/generic/TitleHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Smart Automation | Your hub for everything automated",
	description: "Data On Demand | Home",
};

export default function RootExternalLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning className="h-full">
			<body className={cn("relative h-full font-sans antialiased", inter.className)}>
				<ProviderWrapper>
					<main className="relative flex flex-col min-h-screen bg-background">
						<div className="grow flex-1">
							{/* <TitleHeader /> */}
							{/* <div> */}
							<HeaderBar />
							{/* </div> */}
							<MaxWidthWrapper className="py-8 sm:py-12">{children}</MaxWidthWrapper>
							<div className="flex flex-row justify-center">
								<FooterBlock className="my-2 pb-2" />
							</div>
						</div>
					</main>
				</ProviderWrapper>
			</body>
		</html>
	);
}
