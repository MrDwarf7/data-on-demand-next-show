"use client";
import type React from "react";

function NextUiComponentProvider({ children }: React.PropsWithChildren) {
	// const router = useRouter();

	return <>{children}</>;
}

export default NextUiComponentProvider;
