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

			<CreateNewsForm />
		</div>
	);
}
