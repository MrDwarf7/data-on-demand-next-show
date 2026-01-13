import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import type React from "react";

export default function StatisticsLayout({ children }: React.PropsWithChildren) {
	return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
