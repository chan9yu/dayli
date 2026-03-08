import { notFound } from "next/navigation";

import { ChallengeForm } from "@/features/challenges/components/ChallengeForm";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";

export default async function EditChallengePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const challenge = MOCK_CHALLENGES.find((c) => c.id === id);

	if (!challenge) {
		notFound();
	}

	return <ChallengeForm mode="edit" defaultValues={challenge} />;
}
