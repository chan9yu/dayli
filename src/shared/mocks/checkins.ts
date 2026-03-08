import type { ChallengeCheckin } from "@/features/checkins/types/checkin";

// 아침 러닝 챌린지 인증 기록
const RUNNING_CHECKINS: ChallengeCheckin[] = [
	{
		id: "ci-001",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-01",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: "오늘 5km 완주! 날씨가 좋았어요.",
		created_at: "2026-03-01T07:30:00Z"
	},
	{
		id: "ci-002",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-02",
		image_url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&h=300&fit=crop",
		memo: "비가 와서 실내 러닝머신으로 대체했어요.",
		created_at: "2026-03-02T08:00:00Z"
	},
	{
		id: "ci-003",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-03",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: null,
		created_at: "2026-03-03T07:15:00Z"
	},
	{
		id: "ci-004",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-04",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: "6km까지 늘렸어요!",
		created_at: "2026-03-04T07:20:00Z"
	},
	{
		id: "ci-005",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-05",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: null,
		created_at: "2026-03-05T07:45:00Z"
	},
	{
		id: "ci-006",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		check_in_date: "2026-03-07",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: "6일 연속! 힘들지만 뿌듯해요.",
		created_at: "2026-03-07T07:30:00Z"
	}
];

// 타인 인증 기록 (챌린지 상세 인증 현황용)
const OTHER_USERS_CHECKINS: ChallengeCheckin[] = [
	{
		id: "ci-101",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000003",
		check_in_date: "2026-03-08",
		image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
		memo: "오늘도 완주!",
		created_at: "2026-03-08T07:00:00Z"
	},
	{
		id: "ci-102",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000004",
		check_in_date: "2026-03-08",
		image_url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&h=300&fit=crop",
		memo: null,
		created_at: "2026-03-08T06:30:00Z"
	}
];

export const MOCK_CHECKINS: ChallengeCheckin[] = [...RUNNING_CHECKINS, ...OTHER_USERS_CHECKINS];

// 오늘 인증 완료된 챌린지 ID 목록 (더미)
export const TODAY_COMPLETED_CHALLENGE_IDS: string[] = ["ch-00000000-0000-0000-0000-000000000007"];
