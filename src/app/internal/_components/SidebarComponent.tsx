"use client";

import { Suspense, useState } from "react";
import { FiActivity, FiServer } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { RenderTile } from "@/components/generic/RenderTile";
import ThemeToggler from "@/components/ThemeToggler";
import { Skeleton } from "@/components/ui/skeleton";
import { INTERNAL_SIDEBAR_ITEMS } from "@/config/internal/sidebar-config";
import type { TileProps } from "@/types/local";

// TODO:[sidebar] : use the provided shadcn/ui component instead?

const Sidebar = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const tileClassValues = {
		className:
			"flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
		classNameActive: "bg-blue-600 text-white",
		classNameNotActive: "text-foreground hover:bg-accent/70",
		variant: "link" as const,
	};

	// async function sidebarTileLoading() {
	// 	return (
	// 		<>
	// 			<Skeleton className="w-full h-10 rounded-lg" />
	// 			<Skeleton className="w-full h-10 rounded-lg" />
	// 			<Skeleton className="w-full h-10 rounded-lg" />
	// 		</>
	// 	);
	// }

	const SidebarContent = () => (
		<div className="flex flex-col h-full">
			<div className="p-4 border-b border-accent/50">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
							SA
						</div>
						<span className="font-semibold text-sm">Smart Automation</span>
					</div>
					<ThemeToggler />
				</div>

				<div className="space-y-3 pt-3">
					<div className="bg-accent/30 rounded-lg p-3 border border-accent/50">
						<div className="flex items-center gap-2 mb-1">
							<FiActivity className="text-green-600 w-4 h-4" />
							<span className="text-xs font-semibold text-foreground">Global Status</span>
						</div>
						<p className="text-sm text-muted-foreground pl-6">Always Busy</p>
					</div>

					<div className="bg-accent/30 rounded-lg p-3 border border-accent/50">
						<div className="flex items-center gap-2 mb-1">
							<FiServer className="text-blue-600 w-4 h-4" />
							<span className="text-xs font-semibold text-foreground">Machines</span>
						</div>
						<div className="flex items-center justify-between pl-6">
							<p className="text-sm text-muted-foreground">17/31 Online</p>
							<div className="flex gap-1">
								<div className="w-2 h-2 rounded-full bg-success" />
								<div className="w-2 h-2 rounded-full bg-success" />
								<div className="w-2 h-2 rounded-full bg-neutral" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<nav className="flex-1 overflow-y-auto p-3">
				<ul className="space-y-6">
					{INTERNAL_SIDEBAR_ITEMS.map((category) => (
						<li key={category.title}>
							<h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
								{category.title}
							</h3>
							<div className="space-y-3">
								{category.list.map((item: TileProps) => (
									<Suspense fallback={<Skeleton className="w-full h-10" />} key={item.title}>
										<div onClick={() => setMobileOpen(false)}>
											<RenderTile {...item} {...tileClassValues} />
										</div>
									</Suspense>
								))}
							</div>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);

	return (
		<>
			{mobileOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black/50 z-40"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			<aside
				className={`
					fixed lg:sticky top-0 left-0 z-40 h-screen w-64
					bg-background border-r border-accent/50
					transform transition-transform duration-300 ease-in-out
					${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
				`}
			>
				<button
					type="button"
					className="lg:hidden absolute top-4 -right-12 p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors shadow-lg"
					onClick={() => setMobileOpen(!mobileOpen)}
					aria-label="Toggle sidebar"
				>
					{mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
				</button>
				<SidebarContent />
			</aside>
		</>
	);
};

export { Sidebar };
