import { Calendar, CheckCircle, Users } from "lucide-react";
import Link from "next/link";

import type { Challenge } from "@/features/challenges/types/challenge";
import { CATEGORY_EMOJI, CATEGORY_LABELS, STATUS_LABELS } from "@/features/challenges/types/constants";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { Progress } from "@/shared/ui/Progress";
import { cn } from "@/shared/utils/cn";

type ChallengeCardProps = {
	challenge: Challenge;
	showTodayStatus?: boolean;
	isTodayCompleted?: boolean;
	className?: string;
};

export function ChallengeCard({ challenge, showTodayStatus, isTodayCompleted, className }: ChallengeCardProps) {
	const participantRate =
		challenge.max_participants > 0
			? Math.round((challenge.current_participants / challenge.max_participants) * 100)
			: 0;
	const spotsLeft = challenge.max_participants - challenge.current_participants;
	const statusLabel = STATUS_LABELS[challenge.status];
	const categoryEmoji = CATEGORY_EMOJI[challenge.category];

	const statusBadgeClass = cn(
		"text-[10px] font-semibold px-2 py-0.5 rounded-full",
		challenge.status === "recruiting" && "bg-primary/10 text-primary",
		challenge.status === "in_progress" && "bg-success/10 text-success",
		challenge.status === "finished" && "bg-muted text-muted-foreground"
	);

	return (
		<Link href={`/challenges/${challenge.id}`} className="block">
			<Card
				className={cn(
					"group hover:shadow-warm-hover cursor-pointer overflow-hidden rounded-2xl transition-all duration-200 active:scale-[0.98]",
					className
				)}
			>
				{/* 썸네일 */}
				<div className="bg-muted relative aspect-[2/1] overflow-hidden">
					{challenge.thumbnail_url ? (
						<img
							src={challenge.thumbnail_url}
							alt={challenge.title}
							className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					) : (
						<div className="from-primary/15 to-primary/5 flex size-full items-center justify-center bg-gradient-to-br">
							<span className="text-4xl" role="img" aria-label={CATEGORY_LABELS[challenge.category]}>
								{categoryEmoji}
							</span>
						</div>
					)}

					{/* 오늘 인증 상태 배지 */}
					{showTodayStatus && (
						<div className="absolute top-2.5 right-2.5">
							{isTodayCompleted ? (
								<span className="bg-success text-success-foreground shadow-warm-sm inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold">
									<CheckCircle className="size-3" aria-hidden="true" />
									완료
								</span>
							) : (
								<span className="bg-warning/90 text-warning-foreground shadow-warm-sm inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold">
									인증 필요
								</span>
							)}
						</div>
					)}
				</div>

				<Card.Content className="p-4">
					{/* 상태 배지 */}
					<div className="mb-2.5">
						<Badge className={statusBadgeClass}>{statusLabel}</Badge>
					</div>

					{/* 제목 */}
					<h3 className="text-foreground mb-1 line-clamp-1 text-[15px] font-bold">{challenge.title}</h3>

					{/* 설명 */}
					<p className="text-muted-foreground mb-3.5 line-clamp-1 text-xs leading-relaxed">{challenge.description}</p>

					{/* 메타 정보 + 프로그레스바 */}
					<div className="space-y-2">
						<div className="text-muted-foreground flex items-center gap-3 text-xs">
							<span className="flex items-center gap-1">
								<Calendar className="size-3.5" aria-hidden="true" />
								{challenge.duration_days}일
							</span>
							<span className="flex items-center gap-1">
								<Users className="size-3.5" aria-hidden="true" />
								{challenge.current_participants}/{challenge.max_participants}명
							</span>
							<span className="ml-auto text-[11px]">{spotsLeft > 0 ? `${spotsLeft}자리 남음` : "참여 마감"}</span>
						</div>
						<Progress
							value={participantRate}
							className="h-1 rounded-full"
							aria-label={`참여자 ${challenge.current_participants}명 / 최대 ${challenge.max_participants}명`}
						/>
					</div>
				</Card.Content>
			</Card>
		</Link>
	);
}
