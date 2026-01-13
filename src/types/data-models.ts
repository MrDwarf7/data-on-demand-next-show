// Data models for routing and data fetching from the backend via route.ts files

type QueueData = {
	name: string;
	loaded: number | null;
	completed: number | boolean | null;
	exceptions: number | boolean | null;
	pending: number | null;
	locked: number | null;
	avgWorkTime: number;
};

interface QueueDataFetch<T> extends QueueData {
	items: QueueData[] | T;
	// generic?: T
}

export type { QueueData, QueueDataFetch };
