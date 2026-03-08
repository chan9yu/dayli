import { CheckCircle, Users, XCircle } from "lucide-react";

import type { ChallengeCheckin } from "@/features/checkins/types/checkin";
import { MOCK_USERS } from "@/shared/mocks/users";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { Separator } from "@/shared/ui/Separator";

type CheckinGridProps = {
	checkins: ChallengeCheckin[];
	totalParticipants?: number;
};

// 더미 참여자 목록 (challenge_id 기준으로 실제 연결 시 교체)
const DUMMY_PARTICIPANTS = MOCK_USERS.slice(1, 6).map((user) => ({
	user_id: user.id,
	nickname: user.nickname,
	avatar_url: user.avatar_url
}));

export function CheckinGrid({ checkins, totalParticipants }: CheckinGridProps) {
	const checkinUserIds = new Set(checkins.map((c) => c.user_id));
	const displayParticipants = totalParticipants ?? DUMMY_PARTICIPANTS.length;

	return (
		<Card>
			<Card.Header>
				<div className="flex items-center justify-between">
					<Card.Title className="flex items-center gap-2 text-base">
						<Users className="text-primary size-5" aria-hidden="true" />
						오늘의 인증 현황
					</Card.Title>
					<Badge variant="secondary" className="text-xs">
						{checkins.length} / {displayParticipants}명 완료
					</Badge>
				</div>
			</Card.Header>
			<Separator />
			<Card.Content className="pt-4">
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6" aria-label="참여자별 인증 현황">
					{DUMMY_PARTICIPANTS.map((participant) => {
						const hasCheckin = checkinUserIds.has(participant.user_id);
						const checkin = checkins.find((c) => c.user_id === participant.user_id);

						return (
							<div
								key={participant.user_id}
								className="flex flex-col items-center gap-1.5"
								title={`${participant.nickname} - ${hasCheckin ? "인증 완료" : "미완료"}`}
							>
								{/* 인증 이미지 또는 아바타 */}
								<div className="relative">
									{hasCheckin && checkin?.image_url ? (
										<div className="ring-success size-14 overflow-hidden rounded-full ring-2">
											<img
												src={checkin.image_url}
												alt={`${participant.nickname} 인증 사진`}
												className="size-full object-cover"
											/>
										</div>
									) : (
										<Avatar className="size-14 opacity-50">
											<Avatar.Image src={participant.avatar_url ?? undefined} alt={participant.nickname} />
											<Avatar.Fallback className="text-sm">{participant.nickname.charAt(0)}</Avatar.Fallback>
										</Avatar>
									)}
									{/* 완료/미완료 인디케이터 */}
									<div className="absolute -right-0.5 -bottom-0.5">
										{hasCheckin ? (
											<CheckCircle className="bg-background text-success size-5 rounded-full" aria-label="인증 완료" />
										) : (
											<XCircle
												className="bg-background text-muted-foreground size-5 rounded-full"
												aria-label="미완료"
											/>
										)}
									</div>
								</div>
								<span className="text-foreground max-w-14 truncate text-center text-xs font-medium">
									{participant.nickname}
								</span>
							</div>
						);
					})}
				</div>

				{DUMMY_PARTICIPANTS.length === 0 && (
					<p className="text-muted-foreground py-6 text-center text-sm">아직 참여자가 없습니다.</p>
				)}
			</Card.Content>
		</Card>
	);
}
