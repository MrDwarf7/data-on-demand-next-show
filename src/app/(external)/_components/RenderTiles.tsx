"use client";

import { tileClassValues } from "@/app/(external)/_components/HeaderBar";
import { RenderTile } from "@/components/generic/RenderTile";
import {
	EXTERNAL_MENU_ITEMS,
	EXTERNAL_MENU_ITEMS_HIDDEN_PATHS,
} from "@/config/external/headerbar-config";

// export const tileClassValues = {
// 	className: "gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
// 	classNameActive: "bg-ring shadow-sm text-foreground",
// 	classNameNotActive: "bg-accent/50 hover:bg-ring/80 text-foreground",
// };

export const RenderTiles = (): React.ReactNode[] | React.JSX.Element[] =>
	EXTERNAL_MENU_ITEMS.filter(
		(item) => item.path && !EXTERNAL_MENU_ITEMS_HIDDEN_PATHS.includes(item.path)
	).map((item) => (
		<RenderTile
			key={item.title}
			icon={item.icon}
			path={item.path}
			title={item.title}
			{...tileClassValues}
		/>
	));
