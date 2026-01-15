import { FiAlertCircle, FiEdit } from "react-icons/fi";
import { FORM_CONFIG, PUBLISHING_TIPS } from "@/config/internal/create-news-config";
import { CreateNewsForm } from "./_components/CreateNewsForm";

export default function CreateNewsPage() {
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
					<CreateNewsForm />
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
					</div>
				</div>
			</div>
		</div>
	);
}
