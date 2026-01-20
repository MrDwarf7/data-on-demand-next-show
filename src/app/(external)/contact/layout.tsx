import type React from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export default function ContactLayout({ children }: React.PropsWithChildren) {
	return <MaxWidthWrapper className="py-8 sm:py-12">{children}</MaxWidthWrapper>;
}
