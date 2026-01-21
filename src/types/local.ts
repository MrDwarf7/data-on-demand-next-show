// import { JSX } from "react/jsx-runtime";

import type React from "react";
import type { IconType } from "react-icons";
import type { ValueAndLabel } from "./common";

// Very useful for printing types (especially larger or more complex ones)
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	path: string | null;
	icon: IconType;
	key?: React.Key;
}

export type ClickToCopySnippetProps = {
	className?: string;
	[key: string]: undefined | string | number | boolean | object | symbol | null;
	text: string;
};

// export interface DataItemsProps extends ValueAndLabel {
// }

export type DataItemsProps = ValueAndLabel;

export type ProcessPickerProps = {
	searchParams?: {
		process: string | undefined;
		selectedTab: string | undefined;
	};
	onFilesSelected?: (files: File[]) => void;
};

// Note on the tab themselves it will be prexied with "For {Option}"
export type TabOptions = "humans" | "automations";

export interface UploadPortalTabs {
	defaultTab: TabOptions;
	availableTabs: TabOptions[];
	className?: string;
}
