import { ArrowRight, CheckCircle, Clock, Plus, Trophy } from "lucide-react";
import Link from "next/link";

import { ChallengeCard } from "@/features/challenges/components/ChallengeCard";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { TODAY_COMPLETED_CHALLENGE_IDS } from "@/shared/mocks/checkins";
import { MY_PARTICIPATING_CHALLENGE_IDS } from "@/shared/mocks/participants";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";

// 참여 중인 챌린지 목록
const MY_PARTICIPATING_CHALLENGES = MOCK_CHALLENGES.filter(
	(c) => MY_PARTICIPATING_CHALLENGE_IDS.includes(c.id) && c.status === "in_progress"
);

// 오늘 인증 미완료 챌린지 (최대 5개)
const TODAY_PENDING_CHALLENGES = MY_PARTICIPATING_CHALLENGES.filter(
	(c) => !TODAY_COMPLETED_CHALLENGE_IDS.includes(c.id)
).slice(0, 5);

// 인기 챌린지 추천 (참여자 많은 순, 최대 6개)
const POPULAR_CHALLENGES = [...MOCK_CHALLENGES]
	.filter((c) => c.status === "in_progress" || c.status === "recruiting")
	.sort((a, b) => b.current_participants - a.current_participants)
	.slice(0, 6);

const DUMMY_USER_NICKNAME = "김민호";
const TOTAL_CHALLENGES = MY_PARTICIPATING_CHALLENGES.length;
const COMPLETED_TODAY = TODAY_COMPLETED_CHALLENGE_IDS.filter((id) =>
	MY_PARTICIPATING_CHALLENGE_IDS.includes(id)
).length;

export default function HomePage() {
	const progressPercent = TOTAL_CHALLENGES > 0 ? Math.round((COMPLETED_TODAY / TOTAL_CHALLENGES) * 100) : 0;

	return (
		<div className="px-5 pb-24">
			{/* 인사 섹션 */}
			<section className="pt-6 pb-2">
				<h1 className="text-foreground text-xl font-bold">좋은 아침이에요, {DUMMY_USER_NICKNAME}님 👋</h1>
				<p className="text-muted-foreground mt-0.5 text-sm">오늘도 챌린지를 완료해보세요</p>
			</section>

			{/* 오늘의 인증 현황 카드 */}
			<section className="py-4">
				<Card className="shadow-warm overflow-hidden rounded-2xl">
					<Card.Content className="pt-5">
						<div className="from-primary/5 flex items-center justify-between rounded-xl bg-gradient-to-r to-transparent p-4">
							<div>
								<p className="text-muted-foreground mb-1 text-xs">오늘 인증 완료</p>
								<p className="text-primary text-3xl font-extrabold">
									{COMPLETED_TODAY}
									<span className="text-muted-foreground text-xl font-bold">/{TOTAL_CHALLENGES}</span>
								</p>
								<p className="text-muted-foreground mt-0.5 text-xs">개 챌린지</p>
							</div>
							<div className="bg-primary/10 flex size-14 items-center justify-center rounded-full">
								<Trophy className="text-primary size-7" aria-hidden="true" />
							</div>
						</div>
						{TOTAL_CHALLENGES > 0 && (
							<div className="mt-4">
								<Progress
									value={progressPercent}
									className="h-2 rounded-full"
									aria-label={`오늘 인증 진행률 ${COMPLETED_TODAY}/${TOTAL_CHALLENGES}`}
								/>
							</div>
						)}
					</Card.Content>
				</Card>
			</section>

			{/* 오늘의 미션 */}
			{TODAY_PENDING_CHALLENGES.length > 0 && (
				<section className="py-4">
					<div className="mb-3 flex items-center justify-between">
						<h2 className="text-foreground flex items-center gap-1.5 text-base font-bold">
							<Clock className="text-destructive size-4" aria-hidden="true" />
							오늘의 미션
						</h2>
						<Badge variant="destructive" className="text-xs">
							{TODAY_PENDING_CHALLENGES.length}개
						</Badge>
					</div>

					<div className="flex flex-col gap-2">
						{TODAY_PENDING_CHALLENGES.map((challenge) => (
							<div key={challenge.id} className="bg-card shadow-warm-sm flex items-center gap-3 rounded-2xl p-3">
								{/* 썸네일 */}
								<div className="bg-muted size-11 shrink-0 overflow-hidden rounded-xl">
									{challenge.thumbnail_url ? (
										<img src={challenge.thumbnail_url} alt={challenge.title} className="size-full object-cover" />
									) : (
										<div className="from-primary/15 to-primary/5 flex size-full items-center justify-center bg-gradient-to-br">
											<span className="text-lg" aria-hidden="true">
												💪
											</span>
										</div>
									)}
								</div>

								{/* 텍스트 */}
								<div className="min-w-0 flex-1">
									<p className="text-foreground truncate text-sm font-medium">{challenge.title}</p>
									<p className="text-muted-foreground text-xs">{challenge.duration_days}일 챌린지</p>
								</div>

								{/* 인증 버튼 */}
								<Button size="sm" className="shrink-0 rounded-xl" asChild>
									<Link
										href={`/challenges/${challenge.id}/checkin`}
										className="flex items-center gap-1 whitespace-nowrap"
									>
										<CheckCircle className="size-3.5" aria-hidden="true" />
										인증하기
									</Link>
								</Button>
							</div>
						))}
					</div>
				</section>
			)}

			{/* 인기 챌린지 */}
			<section className="py-4">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="text-foreground text-base font-bold">인기 챌린지 🔥</h2>
					<Button variant="ghost" size="sm" className="text-muted-foreground h-auto p-0 text-xs" asChild>
						<Link href="/challenges" className="flex items-center gap-0.5">
							전체보기
							<ArrowRight className="size-3.5" aria-hidden="true" />
						</Link>
					</Button>
				</div>

				<div className="animate-stagger flex flex-col gap-3">
					{POPULAR_CHALLENGES.map((challenge) => (
						<ChallengeCard key={challenge.id} challenge={challenge} />
					))}
				</div>
			</section>

			{/* 새 챌린지 만들기 CTA */}
			<section className="py-4">
				<Link
					href="/challenges/new"
					className="from-primary/10 to-primary/5 flex items-center gap-3 rounded-2xl bg-gradient-to-r p-4 active:opacity-80"
				>
					<div className="bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-xl">
						<Plus className="size-5" aria-hidden="true" />
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-foreground text-sm font-semibold">나만의 챌린지</p>
						<p className="text-muted-foreground text-xs">직접 챌린지를 만들고 참여자를 모집해보세요</p>
					</div>
					<ArrowRight className="text-muted-foreground size-4 shrink-0" aria-hidden="true" />
				</Link>
			</section>
		</div>
	);
}
