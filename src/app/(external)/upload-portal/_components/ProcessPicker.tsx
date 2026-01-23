"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
import { useProcesses } from "@/hooks/use-processes";
import { usePushFrom } from "@/lib/push-from-t";
import { cn } from "@/lib/utils";
import type { DataItemsProps } from "@/types/local";
import { ProcessPickerSkeleton } from "./Skeletons";

interface ProcessPickerProps {
	selectedFilesCount: number;
}

export const ProcessPicker = ({ selectedFilesCount }: ProcessPickerProps) => {
	const [processPickerOpen, setProcessPickerOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const searchParams = useSearchParams();
	const selectedProcess = searchParams.get("process");
	const hasProcessSelected = !!selectedProcess;

	const processPickerItems = useProcesses();
	const pushProcess = usePushFrom("process");

	// Simulate loading state for better UX
	// TODO: [backend] : can be removed when processes are fetched from backend (async anyway)
	useEffect(() => {
		if (processPickerItems.length > 0) {
			// Small delay to show loading state briefly for polished feel
			const timer = setTimeout(() => setIsLoading(false), 100);
			return () => clearTimeout(timer);
		}
	}, [processPickerItems.length]);

	const selectHandler = useCallback(
		async (item: DataItemsProps) => {
			pushProcess(item.value);
			setProcessPickerOpen(false);
		},
		[pushProcess]
	);

	const variant = selectedFilesCount > 0 && !hasProcessSelected ? "border-destructive" : "";

	// Show loading skeleton
	if (isLoading || !processPickerItems.length) {
		return <ProcessPickerSkeleton />;
	}

	return (
		<div className={cn("justify-between w-full sm:w-80", "border rounded-md", variant)}>
			<DropdownMenu onOpenChange={setProcessPickerOpen} open={processPickerOpen}>
				<DropdownMenuTrigger asChild>
					<Button
						className={cn("w-full justify-between", !selectedProcess && "text-muted-foreground")}
						role="combobox"
						variant="outline"
					>
						<span className="text-xs justify-center">
							{selectedProcess
								? processPickerItems.find((item) => item.value === selectedProcess)?.label
								: "Select a process..."}
						</span>
						<FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="w-full p-0">
					<Command>
						<CommandInput autoFocus placeholder="Select a process" />
						<ScrollArea className="h-80 rounded-md border">
							<CommandEmpty>No process found.</CommandEmpty>

							<CommandGroup heading="Processes">
								{processPickerItems.map((item) => (
									<CommandItem
										className="hover:cursor-pointer gap-y-1"
										key={item.label}
										onSelect={() => selectHandler(item)}
										onClick={() => selectHandler(item)}
										value={item.label}
										suppressHydrationWarning
									>
										{item.label}
									</CommandItem>
								))}
							</CommandGroup>
						</ScrollArea>
					</Command>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
