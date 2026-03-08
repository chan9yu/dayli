import type { ChallengeParticipant } from "@/features/challenges/types/challenge";

export const MOCK_PARTICIPANTS: ChallengeParticipant[] = [
	{
		id: "p-001",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000002",
		joined_at: "2026-02-25T10:00:00Z",
		left_at: null
	},
	{
		id: "p-002",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000003",
		joined_at: "2026-02-26T09:00:00Z",
		left_at: null
	},
	{
		id: "p-003",
		challenge_id: "ch-00000000-0000-0000-0000-000000000001",
		user_id: "00000000-0000-0000-0000-000000000004",
		joined_at: "2026-02-27T11:00:00Z",
		left_at: null
	},
	{
		id: "p-004",
		challenge_id: "ch-00000000-0000-0000-0000-000000000006",
		user_id: "00000000-0000-0000-0000-000000000002",
		joined_at: "2026-03-08T09:00:00Z",
		left_at: null
	},
	{
		id: "p-005",
		challenge_id: "ch-00000000-0000-0000-0000-000000000011",
		user_id: "00000000-0000-0000-0000-000000000002",
		joined_at: "2026-03-08T10:00:00Z",
		left_at: null
	},
	{
		id: "p-006",
		challenge_id: "ch-00000000-0000-0000-0000-000000000007",
		user_id: "00000000-0000-0000-0000-000000000002",
		joined_at: "2026-03-01T08:00:00Z",
		left_at: null
	}
];

// 현재 유저(MOCK_CURRENT_USER)가 참여 중인 챌린지 ID 목록
export const MY_PARTICIPATING_CHALLENGE_IDS = [
	"ch-00000000-0000-0000-0000-000000000001",
	"ch-00000000-0000-0000-0000-000000000006",
	"ch-00000000-0000-0000-0000-000000000011",
	"ch-00000000-0000-0000-0000-000000000007"
];
