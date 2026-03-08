import type {
	AdminDashboardStats,
	CategoryDistribution,
	DailyChallengeData,
	DailyCheckinData,
	DailySignupData
} from "@/features/admin/types/admin";

export const MOCK_ADMIN_STATS: AdminDashboardStats = {
	mau: 847,
	totalChallenges: 16,
	todayCheckins: 234,
	weeklyNewUsers: 42
};

// 최근 7일 인증 현황
export const MOCK_DAILY_CHECKINS: DailyCheckinData[] = [
	{ date: "03-02", count: 156 },
	{ date: "03-03", count: 189 },
	{ date: "03-04", count: 203 },
	{ date: "03-05", count: 178 },
	{ date: "03-06", count: 145 },
	{ date: "03-07", count: 221 },
	{ date: "03-08", count: 234 }
];

// 카테고리별 챌린지 분포
export const MOCK_CATEGORY_DISTRIBUTION: CategoryDistribution[] = [
	{ category: "health", count: 5 },
	{ category: "study", count: 4 },
	{ category: "lifestyle", count: 4 },
	{ category: "other", count: 3 }
];

// 일별 신규 가입자 (최근 30일)
export const MOCK_DAILY_SIGNUPS: DailySignupData[] = [
	{ date: "02-07", count: 3 },
	{ date: "02-08", count: 5 },
	{ date: "02-09", count: 2 },
	{ date: "02-10", count: 8 },
	{ date: "02-11", count: 4 },
	{ date: "02-12", count: 6 },
	{ date: "02-13", count: 7 },
	{ date: "02-14", count: 12 },
	{ date: "02-15", count: 9 },
	{ date: "02-16", count: 5 },
	{ date: "02-17", count: 3 },
	{ date: "02-18", count: 4 },
	{ date: "02-19", count: 6 },
	{ date: "02-20", count: 8 },
	{ date: "02-21", count: 11 },
	{ date: "02-22", count: 7 },
	{ date: "02-23", count: 5 },
	{ date: "02-24", count: 9 },
	{ date: "02-25", count: 14 },
	{ date: "02-26", count: 10 },
	{ date: "02-27", count: 6 },
	{ date: "02-28", count: 8 },
	{ date: "03-01", count: 15 },
	{ date: "03-02", count: 12 },
	{ date: "03-03", count: 9 },
	{ date: "03-04", count: 7 },
	{ date: "03-05", count: 5 },
	{ date: "03-06", count: 6 },
	{ date: "03-07", count: 8 },
	{ date: "03-08", count: 11 }
];

// 일별 챌린지 생성
export const MOCK_DAILY_CHALLENGES: DailyChallengeData[] = [
	{ date: "03-02", count: 1 },
	{ date: "03-03", count: 2 },
	{ date: "03-04", count: 0 },
	{ date: "03-05", count: 3 },
	{ date: "03-06", count: 1 },
	{ date: "03-07", count: 2 },
	{ date: "03-08", count: 4 }
];
