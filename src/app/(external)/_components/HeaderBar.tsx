"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { RenderTile } from "@/components/generic/RenderTile";
import ThemeToggler from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { APP_NAME } from "@/config/constants";
import { EXTERNAL_MENU_ITEMS } from "@/config/external/headerbar-config";
import { PATHS } from "@/constants/paths";

export const tileClassValues = {
	className: "gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",

	classNameActive: "bg-blue-600 hover:bg-blue-700 text-white",
	// classNameActive: "bg-ring shadow-sm text-foreground",
	// classNameNotActive: "bg-accent/50 hover:bg-ring/80 text-foreground",
	classNameNotActive: "bg-accent/50 hover:bg-ring/80 text-foreground",
};

export const HeaderBar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-accent/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between sm:px-2 sm:gap-4 sm:justify-between">
					<Link
						className="text-xl sm:text-2xl font-bold whitespace-nowrap hover:text-blue-600 transition-colors"
						href={PATHS.HOME}
					>
						<span className="justify-center items-center flex gap-2">{APP_NAME}</span>
					</Link>

					<nav className="hidden md:flex items-center gap-2 lg:gap-3">
						{EXTERNAL_MENU_ITEMS.map((item) => (
							<Suspense fallback={<Skeleton className="w-20 h-9" />} key={item.title}>
								<RenderTile {...item} {...tileClassValues} />
							</Suspense>
						))}
						<div className="ml-2">
							<ThemeToggler />
						</div>
					</nav>

					<Button
						variant="ghost"
						aria-label="Toggle menu"
						className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						type="button"
					>
						{mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
					</Button>
				</div>

				{mobileMenuOpen && (
					<div className="md:hidden pb-4 pt-2 border-t border-accent/50 mt-2">
						<nav className="flex flex-col gap-2">
							{EXTERNAL_MENU_ITEMS.map((item) => (
								<div
									className="min-w-full justify-center items-center"
									key={item.title}
									onClick={() => setMobileMenuOpen(false)}
								>
									<Suspense fallback={<Skeleton className="w-full h-10" />} key={item.title}>
										<RenderTile {...item} {...tileClassValues} />
									</Suspense>
								</div>
							))}
							<div className="mt-2 px-4 flex items-center gap-2">
								<span className="text-sm text-muted-foreground">Theme:</span>
								<ThemeToggler />
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};
