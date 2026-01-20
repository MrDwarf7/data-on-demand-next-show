import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const capitalizeLetters = <S extends string>(word: S) => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};
