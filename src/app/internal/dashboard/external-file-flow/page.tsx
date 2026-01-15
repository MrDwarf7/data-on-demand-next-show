import { ProcessPicker } from "@/app/(external)/upload-portal/_components/ProcessPicker";
import { useFileStats } from "@/hooks/use-file-flow";
import { FileHistory } from "./_components/FileHistory";
import { UploadArea } from "./_components/UploadArea";

export default function FileFlowPage() {
	const fileStats = useFileStats();

	return (
		<div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold text-foreground">External File Flow</h1>
				<p className="text-sm text-muted-foreground mt-1">
					Manage and monitor external file uploads and processing
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{fileStats.map((stat) => (
					<div
						key={stat.lv.label}
						className={`bg-gradient-to-br ${stat.classNameBg} border border-accent/50 rounded-xl p-4 sm:p-6`}
					>
						<div className={`${stat.classNameColor} mb-3`}>
							{stat.icon && <stat.icon className="w-8 h-8" />}
						</div>
						<p className="text-sm font-medium text-muted-foreground mb-1">{stat.lv.label}</p>
						<p className={`text-3xl font-bold ${stat.classNameColor}`}>{stat.lv.value}</p>
					</div>
				))}
			</div>

			<div className="flex justify-end">
				<ProcessPicker className="w-full sm:w-80" />
			</div>

			<UploadArea />

			<FileHistory />
		</div>
	);
}
