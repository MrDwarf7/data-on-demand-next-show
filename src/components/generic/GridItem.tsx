import Link from "next/link";
import { GlowingEffect, type GlowingEffectProps } from "@/components/ui/glowing-effect";
import type { ExternalMenuItem } from "@/config/external/headerbar-config";

export interface GridItemProps extends Pick<Partial<ExternalMenuItem>, "icon" | "path"> {
	// icon: React.ReactNode;
	title: string;
	preLinkContent: string;
	postLinkContent: string;
	// path: string;
}

export const GridItem = ({
	data,
	glowingEffectProps,
}: {
	data: GridItemProps;
	glowingEffectProps?: GlowingEffectProps;
}) => {
	return (
		<li className="min-h-64 list-none">
			<div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
				<GlowingEffect {...glowingEffectProps} />
				<div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
					<div className="relative flex align-middle flex-col justify-between gap-3">
						<div className="w-fit rounded-lg border border-gray-600 p-2">{data.icon}</div>
						<div className="space-y-3">
							<h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
								{data.title}
							</h3>
							<h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
								{data.preLinkContent}{" "}
								<Link
									className="text-blue-500 hover:text-blue-400 underline underline-offset-2"
									href={data.path || "#"}
								>
									{data.title}
								</Link>{" "}
								{data.postLinkContent}
							</h2>
						</div>
					</div>
				</div>
			</div>
		</li>
	);
};
