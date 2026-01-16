"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import * as z from "zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProcesses } from "@/hooks/use-processes";
import { cn } from "@/lib/utils";
import type { DataItemsProps, ProcessPickerProps } from "@/types/local";

const formSchema = z.object({
	process: z.object({
		id: z.string().min(1, "Please select a process with an id."),
		name: z.string().min(1, "Please select a process with a name."),
	}),
});

const ProcessPicker = ({ ...props }: ProcessPickerProps) => {
	const { className, variant } = props;
	const processPickerItems = useProcesses();
	const [processPickerOpen, setProcessPickerOpen] = React.useState(false);
	const router = useRouter();
	const localSearchParams = useSearchParams();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			process: {
				id: "",
				name: "",
			},
		},
	});

	const selectHandler = React.useCallback(
		async (item: DataItemsProps) => {
			form.setValue("process", item);
			router.replace(`?process=${item.id}`, { scroll: false });
			setProcessPickerOpen(false);
		},
		[form, router]
	);

	const borderClass = variant === "outlined" ? "border-destructive" : "";

	return (
		<div className={cn(className, "border rounded-md", borderClass)}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(() => {
						selectHandler(form.getValues("process"));
					})}
				>
					<FormField
						control={form.control}
						name="process"
						render={({ field }) => (
							<FormItem>
								<DropdownMenu onOpenChange={setProcessPickerOpen} open={processPickerOpen}>
									<FormControl>
										<DropdownMenuTrigger asChild={true}>
											<Button
												className={cn(
													"w-full justify-between",
													!field.name && "text-muted-foreground"
												)}
												role="combobox"
												variant="outline"
											>
												<FormLabel className="text-xs justify-center">
													{localSearchParams.get("process")
														? processPickerItems.find(
																(indivListedItem) =>
																	indivListedItem.id === localSearchParams.get("process")
															)?.name
														: "Select a process..."}
												</FormLabel>
												<FaChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</DropdownMenuTrigger>
									</FormControl>

									<DropdownMenuContent className="w-full p-0">
										<Command>
											<CommandInput autoFocus={true} placeholder="Select a process" />
											<ScrollArea className="h-80 rounded-md border">
												<CommandEmpty>No process found.</CommandEmpty>

												<CommandGroup heading="Processes">
													{processPickerItems.map((indivListedItem) => (
														<CommandItem
															className="hover:cursor-pointer gap-y-1"
															itemType="submit"
															key={indivListedItem.id}
															onSelect={() => selectHandler(indivListedItem)}
															onClick={() => selectHandler(indivListedItem)}
															typeof="button"
															value={indivListedItem.name}
															suppressHydrationWarning
														>
															{indivListedItem.name}
														</CommandItem>
													))}
												</CommandGroup>
											</ScrollArea>
										</Command>
									</DropdownMenuContent>
								</DropdownMenu>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};

export { ProcessPicker };
