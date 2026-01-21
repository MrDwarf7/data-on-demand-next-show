import type {
	RecentActivity,
	StatsCard,
	SystemMetric,
	TimeRange,
	TopProcess,
} from "@/config/internal/stats-overview-config";
import {
	generateRecentActivity,
	generateStatsCards,
	generateSystemMetrics,
	generateTopProcesses,
	TIME_RANGES,
} from "@/config/internal/stats-overview-config";

interface StatsData {
	statsCards: StatsCard[];
	recentActivity: RecentActivity[];
	systemMetrics: SystemMetric[];
	topProcesses: TopProcess[];
}

const generateSingleStatData = (timeRange: TimeRange): StatsData => {
	return Object.freeze({
		statsCards: generateStatsCards(timeRange),
		recentActivity: generateRecentActivity(5),
		systemMetrics: generateSystemMetrics(4),
		topProcesses: generateTopProcesses(5),
	});
};

const generateMockStats = (): Record<TimeRange, StatsData> =>
	(Object.values(TIME_RANGES) as TimeRange[]).reduce(
		(acc, timeRange) => {
			acc[timeRange] = generateSingleStatData(timeRange);
			return acc;
		},
		// {} as Record<TimeRange, StatsData>
		{
			// "24h": {} as StatsData,
			// "7d": {} as StatsData,
			// "30d": {} as StatsData,
			// "90d": {} as StatsData,
		} as Record<TimeRange, StatsData>
	);

// Mock data for different time ranges
const MOCK_STATS: Record<TimeRange, StatsData> = generateMockStats() as Record<
	TimeRange,
	StatsData
>;

// Function to get stats data (server-side compatible)
export function getStatsOverview(timeRange: TimeRange): Readonly<StatsData> {
	//   // TODO: [backend] : Replace with API call: fetch(`/api/stats?range=${timeRange}`)

	if (!TIME_RANGES.includes(timeRange) || timeRange === undefined) {
		return MOCK_STATS[TIME_RANGES[0]]; // use the first index of TIME_RANGES as default
	}

	return MOCK_STATS[timeRange];
}

// Hook to fetch stats data (currently mock, easily replaceable with API call)
// export function useStatsOverview(timeRange: TimeRange): StatsData {
// 	return useMemo(() => {
// 		return getStatsOverview(timeRange);
// 	}, [timeRange]);
// }
