import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiTag, FiUser } from "react-icons/fi";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { NEWS_POSTS } from "@/config/external/news-config";
import { getCategoryColor, getPriorityBadge } from "@/lib/news-utils";

export default async function DynamicNewsPage({ params }: { params: { newsId: string } }) {
	const { newsId } = await params;
	const nId = Number(newsId);

	// TODO: move to hook->backend call from db
	const post = NEWS_POSTS.find((p) => p.id === nId);

	if (!post) {
		return (
			<MaxWidthWrapper className="py-12">
				<div className="max-w-4xl mx-auto text-center">
					<div className="bg-accent/30 border border-accent/50 rounded-xl p-12">
						<h1 className="text-3xl font-bold text-foreground mb-4">News Post Not Found</h1>
						<p className="text-muted-foreground mb-6">
							The news post you&apos;re looking for doesn&apos;t exist or has been removed.
						</p>
						<Link
							href="/news"
							className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
						>
							<FiArrowLeft className="w-4 h-4" />
							Back to News
						</Link>
					</div>
				</div>
			</MaxWidthWrapper>
		);
	}

	return (
		<MaxWidthWrapper className="py-8 sm:py-12">
			<div className="max-w-4xl mx-auto">
				<Link
					href="/news"
					className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium transition-colors mb-8"
				>
					<FiArrowLeft className="w-4 h-4" />
					Back to All News
				</Link>

				<article className="bg-accent/30 border border-accent/50 rounded-xl p-6 sm:p-8 md:p-10">
					<div className="flex flex-wrap items-center gap-3 mb-6">
						<span
							className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
								post.priority
							)}`}
						>
							{post.priority.toUpperCase()}
						</span>
						<span className={`text-xs font-medium uppercase ${getCategoryColor(post.category)}`}>
							{post.category}
						</span>
					</div>

					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
						{post.title}
					</h1>

					<div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-accent/50">
						<div className="flex items-center gap-2">
							<FiCalendar className="w-4 h-4" />
							<span>{post.date}</span>
						</div>
						<div className="flex items-center gap-2">
							<FiUser className="w-4 h-4" />
							<span>{post.author}</span>
						</div>
						<div className="flex items-center gap-2">
							<FiTag className="w-4 h-4" />
							<span className="capitalize">{post.category}</span>
						</div>
					</div>

					{post.blurb && (
						<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 sm:p-6 mb-8">
							<p className="text-base sm:text-lg font-medium text-foreground">{post.blurb}</p>
						</div>
					)}

					<div className="prose prose-sm sm:prose-base max-w-none">
						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
							{post.content}
						</p>
					</div>

					<div className="mt-10 pt-8 border-t border-accent/50">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<h3 className="font-semibold text-foreground mb-1">Stay Updated</h3>
								<p className="text-sm text-muted-foreground">
									Subscribe to get notifications about new posts
								</p>
							</div>
							<button
								type="button"
								className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg whitespace-nowrap"
							>
								Subscribe Now
							</button>
						</div>
					</div>
				</article>

				<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
					<Link
						href="/news"
						className="bg-accent/30 border border-accent/50 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all text-center"
					>
						<h3 className="font-semibold text-foreground mb-2">Browse All News</h3>
						<p className="text-sm text-muted-foreground">View all announcements and updates</p>
					</Link>
					<Link
						href="/contact"
						className="bg-accent/30 border border-accent/50 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all text-center"
					>
						<h3 className="font-semibold text-foreground mb-2">Contact Support</h3>
						<p className="text-sm text-muted-foreground">Have questions? Get in touch with us</p>
					</Link>
				</div>
			</div>
		</MaxWidthWrapper>
	);
}
