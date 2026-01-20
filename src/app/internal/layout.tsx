import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import { DashboardHeader } from "@/app/internal/_components/DashboardHeader";
import { Sidebar } from "@/app/internal/_components/SidebarComponent";
import ProviderWrapper from "@/components/ProviderWrapper";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Internal | Data on Demand",
	description: "Internal | Dashboard",
};

export default function RootInternalLayout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning={true} className="h-full">
			<body className={cn("relative h-full font-sans antialiased", inter.className)}>
				<ProviderWrapper>
					<main className="relative flex min-h-screen bg-background">
						<Sidebar />
						<div className="flex-1 flex flex-col min-w-0">
							<DashboardHeader />
							<div className="flex-1">{children}</div>
						</div>
					</main>
				</ProviderWrapper>
			</body>
		</html>
	);
}
