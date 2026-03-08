import { notFound } from "next/navigation";

import { ChallengeDetail } from "@/features/challenges/components/ChallengeDetail";
import { CheckinGrid } from "@/features/checkins/components/CheckinGrid";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { MOCK_CHECKINS } from "@/shared/mocks/checkins";
import { TODAY_COMPLETED_CHALLENGE_IDS } from "@/shared/mocks/checkins";
import { MY_PARTICIPATING_CHALLENGE_IDS } from "@/shared/mocks/participants";

// 더미 현재 유저 ID
const CURRENT_USER_ID = "00000000-0000-0000-0000-000000000002";

export default async function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const challenge = MOCK_CHALLENGES.find((c) => c.id === id);

	if (!challenge) {
		notFound();
	}

	const isOwner = challenge.created_by === CURRENT_USER_ID;
	const isParticipant = MY_PARTICIPATING_CHALLENGE_IDS.includes(challenge.id);
	const isTodayCompleted = TODAY_COMPLETED_CHALLENGE_IDS.includes(challenge.id);

	// KST 기준 오늘 날짜 계산
	const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(new Date());

	// 해당 챌린지의 오늘 인증 목록
	const todayCheckins = MOCK_CHECKINS.filter((c) => c.challenge_id === challenge.id && c.check_in_date === today);

	return (
		<>
			<ChallengeDetail
				challenge={challenge}
				isOwner={isOwner}
				isParticipant={isParticipant}
				isTodayCompleted={isTodayCompleted}
				isLoggedIn={true}
			/>
			<div className="mx-auto max-w-4xl px-5 pb-24">
				<CheckinGrid checkins={todayCheckins} />
			</div>
		</>
	);
}
