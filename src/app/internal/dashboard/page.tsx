import Link from "next/link";
import { AiOutlineBarChart, AiOutlineInteraction } from "react-icons/ai";
import { FiEdit, FiSettings } from "react-icons/fi";
import { MdUploadFile } from "react-icons/md";
import type { ClassNameDataWithIcon } from "@/config/external/statistics-config";

interface DashboardCard extends Partial<ClassNameDataWithIcon> {
	title: string;
	description: string;
	path: string;
	iconColor: string;
}

export default function DashboardPage() {
	// TODO: [consolidate paths] : Use same const array across application for paths
	const dashboardCards: DashboardCard[] = [
		{
			title: "Create News Post",
			description: "Publish news updates and announcements for users",
			path: "/internal/dashboard/create-news",
			icon: FiEdit,
			// <FiEdit className="w-8 h-8" />,
			classNameColor: "bg-info-20 hover:bg-info-30",
			iconColor: "text-info-foreground",
		},
		{
			title: "External File-Flow",
			description: "Manage and monitor external file uploads and processing",
			path: "/internal/dashboard/external-file-flow",
			// icon: <MdUploadFile className="w-8 h-8" />,
			icon: MdUploadFile,
			classNameColor: "bg-success-20 hover:bg-success-30",
			iconColor: "text-success-foreground",
		},
		{
			title: "Queue Data",
			description: "View and manage processing queues and job status",
			path: "/internal/dashboard/queue-data",
			// icon: <AiOutlineInteraction className="w-8 h-8" />,
			icon: AiOutlineInteraction,
			classNameColor: "bg-info-20 hover:bg-info-30",
			iconColor: "text-info-foreground",
		},
		{
			title: "Stats Overview",
			description: "Monitor system statistics and performance metrics",
			path: "/internal/dashboard/stats-overview",
			// icon: <AiOutlineBarChart className="w-8 h-8" />,
			icon: AiOutlineBarChart,
			classNameColor: "bg-warning-20 hover:bg-warning-30",
			iconColor: "text-warning-foreground",
		},
		{
			title: "Settings",
			description: "Configure your account and system preferences",
			path: "/internal/dashboard/user-settings",
			// icon: <FiSettings className="w-8 h-8" />,
			icon: FiSettings,
			classNameColor: "bg-neutral-20 hover:bg-neutral-30",
			iconColor: "text-neutral-foreground",
		},
	];

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
			<div className="mb-8 sm:mb-12">
				<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
					Dashboard
				</h1>
				<p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
					Welcome to the internal dashboard. Manage your automation workflows, monitor system
					status, and configure settings from here.
				</p>
			</div>

			<div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{dashboardCards.map((card) => (
					<Link
						key={card.path}
						href={card.path}
						className={`${card.classNameColor} border border-accent/50 rounded-lg p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] group`}
					>
						<div className="flex flex-col h-full">
							<div className={`${card.iconColor} mb-4 transition-transform duration-200`}>
								{card.icon && <card.icon className="w-8 h-8" />}
							</div>
							<h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
								{card.title}
							</h3>
							<p className="text-sm sm:text-base text-muted-foreground grow">{card.description}</p>
							<div className="mt-4 flex items-center text-sm font-medium text-blue-600">
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

			<div className="mt-8 sm:mt-12 bg-accent/30 border border-accent/50 rounded-lg p-5 sm:p-6 lg:p-8">
				<h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
					Quick Tips
				</h2>
				<div className="grid gap-4 sm:gap-6 md:grid-cols-2">
					<div>
						<h3 className="text-base sm:text-lg font-medium text-foreground mb-2">
							Getting Started
						</h3>
						<p className="text-sm text-muted-foreground">
							Use the sidebar to navigate between different sections. Each module provides specific
							tools for managing your automation workflows.
						</p>
					</div>
					<div>
						<h3 className="text-base sm:text-lg font-medium text-foreground mb-2">Need Help?</h3>
						<p className="text-sm text-muted-foreground">
							If you have questions or encounter issues, refer to the documentation or contact the
							support team for assistance.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
