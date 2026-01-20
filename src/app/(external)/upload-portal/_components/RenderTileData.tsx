import type { IconType } from "react-icons";
import { FiCheckCircle, FiClock, FiUploadCloud } from "react-icons/fi";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { GLOW_EFFECT_DEFAULTS, type GlowEffectDefaultData } from "@/config/glow-effects";
import { cn } from "@/lib/utils";
import type { TileProps } from "@/types/local";

interface TileDataProps extends TileProps {
	id: string;
	icon: IconType;
	title: string;
	content: string;
}

export const tileData: TileDataProps[] = [
	{
		id: String(1),
		icon: FiUploadCloud,
		title: "Multiple Formats",
		content: "Upload PDF, Word documents, Excel spreadsheets, and more",
		path: null,
	},
	{
		id: String(2),
		icon: FiClock,
		title: "Fast Processing",
		content: "Most files are processed within minutes of submission",
		path: null,
	},
	{
		id: String(3),
		icon: FiCheckCircle,
		title: "Track Progress",
		content: "Monitor your submissions in real-time on the statistics page",
		path: null,
	},
];

export interface RenderInfoTilesProps {
	ulClassName?: string;
	liClassName?: string;
	glowEffectProps?: GlowEffectDefaultData;
}

export const RenderInfoTiles = ({ ...props }: RenderInfoTilesProps) => {
	// TODO: [backend] : we could make these dynamic/easily updatable via either a config or fetch, would be cool
	// would make it easy to add additional things ( like 'we now support xyz format!' etc. )
	const data = tileData;

	if (!data || data.length === 0) {
		return null;
	}

	const glowEffectData = {
		...(props.glowEffectProps || GLOW_EFFECT_DEFAULTS),
	};

	return (
		<ul
			className={cn(
				"grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 mb-12",
				props.ulClassName ?? null
			)}
		>
			{data.map((tile) => (
				<li key={tile.id} className={cn("min-h-48 list-none", props.liClassName ?? null)}>
					<div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
						<GlowingEffect {...glowEffectData} />
						<div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-xl p-5 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
							<div className="w-fit rounded-lg border border-gray-600 p-2">
								{/* a */}
								{tile.icon({
									className: `h-5 w-5 text-black dark:text-neutral-400`,
								})}
							</div>
							<div className="space-y-2">
								<h3 className="font-sans text-lg font-semibold text-black dark:text-white">
									{tile.title}
								</h3>
								<p className="font-sans text-sm text-black dark:text-neutral-400">{tile.content}</p>
							</div>
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};
