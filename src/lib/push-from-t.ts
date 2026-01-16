import { useRouter, useSearchParams } from "next/navigation";

export const usePushFrom = <T>(key: string) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// if (!key || typeof key !== "string") return;

	return (value: T) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(key, String(value));
		router.push(`?${params.toString()}`);
	};
};
