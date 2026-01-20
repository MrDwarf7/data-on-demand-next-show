import type { GlowingEffectProps } from "@/components/ui/glowing-effect";

export interface GlowEffectDefaultData extends Partial<GlowingEffectProps> {}

export const GLOW_EFFECT_DEFAULTS: GlowEffectDefaultData = {
	spread: 40,
	glow: true,
	disabled: false,
	proximity: 64,
	inactiveZone: 0.01,
};
