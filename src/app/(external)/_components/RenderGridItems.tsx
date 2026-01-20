import { Fragment } from "react";
import { GridItem } from "@/components/generic/GridItem";
import { EXTERNAL_MENU_ITEMS, type ExternalMenuItem } from "@/config/external/headerbar-config";
import { PATHS } from "@/constants/paths";
import { GLOW_EFFECT_DEFAULTS } from "@/config/glow-effects";

export interface RenderGridItemsProps {
	title: string;
	preLinkContent: string;
	postLinkContent: string;
	tieInfo?: Pick<ExternalMenuItem, "path">;
}

const gridItemData: RenderGridItemsProps[] = [
	{
		title: "Submit Documents",
		preLinkContent: "Upload files via the ",
		postLinkContent: " for automated processing.",
		tieInfo: {
			path: PATHS.UPLOAD_PORTAL,
		},
	},

	{
		title: "Track Progress",
		preLinkContent: "Monitor queues and workloads on the ",
		postLinkContent: ".",
		tieInfo: {
			path: PATHS.STATISTICS,
		},
	},

	{
		title: "Stay Informed",
		preLinkContent: "Check the ",
		postLinkContent: " for updates on active issues.",
		tieInfo: {
			path: PATHS.NEWS,
		},
	},

	{
		title: "Get Support",
		preLinkContent: "Reach out via the ",
		postLinkContent: " for assistance.",
		tieInfo: {
			path: PATHS.CONTACT,
		},
	},
];

export const RenderGridItems = () => {
	const mergedItemData = gridItemData.map((item) => {
		const p =
			EXTERNAL_MENU_ITEMS.find((menuItem) => menuItem.path === item.tieInfo?.path)?.path || "#";
		const ico =
			EXTERNAL_MENU_ITEMS.find((menuItem) => menuItem.path === item.tieInfo?.path)?.icon ||
			Fragment.bind(null);
		return {
			path: p,
			icon: ico,
			...item,
		};
	});

	return (
		<div className="mt-8 sm:mt-12 w-dvw max-w-full px-4 pointer-events-auto">
			<ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{gridItemData.map((item, index) => (
					<GridItem
						key={`${index}__grid_item_${item.tieInfo?.path || item.title}`}
						data={mergedItemData[index]}
						glowingEffectProps={GLOW_EFFECT_DEFAULTS}
					/>
				))}
			</ul>
		</div>
	);
};
