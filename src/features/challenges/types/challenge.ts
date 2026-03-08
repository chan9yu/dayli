export type ChallengeCategory = "health" | "study" | "lifestyle" | "other";
export type ChallengeStatus = "recruiting" | "in_progress" | "finished" | "hidden";

export type Challenge = {
	id: string;
	created_by: string;
	title: string;
	description: string;
	category: ChallengeCategory;
	duration_days: 7 | 14 | 21 | 30;
	start_date: string;
	end_date: string;
	check_in_description: string;
	max_participants: number;
	current_participants: number;
	thumbnail_url: string | null;
	status: ChallengeStatus;
	created_at: string;
	updated_at: string;
};

export type ChallengeParticipant = {
	id: string;
	challenge_id: string;
	user_id: string;
	joined_at: string;
	left_at: string | null;
};
