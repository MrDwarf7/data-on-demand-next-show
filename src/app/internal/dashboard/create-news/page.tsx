"use client";

// TODO: : We know how to handle this via forms api correctly (+validation -> (later)>> hook->backend)
// We don't need useState and such here at all

import { useState } from "react";
import { FiEdit, FiEye, FiSend, FiAlertCircle, FiImage } from "react-icons/fi";
import {
	NEWS_CATEGORIES,
	NEWS_PRIORITIES,
	PUBLISHING_TIPS,
	FORM_CONFIG,
} from "@/config/internal/create-news-config";

export default function CreateNewsPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [priority, setPriority] = useState("normal");
	const [category, setCategory] = useState("announcement");
	const [preview, setPreview] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log({ title, content, priority, category });
	};

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
			<div className="mb-6">
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">Create News Post</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Publish updates and announcements for your users
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 space-y-6">
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Title</label>
								<input
									type="text"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder={FORM_CONFIG.titlePlaceholder}
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground"
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">Category</label>
									<select
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
									>
										{NEWS_CATEGORIES.map((cat) => (
											<option key={cat.value} value={cat.value}>
												{cat.label}
											</option>
										))}
									</select>
								</div>

								<div>
									<label className="block text-sm font-medium text-foreground mb-2">Priority</label>
									<select
										value={priority}
										onChange={(e) => setPriority(e.target.value)}
										className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground"
									>
										{NEWS_PRIORITIES.map((prio) => (
											<option key={prio.value} value={prio.value}>
												{prio.label}
											</option>
										))}
									</select>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Content</label>
								<textarea
									value={content}
									onChange={(e) => setContent(e.target.value)}
									placeholder={FORM_CONFIG.contentPlaceholder}
									rows={FORM_CONFIG.contentRows}
									className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
									required
								/>
								<p className="text-xs text-muted-foreground mt-2">{content.length} characters</p>
							</div>

							<div className="border-2 border-dashed border-accent/50 rounded-lg p-6 text-center hover:border-accent transition-all cursor-pointer">
								<FiImage className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
								<p className="text-sm font-medium text-foreground">{FORM_CONFIG.imageUploadText}</p>
								<p className="text-xs text-muted-foreground mt-1">
									{FORM_CONFIG.imageDragDropText}
								</p>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-3">
							<button
								type="submit"
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
							>
								<FiSend className="w-4 h-4" />
								Publish News
							</button>
							<button
								type="button"
								onClick={() => setPreview(!preview)}
								className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-lg font-medium transition-all"
							>
								<FiEye className="w-4 h-4" />
								{preview ? "Edit Mode" : "Preview"}
							</button>
						</div>
					</form>
				</div>

				<div className="lg:col-span-1">
					<div className="sticky top-24 space-y-4">
						<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
							<div className="flex items-center gap-2 mb-4">
								<FiEdit className="w-5 h-5 text-blue-600" />
								<h3 className="font-semibold text-foreground">Publishing Tips</h3>
							</div>
							<ul className="space-y-3 text-sm text-muted-foreground">
								{PUBLISHING_TIPS.map((tip) => (
									<li key={tip} className="flex items-start gap-2">
										<span className="text-blue-600 mt-0.5">•</span>
										<span>{tip}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
							<div className="flex items-center gap-2 mb-3">
								<FiAlertCircle className="w-5 h-5 text-orange-600" />
								<h3 className="font-semibold text-foreground">Note</h3>
							</div>
							<p className="text-sm text-muted-foreground">{FORM_CONFIG.noteText}</p>
						</div>

						{preview && (
							<div className="bg-accent/30 border border-accent/50 rounded-xl p-6">
								<h3 className="font-semibold text-foreground mb-4">Preview</h3>
								<div className="bg-background rounded-lg p-4 border border-accent/30">
									<div className="flex items-center gap-2 mb-2">
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${
												priority === "urgent"
													? "bg-red-500/20 text-red-600"
													: priority === "high"
														? "bg-orange-500/20 text-orange-600"
														: "bg-blue-500/20 text-blue-600"
											}`}
										>
											{priority.toUpperCase()}
										</span>
										<span className="text-xs text-muted-foreground">{category}</span>
									</div>
									<h4 className="font-bold text-foreground mb-2">
										{title || "Your title here..."}
									</h4>
									<p className="text-sm text-muted-foreground whitespace-pre-wrap">
										{content || "Your content here..."}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
