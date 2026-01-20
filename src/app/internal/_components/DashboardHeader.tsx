"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { NotificationsDrawer } from "./NotificationsDrawer";

// TODO: [performance] : Move client components down the tree to improve performance where possible.

const DashboardHeader = () => {
	const [search, setSearch] = useState("");
	const [searchFocused, setSearchFocused] = useState(false);
	const pathName = usePathname();

	const getPageTitle = ((pathName) => {
		const segments = pathName.split("/").filter(Boolean);
		const lastSegment = segments[segments.length - 1] || "Dashboard";
		return lastSegment
			.split("-")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	})(pathName);

	return (
		<header className="sticky top-0 z-30 w-full bg-background/95 backdrop-blur border-b border-accent/50 supports-[backdrop-filter]:bg-background/80">
			<div className="flex items-center justify-between px-4 sm:px-6 py-4">
				<div>
					<h1 className="text-lg sm:text-xl font-bold text-foreground">{getPageTitle}</h1>
					<p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</div>

				<div className="flex items-center gap-2 sm:gap-4">
					<div className="relative hidden sm:block">
						<div
							className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
								searchFocused ? "border-blue-500 bg-accent/50" : "border-accent/50 bg-accent/30"
							}`}
						>
							<FiSearch className="text-muted-foreground w-4 h-4" />
							<input
								type="text"
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								onFocus={() => setSearchFocused(true)}
								onBlur={() => setSearchFocused(false)}
								className="bg-transparent border-none outline-none text-sm w-32 md:w-48 lg:w-64 text-foreground placeholder:text-muted-foreground"
							/>
							{search && (
								<button
									type="button"
									onClick={() => setSearch("")}
									className="hover:bg-accent rounded p-1 transition-colors"
								>
									<FiX className="text-muted-foreground w-4 h-4" />
								</button>
							)}
						</div>
					</div>

					<NotificationsDrawer />
				</div>
			</div>

			<div className="sm:hidden px-4 pb-3">
				<div
					className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
						searchFocused ? "border-blue-500 bg-accent/50" : "border-accent/50 bg-accent/30"
					}`}
				>
					<FiSearch className="text-muted-foreground w-4 h-4" />
					<input
						type="text"
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onFocus={() => setSearchFocused(true)}
						onBlur={() => setSearchFocused(false)}
						className="bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-muted-foreground"
					/>
					{search && (
						<button
							type="button"
							onClick={() => setSearch("")}
							className="hover:bg-accent rounded p-1 transition-colors"
						>
							<FiX className="text-muted-foreground w-4 h-4" />
						</button>
					)}
				</div>
			</div>
		</header>
	);
};

export { DashboardHeader };
