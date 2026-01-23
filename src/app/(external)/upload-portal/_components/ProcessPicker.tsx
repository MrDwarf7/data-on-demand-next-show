"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { DataItemsProps } from "@/types/local";
import { ProcessPickerSkeleton } from "./Skeletons";
import { UploadPortalPagePropsResolved } from "../page";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ProcessPickerProps {
	// selectedFilesCount: number;
	processList: DataItemsProps[];
	selectedProcess: UploadPortalPagePropsResolved["process"];
}

export const ProcessPicker = ({ processList, selectedProcess }: ProcessPickerProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleProcessChange = (value: string) => {
		const params = new URLSearchParams();
		params.set("process", value);
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	};

	// const [processPickerOpen, setProcessPickerOpen] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);
	//
	// const searchParams = useSearchParams();
	// const selectedProcess = searchParams.get("process");
	// const hasProcessSelected = !!selectedProcess;
	//
	// const processPickerItems = useProcesses();
	// const pushProcess = usePushFrom("process");

	// Simulate loading state for better UX
	// TODO: [backend] : can be removed when processes are fetched from backend (async anyway)
	// useEffect(() => {
	// 	if (processPickerItems.length > 0) {
	// 		// Small delay to show loading state briefly for polished feel
	// 		const timer = setTimeout(() => setIsLoading(false), 100);
	// 		return () => clearTimeout(timer);
	// 	}
	// }, [processPickerItems.length]);
	//
	// const selectHandler = useCallback(
	// 	async (item: DataItemsProps) => {
	// 		pushProcess(item.value);
	// 		setProcessPickerOpen(false);
	// 	},
	// 	[pushProcess]
	// );

	// const variant = selectedFilesCount > 0 && !hasProcessSelected ? "border-destructive" : "";
	//
	// // Show loading skeleton
	// if (isLoading || !processPickerItems.length) {
	// 	return <ProcessPickerSkeleton />;
	// }

	return (
		<div className={cn("justify-between w-full sm:w-80", "border rounded-md")}>
			<label htmlFor="process-picker" className="text-sm font-medium mb-1 block px-2 pt-2">
				Select Process
			</label>
			<Select value={selectedProcess || ""} onValueChange={handleProcessChange}>
				<SelectTrigger id="process-picker">
					<SelectValue placeholder="Select a process..." />
				</SelectTrigger>
				<SelectContent>
					{processList.map((item) => (
						<SelectItem key={item.value} value={item.value}>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);

	// return (
	// 	<div className={cn("justify-between w-full sm:w-80", "border rounded-md")}>
	// 		<DropdownMenu onOpenChange={() => {}}>
	// 			<DropdownMenuTrigger asChild>
	// 				<Button
	// 					className={cn("w-full justify-between", !selectedProcess && "text-muted-foreground")}
	// 					role="combobox"
	// 					variant="outline"
	// 				>
	// 					<span className="text-xs justify-center">
	// 						{selectedProcess
	// 							? processList.find((item) => item.value === selectedProcess)?.label
	// 							: "Select a process..."}
	// 					</span>
	// 					<FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
	// 				</Button>
	// 			</DropdownMenuTrigger>
	//
	// 			<DropdownMenuContent className="w-full p-0">
	//
	// 				<Command>
	// 					<CommandInput autoFocus placeholder="Select a process" />
	// 					<ScrollArea className="h-80 rounded-md border">
	// 						<CommandEmpty>No process found.</CommandEmpty>
	//
	// 						<CommandGroup heading="Processes">
	// 							{processPickerItems.map((item) => (
	// 								<CommandItem
	// 									className="hover:cursor-pointer gap-y-1"
	// 									key={item.label}
	// 									onSelect={() => selectHandler(item)}
	// 									onClick={() => selectHandler(item)}
	// 									value={item.label}
	// 									suppressHydrationWarning
	// 								>
	// 									{item.label}
	// 								</CommandItem>
	// 							))}
	// 						</CommandGroup>
	// 					</ScrollArea>
	// 				</Command>
	// 			</DropdownMenuContent>
	// 		</DropdownMenu>
	// 	</div>
	// );
};
