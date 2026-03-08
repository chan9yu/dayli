import { notFound } from "next/navigation";

import { CheckinUploader } from "@/features/checkins/components/CheckinUploader";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { TODAY_COMPLETED_CHALLENGE_IDS } from "@/shared/mocks/checkins";

export default async function CheckinPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const challenge = MOCK_CHALLENGES.find((c) => c.id === id);

	if (!challenge) {
		notFound();
	}
	const isAlreadyCompleted = TODAY_COMPLETED_CHALLENGE_IDS.includes(id);

	return (
		<div className="flex min-h-screen flex-col">
			<CheckinUploader challenge={challenge} isAlreadyCompleted={isAlreadyCompleted} />
		</div>
	);
}
