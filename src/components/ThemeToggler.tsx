"use client";
import { useTheme } from "next-themes";
import type React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggler({
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	const { setTheme } = useTheme();

	return (
		<div className={className ? className : ""}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild={true}>
					<Button variant={"outline"} className="relative" size={"icon"}>
						<FiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setTheme("dark")} className="justify-between">
						Dark
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("light")} className="justify-between">
						Light
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
