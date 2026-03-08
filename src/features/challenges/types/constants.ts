import type { ChallengeCategory, ChallengeStatus } from "@/features/challenges/types/challenge";

// 카테고리 라벨
export const CATEGORY_LABELS: Record<ChallengeCategory, string> = {
	health: "건강·운동",
	study: "학습",
	lifestyle: "생활습관",
	other: "기타"
};

// 카테고리 이모지
export const CATEGORY_EMOJI: Record<ChallengeCategory, string> = {
	health: "💪",
	study: "📚",
	lifestyle: "🌿",
	other: "✨"
};

// 카테고리 선택 옵션 (폼용)
export const CATEGORY_OPTIONS = [
	{ value: "health" as const, label: "💪 건강·운동" },
	{ value: "study" as const, label: "📚 학습" },
	{ value: "lifestyle" as const, label: "🌿 생활습관" },
	{ value: "other" as const, label: "✨ 기타" }
];

// 기간 선택 옵션 (폼용)
export const DURATION_OPTIONS = [
	{ value: "7" as const, label: "7일" },
	{ value: "14" as const, label: "14일" },
	{ value: "21" as const, label: "21일" },
	{ value: "30" as const, label: "30일" }
];

// 상태 라벨
export const STATUS_LABELS: Record<ChallengeStatus, string> = {
	recruiting: "모집중",
	in_progress: "진행중",
	finished: "종료",
	hidden: "숨김"
};

// 상태별 Badge variant 매핑
export const STATUS_VARIANT: Record<ChallengeStatus, "default" | "secondary" | "outline" | "destructive"> = {
	recruiting: "secondary",
	in_progress: "default",
	finished: "outline",
	hidden: "outline"
};

// 상태 목록
export const STATUS_LIST: ChallengeStatus[] = ["recruiting", "in_progress", "finished", "hidden"];
