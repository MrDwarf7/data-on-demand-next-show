/**
 * Generic utility for looking up styles from a style map
 * @param styles - The record of styles
 * @param key - The key to lookup
 * @returns The style object for the key
 */
export function lookupStyleOf<T>(styles: Record<string, T>, key: string): T {
	return styles[key];
}
