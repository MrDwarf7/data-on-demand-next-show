"use client";
import Link from "next/link";
import { useState } from "react";
// import { useState } from "react";
import { FiArrowRight, FiCalendar, FiUser } from "react-icons/fi";
import { NEWS_CATEGORIES, NEWS_POSTS } from "@/config/external/news-config";
import { getCategoryColor, getPriorityBadge } from "@/lib/news-utils";

export const SelectedCategory = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const filteredPosts =
		selectedCategory === "all"
			? NEWS_POSTS
			: NEWS_POSTS.filter((post) => post.category === selectedCategory);

	return (
		<div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
			{NEWS_CATEGORIES.map((category) => (
				<button
					type="button"
					key={category.value}
					onClick={() => setSelectedCategory(category.value)}
					className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
						selectedCategory === category.value
							? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
							: "bg-accent/50 text-foreground hover:bg-accent"
					}`}
				>
					{category.label}
				</button>
			))}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 w-full">
				{filteredPosts.map((post) => (
					<Link
						key={post.id}
						href={`/news/${post.id}`}
						className="group flex flex-col bg-accent/20 border border-accent rounded-2xl p-6 hover:border-blue-500/50 hover:bg-accent/30 transition-all"
					>
						<div className="flex items-center justify-between mb-4">
							<span
								className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(post.priority)}`}
							>
								{post.priority.toUpperCase()}
							</span>
							<span className={`text-xs font-medium uppercase ${getCategoryColor(post.category)}`}>
								{post.category}
							</span>
						</div>

						<h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
							{post.title}
						</h3>

						<p className="text-sm text-muted-foreground mb-4 line-clamp-2 grow">
							{post.blurb || post.content}
						</p>

						<div className="flex align-middle items-center justify-between text-xs text-muted-foreground pt-4 border-t border-accent mt-auto ">
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-1">
									<FiCalendar className="w-3 h-3" />
									<span>{post.date}</span>
								</div>
								<div className="flex items-center gap-1">
									<FiUser className="w-3 h-3" />
									<span className=" justify-center items-center ">{post.author}</span>
								</div>
							</div>
							<div className=" flex items-center gap-1 text-blue-600 font-medium group-hover:gap-2 transition-all">
								<span>Read</span>
								<FiArrowRight className="w-4 h-4" />
							</div>
						</div>

						{/* FINISH card footer */}
					</Link>
				))}
			</div>

			{filteredPosts.length === 0 && (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No news posts found for this category</p>
				</div>
			)}
		</div>
	);
};
