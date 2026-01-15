/**
 * Generic utility for looking up styles from a style map
 * @param styles - The record of styles
 * @param key - The key to lookup
 * @returns The style object for the key
 */
export function lookupStyleOf<T>(styles: Record<string, T>, key: string): T {
	return styles[key];
}

/**
 * Creates a type-safe getter function for a style map
 * @param styles - The record of styles
 * @returns A getter function that takes a key and returns the corresponding style
 */
export function createStyleGetter<TKey extends string, TValue>(styles: Record<TKey, TValue>) {
	return (key: TKey) => styles[key];
}
