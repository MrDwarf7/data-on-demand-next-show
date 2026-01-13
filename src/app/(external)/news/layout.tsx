import type React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function NewsLayout({ children }: React.PropsWithChildren) {
	return (
		//
		<MaxWidthWrapper className="overflow-hidden mt-6">
			{/*  */}
			{children}
			{/*  */}
		</MaxWidthWrapper>
	);
}
