import { Skeleton } from "@/components/ui/skeleton";

export const ProcessPickerSkeleton = async () => {
	return (
		<div className="justify-between w-full sm:w-80 border rounded-md">
			<Skeleton className="h-10 w-full" />
		</div>
	);
};

export const UploadAreaSkeleton = async () => {
	return (
		<div className="mb-8">
			<Skeleton className="h-32 w-full rounded-2xl" />
		</div>
	);
};

export const FileListSkeleton = async () => {
	return (
		<div className="mb-8 bg-accent/20 border border-accent/50 rounded-xl p-6">
			<div className="flex items-center justify-between mb-4">
				<Skeleton className="h-6 w-48" />
				<Skeleton className="h-10 w-32" />
			</div>
			<div className="space-y-3">
				{["skeleton-1", "skeleton-2", "skeleton-3"].map((key) => (
					<div
						key={key}
						className="flex items-center gap-3 p-3 bg-background/50 rounded-lg border border-accent/30"
					>
						<Skeleton className="h-4 flex-1" />
						<Skeleton className="h-4 w-16" />
					</div>
				))}
			</div>
		</div>
	);
};

export const TabsContentLoading = async () => {
	return (
		<Skeleton>
			<div className="flex items-center justify-center py-12">
				<div className="text-center">
					<div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
					<p className="text-muted-foreground">Loading upload interface...</p>
				</div>
			</div>
		</Skeleton>
	);
};
