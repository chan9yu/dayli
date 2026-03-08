import { Calendar, Camera, CheckCircle, Edit, LogOut, Trash2, Trophy, Users, XCircle } from "lucide-react";
import Link from "next/link";

import type { Challenge, ChallengeStatus } from "@/features/challenges/types/challenge";
import { CATEGORY_EMOJI, CATEGORY_LABELS, STATUS_LABELS } from "@/features/challenges/types/constants";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";

type ChallengeDetailProps = {
	challenge: Challenge;
	// 현재 유저 관계
	isOwner?: boolean;
	isParticipant?: boolean;
	isTodayCompleted?: boolean;
	// 더미 플래그
	isLoggedIn?: boolean;
};

const STATUS_BADGE_CLASS: Record<ChallengeStatus, string> = {
	recruiting: "bg-primary/10 text-primary",
	in_progress: "bg-success/10 text-success",
	finished: "bg-muted text-muted-foreground",
	hidden: "bg-muted text-muted-foreground"
};

export function ChallengeDetail({
	challenge,
	isOwner = false,
	isParticipant = false,
	isTodayCompleted = false,
	isLoggedIn = true
}: ChallengeDetailProps) {
	const statusBadgeClass = STATUS_BADGE_CLASS[challenge.status];
	const statusLabel = STATUS_LABELS[challenge.status];
	const participantRate =
		challenge.max_participants > 0
			? Math.round((challenge.current_participants / challenge.max_participants) * 100)
			: 0;
	const isFull = challenge.current_participants >= challenge.max_participants;
	const isFinished = challenge.status === "finished";
	const categoryEmoji = CATEGORY_EMOJI[challenge.category];

	return (
		<div className="px-5 pb-24">
			{/* 썸네일 */}
			<div className="mb-5 aspect-[4/3] overflow-hidden rounded-2xl">
				{challenge.thumbnail_url ? (
					<img src={challenge.thumbnail_url} alt={challenge.title} className="size-full object-cover" />
				) : (
					<div className="from-primary/15 to-primary/5 flex size-full items-center justify-center bg-gradient-to-br">
						<span className="text-5xl" role="img" aria-label={CATEGORY_LABELS[challenge.category]}>
							{categoryEmoji}
						</span>
					</div>
				)}
			</div>

			{/* 배지 그룹 */}
			<div className="mb-3 flex flex-wrap gap-2">
				<Badge className={statusBadgeClass}>{statusLabel}</Badge>
				<Badge className="bg-secondary text-secondary-foreground">{CATEGORY_LABELS[challenge.category]}</Badge>
				<Badge className="bg-secondary text-secondary-foreground">{challenge.duration_days}일 챌린지</Badge>
			</div>

			{/* 제목 */}
			<h1 className="text-foreground mb-3 text-2xl font-extrabold tracking-tight">{challenge.title}</h1>

			{/* 설명 */}
			<p className="text-muted-foreground mb-5 text-sm leading-relaxed">{challenge.description}</p>

			{/* 인증 방법 카드 */}
			<div className="bg-primary/5 mb-5 rounded-2xl p-4">
				<div className="mb-2 flex items-center gap-2">
					<Camera className="text-primary size-4" aria-hidden="true" />
					<span className="text-foreground text-sm font-semibold">인증 방법</span>
				</div>
				<p className="text-muted-foreground text-sm leading-relaxed">{challenge.check_in_description}</p>
			</div>

			{/* 챌린지 기간 */}
			<div className="mb-5 flex items-center gap-2">
				<Calendar className="text-muted-foreground size-4" aria-hidden="true" />
				<span className="text-muted-foreground text-sm">
					{challenge.start_date} ~ {challenge.end_date}
					<span className="text-muted-foreground/60 ml-1">({challenge.duration_days}일)</span>
				</span>
			</div>

			{/* 참여자 현황 카드 */}
			<Card className="mb-5 rounded-2xl shadow-[var(--shadow-warm)]">
				<Card.Content className="pt-5 pb-5">
					<div className="mb-3 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Users className="text-primary size-4" aria-hidden="true" />
							<span className="text-foreground text-sm font-semibold">참여자 현황</span>
						</div>
						<span className="text-foreground text-sm font-bold">
							{challenge.current_participants}
							<span className="text-muted-foreground font-normal"> / {challenge.max_participants}명</span>
						</span>
					</div>
					<Progress
						value={participantRate}
						className="h-2 rounded-full"
						aria-label={`참여자 ${challenge.current_participants}명 / 최대 ${challenge.max_participants}명`}
					/>
					<div className="mt-2 flex items-center justify-between">
						<span className="text-muted-foreground text-xs">{participantRate}% 달성</span>
						{isFull && <span className="text-destructive text-xs font-semibold">참여 마감</span>}
					</div>
				</Card.Content>
			</Card>

			{/* 액션 버튼 영역 */}
			{isOwner ? (
				// 운영자 버튼 그룹
				<div className="space-y-3">
					<Button className="h-12 w-full rounded-xl" asChild>
						<Link href={`/challenges/${challenge.id}/edit`} className="flex items-center gap-2">
							<Edit className="size-4" aria-hidden="true" />
							수정하기
						</Link>
					</Button>
					<Button variant="secondary" className="h-12 w-full rounded-xl">
						{/* TODO: 챌린지 종료 기능 구현 */}
						<XCircle className="size-4" aria-hidden="true" />
						종료하기
					</Button>
					<Button variant="destructive" className="h-12 w-full rounded-xl">
						{/* TODO: 챌린지 삭제 기능 구현 */}
						<Trash2 className="size-4" aria-hidden="true" />
						삭제하기
					</Button>
				</div>
			) : isParticipant ? (
				// 참여자 버튼 그룹
				<div className="space-y-3">
					{isTodayCompleted ? (
						<div className="bg-success/10 flex items-center justify-center gap-2 rounded-2xl px-4 py-4">
							<CheckCircle className="text-success size-5" aria-hidden="true" />
							<span className="text-success text-sm font-semibold">오늘 인증 완료!</span>
						</div>
					) : (
						<Button className="h-12 w-full rounded-xl" size="lg" disabled={isFinished} asChild={!isFinished}>
							{isFinished ? (
								<span className="flex items-center gap-2">
									<Trophy className="size-4" aria-hidden="true" />
									종료된 챌린지
								</span>
							) : (
								<Link href={`/challenges/${challenge.id}/checkin`} className="flex items-center gap-2">
									<Trophy className="size-4" aria-hidden="true" />
									오늘 인증하기
								</Link>
							)}
						</Button>
					)}
					<Button type="button" variant="ghost" className="text-muted-foreground w-full gap-1.5 text-sm">
						{/* TODO: 챌린지 탈퇴 기능 구현 */}
						<LogOut className="size-3.5" aria-hidden="true" />
						챌린지 탈퇴
					</Button>
				</div>
			) : (
				// 비참여자 버튼
				<Button
					className="h-12 w-full rounded-xl"
					size="lg"
					disabled={isFull || isFinished || !isLoggedIn}
					asChild={isLoggedIn && !isFull && !isFinished}
				>
					{isLoggedIn && !isFull && !isFinished ? (
						<span className="flex items-center gap-2">
							<Users className="size-4" aria-hidden="true" />
							{/* TODO: 참여하기 기능 구현 */}
							참여하기
						</span>
					) : (
						<span>{!isLoggedIn ? "로그인 후 참여 가능" : isFull ? "참여 마감" : "종료된 챌린지"}</span>
					)}
				</Button>
			)}
		</div>
	);
}
