import type { ChallengeCategory } from "@/features/challenges/types/challenge";

export type AdminDashboardStats = {
	mau: number;
	totalChallenges: number;
	todayCheckins: number;
	weeklyNewUsers: number;
};

export type DailyCheckinData = {
	date: string;
	count: number;
};

export type CategoryDistribution = {
	category: ChallengeCategory;
	count: number;
};

export type DailySignupData = {
	date: string;
	count: number;
};

export type DailyChallengeData = {
	date: string;
	count: number;
};
