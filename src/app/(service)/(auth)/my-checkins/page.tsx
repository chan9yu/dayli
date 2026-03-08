"use client";

import { useState } from "react";

import { CheckinCalendar } from "@/features/checkins/components/CheckinCalendar";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { MOCK_CHECKINS } from "@/shared/mocks/checkins";
import { MY_PARTICIPATING_CHALLENGE_IDS } from "@/shared/mocks/participants";
import { Card } from "@/shared/ui/Card";
import { Select } from "@/shared/ui/Select";

// 현재 유저가 참여 중인 챌린지만 필터링
const MY_CHALLENGES = MOCK_CHALLENGES.filter((c) => MY_PARTICIPATING_CHALLENGE_IDS.includes(c.id));

// 현재 유저 ID (더미)
const CURRENT_USER_ID = "00000000-0000-0000-0000-000000000002";

export default function MyCheckinsPage() {
	const [selectedChallengeId, setSelectedChallengeId] = useState(MY_CHALLENGES[0]?.id ?? "");

	const selectedChallenge = MY_CHALLENGES.find((c) => c.id === selectedChallengeId);

	const myCheckins = MOCK_CHECKINS.filter(
		(c) => c.challenge_id === selectedChallengeId && c.user_id === CURRENT_USER_ID
	);

	const handleChallengeChange = (value: string) => {
		setSelectedChallengeId(value);
	};

	// 인증 통계 계산
	const totalDays = selectedChallenge?.duration_days ?? 0;
	const completedDays = myCheckins.length;

	return (
		<div className="px-5 pb-24">
			{/* 페이지 헤더 */}
			<div className="mb-6 pt-6">
				<h1 className="text-foreground text-xl font-bold">인증 기록</h1>
			</div>

			{MY_CHALLENGES.length === 0 ? (
				/* 빈 상태 */
				<div className="flex flex-col items-center py-20 text-center">
					<span className="mb-4 text-5xl" role="img" aria-label="달력">
						📅
					</span>
					<h3 className="text-foreground mb-2 font-semibold">아직 인증 기록이 없어요</h3>
					<p className="text-muted-foreground text-sm">챌린지에 참여하면 인증 기록을 확인할 수 있어요.</p>
				</div>
			) : (
				<div className="space-y-4">
					{/* 챌린지 선택 */}
					<Select value={selectedChallengeId} onValueChange={handleChallengeChange}>
						<Select.Trigger className="h-11 w-full rounded-xl" aria-label="챌린지 선택">
							<Select.Value placeholder="챌린지를 선택해주세요" />
						</Select.Trigger>
						<Select.Content>
							{MY_CHALLENGES.map((challenge) => (
								<Select.Item key={challenge.id} value={challenge.id}>
									{challenge.title}
								</Select.Item>
							))}
						</Select.Content>
					</Select>

					{/* 통계 요약 카드 */}
					{selectedChallenge && (
						<Card className="rounded-2xl shadow-[var(--shadow-warm)]">
							<Card.Content className="p-4">
								<div className="mb-1 flex items-start justify-between gap-2">
									<h3 className="text-foreground line-clamp-2 text-base leading-snug font-bold">
										{selectedChallenge.title}
									</h3>
									<div className="shrink-0 text-right">
										<span className="text-primary text-lg font-extrabold">{completedDays}</span>
										<span className="text-muted-foreground text-sm"> / {totalDays}일</span>
									</div>
								</div>
								<p className="text-muted-foreground text-xs">
									{selectedChallenge.start_date} ~ {selectedChallenge.end_date}
								</p>
							</Card.Content>
						</Card>
					)}

					{/* 달력 */}
					{selectedChallenge && (
						<Card className="rounded-2xl shadow-[var(--shadow-warm)]">
							<Card.Content className="p-4">
								<CheckinCalendar
									checkins={myCheckins}
									startDate={selectedChallenge.start_date}
									endDate={selectedChallenge.end_date}
								/>
							</Card.Content>
						</Card>
					)}
				</div>
			)}
		</div>
	);
}
