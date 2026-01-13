import { FiUploadCloud } from "react-icons/fi";
import { TabsContent } from "@/components/ui/tabs";
import type { UploadPortalTabs } from "@/types/local";

const TabsContentHumans = ({ ...props }: Partial<UploadPortalTabs>) => {
	const { singleKey: keyValue } = props;

	return (
		<TabsContent value={keyValue as string} className="mt-6">
			<div className="mb-8">
				<div
					className="
						relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer
						transition-all duration-300 ease-in-out
						border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600
						hover:bg-accent/10
					"
				>
					{/* Form for humans to upload data - server action can be added here */}
					<FiUploadCloud className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
					<h3 className="text-xl font-semibold text-foreground mb-2">Drag & drop files here</h3>
					<p className="text-muted-foreground mb-4">or click to browse from your computer</p>
					<p className="text-sm text-muted-foreground">
						Supported formats: PDF, DOC, DOCX, XLS, XLSX
					</p>
				</div>
			</div>
		</TabsContent>
	);
};

export { TabsContentHumans };
