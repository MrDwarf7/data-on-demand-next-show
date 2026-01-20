import { connection } from "next/server";
import { Suspense } from "react";
import { UploadSection } from "@/components/UploadSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useFileStats } from "@/hooks/use-file-flow";
import { FileHistory } from "./_components/FileHistory";

export default async function FileFlowPage() {
	// TODO: [refactor] : This causes dynamic rendering, we'd prefer to get the searchParams here, then pass them down,
	// however... It's the client that 'picks' a process from the ProcessPicker component, that then used router.replace(...)
	// to move the client.
	// [see](https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout)
	//
	await connection();

	const fileStats = useFileStats();

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-400 mx-auto space-y-6">
			<h1 className="text-2xl sm:text-3xl font-bold text-foreground">External File Flow</h1>
			<p className="text-sm text-muted-foreground mt-1">
				Manage and monitor external file uploads and processing
			</p>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{fileStats.map((stat) => (
					<div
						key={stat.lv.label}
						className={`bg-linear-to-br ${stat.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
					>
						<div className={`${stat.classNameColor} mb-3`}>
							{stat.icon && <stat.icon className="w-8 h-8" />}
						</div>
						<p className="text-sm font-medium text-muted-foreground mb-1">{stat.lv.label}</p>
						<p className={`text-3xl font-bold ${stat.classNameColor}`}>{stat.lv.value}</p>
					</div>
				))}
			</div>

			<Suspense fallback={<Skeleton className="w-full h-4" />}>
				<UploadSection showAutomationTab={false} />
			</Suspense>

			<FileHistory />
		</div>
	);
}
