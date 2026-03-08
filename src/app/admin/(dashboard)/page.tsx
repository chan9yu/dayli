import { BarChart3, CheckCircle, TrendingUp, Trophy, Users } from "lucide-react";

import { CategoryPieChart, CheckinBarChart } from "@/features/admin/components/StatsChart";
import { MOCK_ADMIN_STATS, MOCK_CATEGORY_DISTRIBUTION, MOCK_DAILY_CHECKINS } from "@/shared/mocks/adminStats";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { MOCK_USERS } from "@/shared/mocks/users";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";

const STAT_CARDS = [
	{
		label: "MAU",
		value: MOCK_ADMIN_STATS.mau.toLocaleString(),
		suffix: "명",
		icon: <Users className="text-primary size-5" aria-hidden="true" />,
		iconBg: "bg-primary/10",
		change: "+12%"
	},
	{
		label: "전체 챌린지",
		value: MOCK_ADMIN_STATS.totalChallenges.toLocaleString(),
		suffix: "개",
		icon: <Trophy className="text-warning size-5" aria-hidden="true" />,
		iconBg: "bg-warning/10",
		change: "+4%"
	},
	{
		label: "오늘 인증",
		value: MOCK_ADMIN_STATS.todayCheckins.toLocaleString(),
		suffix: "건",
		icon: <CheckCircle className="text-success size-5" aria-hidden="true" />,
		iconBg: "bg-success/10",
		change: "+8%"
	},
	{
		label: "신규 가입",
		value: MOCK_ADMIN_STATS.weeklyNewUsers.toLocaleString(),
		suffix: "명",
		icon: <TrendingUp className="text-info size-5" aria-hidden="true" />,
		iconBg: "bg-info/10",
		change: "+23%"
	}
];

const RECENT_CHALLENGES = MOCK_CHALLENGES.slice(0, 5);
const RECENT_USERS = MOCK_USERS.slice(1, 6);

const STATUS_LABELS: Record<string, string> = {
	recruiting: "모집중",
	in_progress: "진행중",
	finished: "종료",
	hidden: "숨김"
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
	recruiting: "secondary",
	in_progress: "default",
	finished: "outline",
	hidden: "outline"
};

export default function AdminDashboardPage() {
	return (
		<div className="space-y-6 p-8">
			{/* 페이지 헤더 */}
			<div>
				<h1 className="text-foreground text-2xl font-bold">대시보드</h1>
				<p className="text-muted-foreground text-sm">서비스 전체 현황</p>
			</div>

			{/* 핵심 지표 카드 4개 — 한 줄 4열 */}
			<div className="grid grid-cols-4 gap-4">
				{STAT_CARDS.map((stat) => (
					<Card key={stat.label} className="shadow-warm rounded-2xl">
						<Card.Content className="p-6">
							<div className="mb-4 flex items-center justify-between">
								<p className="text-muted-foreground text-sm">{stat.label}</p>
								<div className={`flex size-10 items-center justify-center rounded-2xl ${stat.iconBg}`}>{stat.icon}</div>
							</div>
							<p className="text-foreground text-3xl leading-none font-extrabold">
								{stat.value}
								<span className="text-muted-foreground ml-1 text-sm font-normal">{stat.suffix}</span>
							</p>
							<p className="text-success mt-2 text-sm">{stat.change}</p>
						</Card.Content>
					</Card>
				))}
			</div>

			{/* 차트 2개 — 2열 나란히 */}
			<div className="grid grid-cols-2 gap-4">
				{/* 최근 7일 인증 현황 차트 */}
				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="flex items-center gap-2 text-sm">
							<BarChart3 className="text-primary size-4" aria-hidden="true" />
							최근 7일 인증 현황
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<CheckinBarChart data={MOCK_DAILY_CHECKINS} height={300} />
					</Card.Content>
				</Card>

				{/* 카테고리별 챌린지 분포 차트 */}
				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="flex items-center gap-2 text-sm">
							<Trophy className="text-primary size-4" aria-hidden="true" />
							카테고리별 챌린지 분포
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<CategoryPieChart data={MOCK_CATEGORY_DISTRIBUTION} height={300} />
					</Card.Content>
				</Card>
			</div>

			{/* 최근 챌린지 + 최근 사용자 — 2열 나란히 */}
			<div className="grid grid-cols-2 gap-4">
				{/* 최근 생성된 챌린지 */}
				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="text-sm">최근 생성된 챌린지</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul className="space-y-4" role="list" aria-label="최근 챌린지 목록">
							{RECENT_CHALLENGES.map((challenge) => (
								<li key={challenge.id} className="flex items-center justify-between">
									<div className="min-w-0 flex-1">
										<p className="text-foreground truncate text-sm font-medium">{challenge.title}</p>
										<p className="text-muted-foreground mt-0.5 text-xs">
											{challenge.duration_days}일 · 참여자 {challenge.current_participants}명
										</p>
									</div>
									<Badge variant={STATUS_VARIANT[challenge.status]} className="ml-3 shrink-0 text-xs">
										{STATUS_LABELS[challenge.status]}
									</Badge>
								</li>
							))}
						</ul>
					</Card.Content>
				</Card>

				{/* 최근 가입 사용자 */}
				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="text-sm">최근 가입 사용자</Card.Title>
					</Card.Header>
					<Card.Content>
						<ul className="space-y-4" role="list" aria-label="최근 가입 사용자 목록">
							{RECENT_USERS.map((user) => (
								<li key={user.id} className="flex items-center gap-3">
									<div
										className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
										aria-hidden="true"
									>
										{user.nickname.charAt(0)}
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-foreground truncate text-sm font-medium">{user.nickname}</p>
										<p className="text-muted-foreground truncate text-xs">{user.email}</p>
									</div>
									<Badge variant={user.is_active ? "secondary" : "outline"} className="shrink-0 text-xs">
										{user.is_active ? "활성" : "비활성"}
									</Badge>
								</li>
							))}
						</ul>
					</Card.Content>
				</Card>
			</div>
		</div>
	);
}
