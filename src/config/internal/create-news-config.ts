import { NEWS_CATEGORIES } from "@/constants/news-categories";

export { NEWS_CATEGORIES };

import { PRIORITY_OPTIONS } from "@/constants/priorities";

export const NEWS_PRIORITIES = PRIORITY_OPTIONS;

export const PUBLISHING_TIPS = [
	"Keep titles concise and descriptive",
	"Use proper categorization for better organization",
	"Set appropriate priority levels",
	"Include relevant images when possible",
	"Preview before publishing",
];

export const FORM_CONFIG = {
	titlePlaceholder: "Enter news title...",
	contentPlaceholder: "Write your news content here...",
	contentRows: 12,
	imageUploadText: "Upload Image (Optional)",
	imageDragDropText: "Click to browse or drag and drop",
	noteText:
		"Published news will be immediately visible to all users. Make sure to review your content carefully.",
};
