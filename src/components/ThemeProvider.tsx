"use client";

// import type { ThemeProviderProps } from "next-themes/dist/types"; // Shadcn
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Shadcn
import type React from "react";

// function ShadCNThemeProvider({ children, ...props }: ThemeProviderProps & React.PropsWithChildren) {
export function ShadCNThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return (
		//
		<NextThemesProvider {...props}>
			{/*  */}
			{children}
			{/*  */}
		</NextThemesProvider>
		//
	);
}
