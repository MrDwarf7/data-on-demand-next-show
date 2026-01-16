import type React from "react";
import type { JSX } from "react/jsx-runtime";

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	path: string;
	// icon: React.ReactNode;
	icon?: JSX.Element;
	key?: React.Key;
}

// interface RenderTileProps extends TileProps {
// 	classNameAlways: string;
// 	classNameConditional: string;
// }

type ClickToCopySnippetProps = {
	className?: string;
	[key: string]: undefined | string | number | boolean | object | symbol | null;
	text: string;
};

type DataItemsProps = {
	id: string;
	name: string;
};

type ProcessPickerProps = {
	className?: string;
	searchParams?: {
		process: string | undefined;
		selectedTab: string | undefined;
	};
	onFilesSelected?: (files: File[]) => void;
	variant?: "hidden" | "outlined";
};

// Note on the tab themselves it will be prexied with "For {Option}"
type TabOptions = "humans" | "automations" | "SmartAutomation Robotics";

interface UploadPortalTabs {
	defaultTab: TabOptions;
	singleKey?: TabOptions | TabOptions[];
	availableTabs: TabOptions[];
	className?: string;
}

export type {
	Prettify,
	ClickToCopySnippetProps,
	TileProps,
	DataItemsProps,
	ProcessPickerProps,
	TabOptions,
	UploadPortalTabs,
	// RenderTileProps,
};
