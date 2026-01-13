import type React from "react";
import { ShadCNThemeProvider } from "@/components/ThemeProvider";

export default function ProviderWrapper({ children }: React.PropsWithChildren) {
	return (
		<ShadCNThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem={true}
			disableTransitionOnChange
		>
			{children}
		</ShadCNThemeProvider>
	);
}
