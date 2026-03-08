import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

import { ChallengeCard } from "@/features/challenges/components/ChallengeCard";
import { MOCK_CHALLENGES, MOCK_MY_CHALLENGES } from "@/shared/mocks/challenges";
import { TODAY_COMPLETED_CHALLENGE_IDS } from "@/shared/mocks/checkins";
import { MY_PARTICIPATING_CHALLENGE_IDS } from "@/shared/mocks/participants";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";
import { Tabs } from "@/shared/ui/Tabs";

// 현재 유저가 참여 중인 챌린지 목록 (운영자 본인 챌린지는 별도)
const MY_PARTICIPATING_CHALLENGES = MOCK_CHALLENGES.filter(
	(c) => MY_PARTICIPATING_CHALLENGE_IDS.includes(c.id) && !MOCK_MY_CHALLENGES.find((mc) => mc.id === c.id)
);

const STATUS_BADGE_CLASS: Record<string, string> = {
	in_progress: "bg-success/10 text-success",
	recruiting: "bg-primary/10 text-primary",
	finished: "bg-muted text-muted-foreground",
	hidden: "bg-muted text-muted-foreground"
};

const STATUS_LABELS: Record<string, string> = {
	in_progress: "진행중",
	recruiting: "모집중",
	finished: "종료",
	hidden: "숨김"
};

export default function MyChallengesPage() {
	return (
		<div className="px-5 pb-24">
			{/* 페이지 헤더 */}
			<div className="mb-6 flex items-center justify-between pt-6">
				<h1 className="text-foreground text-xl font-bold">내 챌린지</h1>
				<Button size="icon" variant="ghost" asChild aria-label="새 챌린지 만들기">
					<Link href="/challenges/new">
						<Plus className="size-5" aria-hidden="true" />
					</Link>
				</Button>
			</div>

			<Tabs defaultValue="managing">
				{/* pill 스타일 탭 목록 */}
				<Tabs.List className="bg-muted mb-5 w-full rounded-2xl p-1">
					<Tabs.Trigger value="managing" className="flex-1 rounded-xl">
						운영 중 ({MOCK_MY_CHALLENGES.length})
					</Tabs.Trigger>
					<Tabs.Trigger value="participating" className="flex-1 rounded-xl">
						참여 중 ({MY_PARTICIPATING_CHALLENGES.length})
					</Tabs.Trigger>
				</Tabs.List>

				{/* 운영 중인 챌린지 */}
				<Tabs.Content value="managing">
					{MOCK_MY_CHALLENGES.length > 0 ? (
						<div className="space-y-3">
							{MOCK_MY_CHALLENGES.map((challenge) => (
								<Card key={challenge.id} className="rounded-2xl shadow-[var(--shadow-warm)]">
									<Card.Content className="p-4">
										<div className="flex items-center gap-3">
											{/* 썸네일 */}
											<div className="size-14 shrink-0 overflow-hidden rounded-xl">
												{challenge.thumbnail_url ? (
													<img src={challenge.thumbnail_url} alt={challenge.title} className="size-full object-cover" />
												) : (
													<div className="bg-primary/10 flex size-full items-center justify-center">
														<span className="text-xl" aria-hidden="true">
															🏆
														</span>
													</div>
												)}
											</div>

											{/* 중앙: 배지 + 제목 + 참여자 수 */}
											<div className="min-w-0 flex-1">
												<div className="mb-1 flex items-center gap-1.5">
													<Badge className={STATUS_BADGE_CLASS[challenge.status] ?? STATUS_BADGE_CLASS["recruiting"]!}>
														<span className="text-xs">{STATUS_LABELS[challenge.status] ?? "모집중"}</span>
													</Badge>
													<span className="text-muted-foreground text-xs">
														{challenge.current_participants}/{challenge.max_participants}명
													</span>
												</div>
												<h3 className="text-foreground truncate text-sm font-semibold">{challenge.title}</h3>
											</div>

											{/* 우측: ArrowRight 버튼 */}
											<Button
												variant="ghost"
												size="icon"
												className="text-muted-foreground shrink-0"
												asChild
												aria-label={`${challenge.title} 상세 보기`}
											>
												<Link href={`/challenges/${challenge.id}`}>
													<ArrowRight className="size-4" aria-hidden="true" />
												</Link>
											</Button>
										</div>
									</Card.Content>
								</Card>
							))}
						</div>
					) : (
						/* 운영 중 빈 상태 */
						<div className="flex flex-col items-center py-20 text-center">
							<span className="mb-4 text-5xl" role="img" aria-label="트로피">
								🏆
							</span>
							<h3 className="text-foreground mb-2 font-semibold">아직 운영 중인 챌린지가 없어요</h3>
							<p className="text-muted-foreground mb-6 text-sm">새로운 챌린지를 만들고 참여자를 모집해보세요!</p>
							<Button asChild>
								<Link href="/challenges/new">챌린지 만들기</Link>
							</Button>
						</div>
					)}
				</Tabs.Content>

				{/* 참여 중인 챌린지 */}
				<Tabs.Content value="participating">
					{MY_PARTICIPATING_CHALLENGES.length > 0 ? (
						<div className="grid grid-cols-1 gap-3">
							{MY_PARTICIPATING_CHALLENGES.map((challenge) => {
								const isTodayCompleted = TODAY_COMPLETED_CHALLENGE_IDS.includes(challenge.id);
								// 더미 인증률 계산 (실제 연결 시 교체)
								const dummyCompletionRate = 65;

								return (
									<div key={challenge.id} className="relative">
										<ChallengeCard challenge={challenge} showTodayStatus={true} isTodayCompleted={isTodayCompleted} />
										{/* 인증률 프로그레스바 오버레이 */}
										<div className="px-4 pb-3">
											<div className="flex items-center justify-between text-xs">
												<span className="text-muted-foreground">전체 인증률</span>
												<span className="text-foreground font-medium">{dummyCompletionRate}%</span>
											</div>
											<Progress
												value={dummyCompletionRate}
												className="mt-1.5 h-1.5"
												aria-label={`전체 인증률 ${dummyCompletionRate}%`}
											/>
										</div>
									</div>
								);
							})}
						</div>
					) : (
						/* 참여 중 빈 상태 */
						<div className="flex flex-col items-center py-20 text-center">
							<span className="mb-4 text-5xl" role="img" aria-label="눈">
								👀
							</span>
							<h3 className="text-foreground mb-2 font-semibold">아직 참여 중인 챌린지가 없어요</h3>
							<p className="text-muted-foreground mb-6 text-sm">
								다양한 챌린지를 탐색하고 원하는 챌린지에 참여해보세요.
							</p>
							<Button variant="outline" asChild>
								<Link href="/challenges">챌린지 둘러보기</Link>
							</Button>
						</div>
					)}
				</Tabs.Content>
			</Tabs>
		</div>
	);
}
