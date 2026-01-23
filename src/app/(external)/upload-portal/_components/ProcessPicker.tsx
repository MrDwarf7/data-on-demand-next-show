"use client";

import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { DataItemsProps } from "@/types/local";
import type { UploadPortalPagePropsResolved } from "../page";

// import { cn } from "@/lib/utils";
// import { Input } from "@/components/ui/input";

// import { ProcessPickerSkeleton } from "./Skeletons";
// import { useCallback } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandInput,
// 	CommandItem,
// } from "@/components/ui/command";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ScrollArea } from "@/components/ui/scroll-area";

interface ProcessPickerProps {
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

	// // TODO: implement search filtering
	//
	// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	e.preventDefault();
	// 	const value = selectedProcess || "";
	// 	if (value) {
	// 		return processList.find((item) => item.value === value)?.label;
	// 	} else {
	// 		return "Select a process...";
	// 	}
	// };

	return (
		<div className={cn("flex flex-col items-center w-70 ml-auto my-4 mr-0 sm:mr-4")}>
			<label htmlFor="process-picker" className="text-sm font-medium block pb-2 text-center">
				Select Process
			</label>
			<Select
				required={true}
				defaultValue={selectedProcess || ""}
				onValueChange={handleProcessChange}
				value={selectedProcess || ""}
			>
				<SelectTrigger id="process-picker" className="w-full mb-2">
					<SelectValue placeholder="Select a process..." />
				</SelectTrigger>
				<SelectContent className="w-full p-1">
					<SelectGroup className="justify-center mb-2">
						{/* **** Search input goes here later **** */}
						{selectedProcess
							? processList.find((item) => item.value === selectedProcess)?.label
							: "Select a process..."}
					</SelectGroup>

					<ScrollArea className="w-full h-100 rounded-md">
						{processList.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</ScrollArea>
				</SelectContent>
			</Select>
		</div>
	);
};

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
