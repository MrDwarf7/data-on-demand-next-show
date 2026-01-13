import { GridItem } from "@/components/generic/GridItem";
import { EXTERNAL_MENU_ITEMS, type ExternalMenuItem } from "@/config/external/headerbar-config";

interface WantedAttributes {
	icon: keyof ExternalMenuItem;
	path: keyof ExternalMenuItem;
}

export interface RenderGridItemsProps extends Omit<WantedAttributes, "icon" | "path"> {
	title: string;
	preLinkContent: string;
	postLinkContent: string;

	// icon?: typeof EXTERNAL_MENU_ITEMS | null;
	// path?: typeof EXTERNAL_MENU_ITEMS | null;
	tieInfo?: Pick<ExternalMenuItem, "path" | "icon">;
	// linkHref: string;
	// icon: JSX.Element;
}

const gridItemData: RenderGridItemsProps[] = [
	// TODO: Have this (file) intake EXTERNAL_MENU_ITEMS and map over it
	// in order to fill in the items we should really be getting from there for consistency.
	{
		title: "Submit Documents",
		preLinkContent: "Upload files via the ",
		postLinkContent: " for automated processing.",
		tieInfo: {
			path: "/upload-portal",
		},
		//
		// linkHref: "/upload-portal",
		// path: null,
		// icon: <FiUpload className="h-4 w-4 text-black dark:text-neutral-400" />,
	},

	{
		title: "Track Progress",
		preLinkContent: "Monitor queues and workloads on the ",
		postLinkContent: ".",
		tieInfo: {
			path: "/statistics",
		},
		//
		// linkHref: "/upload-portal",
		// icon: <FiBarChart2 className="h-4 w-4 text-black dark:text-neutral-400" />,
	},

	{
		title: "Stay Informed",
		preLinkContent: "Check the ",
		postLinkContent: " for updates on active issues.",
		tieInfo: {
			path: "/news",
		},

		// linkHref: "/news",
		// icon: <BiNews className="h-4 w-4 text-black dark:text-neutral-400" />,
	},

	{
		title: "Get Support",
		preLinkContent: "Reach out via the ",
		postLinkContent: " for assistance.",
		tieInfo: {
			path: "/contact",
		},

		//
		// icon: <FiMessageCircle className="h-4 w-4 text-black dark:text-neutral-400" />,
		//
		// linkHref: "/contact",
	},
];

export const RenderGridItems = () => {
	const glowingEffectProps = {
		spread: 40,
		glow: true,
		disabled: false,
		proximity: 64,
		inactiveZone: 0.01,
	};

	const mergedItemData = gridItemData.map((item) => {
		const p =
			EXTERNAL_MENU_ITEMS.find((menuItem) => menuItem.path === item.tieInfo?.path)?.path || "#";
		const ico = EXTERNAL_MENU_ITEMS.find((menuItem) => menuItem.path === item.tieInfo?.path)?.icon;

		return {
			// path: EXTERNAL_MENU_ITEMS.find((menuItem) => menuItem.title === item.title)?.path || "#",
			// icon: item.icon,
			// tieInfo: {
			// 	path: p,
			// 	icon: ico,
			// },

			path: p,
			icon: ico,
			...item,
		};
	});

	return (
		<div className="mt-8 sm:mt-12 w-dvw max-w-6xl px-4 pointer-events-auto">
			<ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{gridItemData.map((item, index) => (
					<GridItem
						key={`${index}__grid_item_${item.tieInfo?.path || item.title}`}
						data={mergedItemData[index]}
						glowingEffectProps={glowingEffectProps}
					/>
				))}
			</ul>
		</div>
	);
};
