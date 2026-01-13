import type React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function ContactLayout({ children }: React.PropsWithChildren) {
	return (
		//
		<MaxWidthWrapper>{children}</MaxWidthWrapper>
	);
}
