"use client";

import { useState } from "react";
import { FiEye, FiImage, FiSend } from "react-icons/fi";
import {
	FORM_CONFIG,
	NEWS_CATEGORIES,
	NEWS_PRIORITIES,
} from "@/config/internal/create-news-config";
import { getPriorityPreviewClass } from "@/lib/news-utils";
import { createNews } from "../actions";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// TODO: [perf] : move to server action form handling
export function CreateNewsForm() {
	// TODO: [performance] : We should be using actionstate or reducer or formdata->server action
	// this is a lot of state for a fairly simple form
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [priority, setPriority] = useState("normal");
	const [category, setCategory] = useState("announcement");
	const [preview, setPreview] = useState(false);

	return (
		<>
			<form action={createNews} className="space-y-6">
				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 space-y-6">
					{/* <div> */}
					<Field>
						<FieldLabel htmlFor="input-field-title">Title</FieldLabel>
						<Input id="input-field-title" type="text" placeholder={FORM_CONFIG.titlePlaceholder} />
						<FieldDescription>Choose a unique username for your account.</FieldDescription>
					</Field>

					{/* <label className="block text-sm font-medium text-foreground mb-2">Title</label> */}
					{/* <input */}
					{/* 	type="text" */}
					{/* 	name="title" */}
					{/* 	value={title} */}
					{/* 	onChange={(e) => setTitle(e.target.value)} */}
					{/* 	placeholder={FORM_CONFIG.titlePlaceholder} */}
					{/* 	className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground" */}
					{/* 	required */}
					{/* /> */}
					{/* </div> */}

					<div className="grid grid-cols-2 gap-4">
						<div>
							{/* <label className="block text-sm font-medium text-foreground mb-2">Category</label> */}
							<Label className="block text-sm font-medium text-foreground mb-2">Category</Label>
							<Select
								required={true}
								defaultValue={category}
								onValueChange={(value) => setCategory(value)}
								value={category}
							>
								<SelectTrigger className="w-full mb-2">
									<SelectValue placeholder="Select a category..." />
								</SelectTrigger>
								<SelectContent className="w-full p-1">
									{NEWS_CATEGORIES.map((cat) => (
										<SelectItem key={cat.value} value={cat.value}>
											{cat.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							{/* <select */}
							{/* 	name="category" */}
							{/* 	value={category} */}
							{/* 	onChange={(e) => setCategory(e.target.value)} */}
							{/* 	className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground" */}
							{/* > */}
							{/* 	{NEWS_CATEGORIES.map((cat) => ( */}
							{/* 		<option key={cat.value} value={cat.value}> */}
							{/* 			{cat.label} */}
							{/* 		</option> */}
							{/* 	))} */}
							{/* </select> */}
						</div>

						<div>
							<Label className="block text-sm font-medium text-foreground mb-2">Priority</Label>

							<Select
								required={true}
								defaultValue={priority}
								onValueChange={(value) => setCategory(value)}
								value={priority}
							>
								<SelectTrigger className="w-full mb-2">
									<SelectValue placeholder="Select a category..." />
								</SelectTrigger>
								<SelectContent className="w-full p-1">
									{NEWS_PRIORITIES.map((prio) => (
										<SelectItem key={prio.value} value={prio.value}>
											{prio.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* <div> */}
					<Field>
						<FieldLabel
							className="block text-sm font-medium text-foreground mb-1"
							htmlFor="textarea-message"
						>
							Content
						</FieldLabel>
						<FieldDescription className="mb-2">
							Enter the main content of your news post here.
						</FieldDescription>
						<Textarea
							name="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={FORM_CONFIG.contentRows}
							className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none"
							required
							id="textarea-message"
							placeholder={FORM_CONFIG.contentPlaceholder}
						/>
					</Field>

					{/* <label className="block text-sm font-medium text-foreground mb-2">Content</label> */}
					{/* <Textarea */}
					{/* 	name="content" */}
					{/* 	value={content} */}
					{/* 	onChange={(e) => setContent(e.target.value)} */}
					{/* 	placeholder={FORM_CONFIG.contentPlaceholder} */}
					{/* 	rows={FORM_CONFIG.contentRows} */}
					{/* 	className="w-full px-4 py-3 rounded-lg bg-background border border-accent/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-foreground placeholder:text-muted-foreground resize-none" */}
					{/* 	required */}
					{/* /> */}

					<Label className="block text-sm font-medium text-foreground mb-2 mt-4">
						{content.length} characters
					</Label>
					{/* <p className="text-xs text-muted-foreground mt-2">{content.length} characters</p> */}
					{/* </div> */}

					<div className="border-2 border-dashed border-accent/50 rounded-lg p-6 text-center hover:border-accent transition-all cursor-pointer">
						<FiImage className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
						<p className="text-sm font-medium text-foreground">{FORM_CONFIG.imageUploadText}</p>
						<p className="text-xs text-muted-foreground mt-1">{FORM_CONFIG.imageDragDropText}</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-3">
					<Button
						type="button"
						onClick={() => setPreview(!preview)}
						className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/80 text-foreground rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
					>
						<FiEye className="w-4 h-4" />
						{preview ? "Edit Mode" : "Preview"}
					</Button>

					<Button
						type="submit"
						className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
					>
						<FiSend className="w-4 h-4" />
						Publish News
					</Button>
				</div>
			</form>

			{preview && (
				<div className="bg-accent/30 border border-accent/50 rounded-xl p-6 mt-6">
					<h3 className="font-semibold text-foreground mb-4">Preview</h3>
					<div className="bg-background rounded-lg p-4 border border-accent/30">
						<div className="flex items-center gap-2 mb-2">
							<span
								className={`px-2 py-1 rounded text-xs font-medium ${getPriorityPreviewClass(priority)}`}
							>
								{priority.toUpperCase()}
							</span>
							<span className="text-xs text-muted-foreground">{category}</span>
						</div>
						<h4 className="font-bold text-foreground mb-2">{title || "Your title here..."}</h4>
						<p className="text-sm text-muted-foreground whitespace-pre-wrap">
							{content || "Your content here..."}
						</p>
					</div>
				</div>
			)}
		</>
	);
}
