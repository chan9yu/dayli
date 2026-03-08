"use client";

import { BarChart3, LineChart as LineChartIcon, Users } from "lucide-react";
import { useState } from "react";

import { ChallengeBarChart, CheckinBarChart, SignupLineChart } from "@/features/admin/components/StatsChart";
import { MOCK_DAILY_CHALLENGES, MOCK_DAILY_CHECKINS, MOCK_DAILY_SIGNUPS } from "@/shared/mocks/adminStats";
import { Card } from "@/shared/ui/Card";
import { cn } from "@/shared/utils/cn";

type Period = "7d" | "30d" | "90d";

const PERIOD_LABELS: Record<Period, string> = {
	"7d": "7일",
	"30d": "30일",
	"90d": "90일"
};

const PERIOD_DAYS: Record<Period, number> = {
	"7d": 7,
	"30d": 30,
	"90d": 90
};

const sliceByPeriod = <T,>(data: T[], period: Period): T[] => {
	return data.slice(-PERIOD_DAYS[period]);
};

const PERIOD_LIST: Period[] = ["7d", "30d", "90d"];

export default function AdminStatsPage() {
	const [period, setPeriod] = useState<Period>("7d");

	const signupData = sliceByPeriod(MOCK_DAILY_SIGNUPS, period);
	const checkinData = sliceByPeriod(MOCK_DAILY_CHECKINS, period);
	const challengeData = sliceByPeriod(MOCK_DAILY_CHALLENGES, period);

	const totalSignups = signupData.reduce((sum, d) => sum + d.count, 0);
	const totalCheckins = checkinData.reduce((sum, d) => sum + d.count, 0);
	const totalChallenges = challengeData.reduce((sum, d) => sum + d.count, 0);

	const handlePeriodChange = (value: Period) => {
		setPeriod(value);
	};

	// 탭 키보드 네비게이션 (roving tabindex 패턴)
	const handleTabKeyDown = (e: React.KeyboardEvent) => {
		const currentIndex = PERIOD_LIST.indexOf(period);
		let nextIndex = currentIndex;
		if (e.key === "ArrowRight") {
			nextIndex = (currentIndex + 1) % PERIOD_LIST.length;
		} else if (e.key === "ArrowLeft") {
			nextIndex = (currentIndex - 1 + PERIOD_LIST.length) % PERIOD_LIST.length;
		} else {
			return;
		}
		e.preventDefault();
		const nextPeriod = PERIOD_LIST[nextIndex];
		if (!nextPeriod) return;
		handlePeriodChange(nextPeriod);
		const target = (e.currentTarget as HTMLElement).children[nextIndex] as HTMLElement;
		target?.focus();
	};

	return (
		<div className="space-y-6 p-8">
			{/* 페이지 헤더 */}
			<div>
				<h1 className="text-foreground text-2xl font-bold">통계</h1>
				<p className="text-muted-foreground text-sm">서비스 성장 지표를 기간별로 분석하세요</p>
			</div>

			{/* 기간 선택 pill 탭 */}
			<div className="flex gap-2" role="tablist" aria-label="기간 선택" onKeyDown={handleTabKeyDown}>
				{PERIOD_LIST.map((key) => (
					<button
						key={key}
						role="tab"
						aria-selected={period === key}
						tabIndex={period === key ? 0 : -1}
						onClick={() => handlePeriodChange(key)}
						className={cn(
							"rounded-full px-5 py-2 text-sm font-medium transition-colors",
							period === key
								? "bg-primary text-primary-foreground"
								: "bg-muted text-muted-foreground hover:text-foreground"
						)}
					>
						최근 {PERIOD_LABELS[key]}
					</button>
				))}
			</div>

			{/* 기간별 요약 카드 3개 */}
			<div className="grid grid-cols-3 gap-4">
				<Card className="shadow-warm rounded-2xl">
					<Card.Content className="p-5">
						<div className="mb-3 flex items-center justify-between">
							<p className="text-muted-foreground text-sm">신규 가입</p>
							<div className="bg-primary/10 flex size-8 items-center justify-center rounded-lg">
								<Users className="text-primary size-4" aria-hidden="true" />
							</div>
						</div>
						<p className="text-foreground text-3xl leading-none font-extrabold">{totalSignups.toLocaleString()}</p>
						<p className="text-muted-foreground mt-1 text-sm">명</p>
					</Card.Content>
				</Card>

				<Card className="shadow-warm rounded-2xl">
					<Card.Content className="p-5">
						<div className="mb-3 flex items-center justify-between">
							<p className="text-muted-foreground text-sm">인증 수</p>
							<div className="bg-success/10 flex size-8 items-center justify-center rounded-lg">
								<BarChart3 className="text-success size-4" aria-hidden="true" />
							</div>
						</div>
						<p className="text-foreground text-3xl leading-none font-extrabold">{totalCheckins.toLocaleString()}</p>
						<p className="text-muted-foreground mt-1 text-sm">건</p>
					</Card.Content>
				</Card>

				<Card className="shadow-warm rounded-2xl">
					<Card.Content className="p-5">
						<div className="mb-3 flex items-center justify-between">
							<p className="text-muted-foreground text-sm">챌린지</p>
							<div className="bg-warning/10 flex size-8 items-center justify-center rounded-lg">
								<BarChart3 className="text-warning size-4" aria-hidden="true" />
							</div>
						</div>
						<p className="text-foreground text-3xl leading-none font-extrabold">{totalChallenges.toLocaleString()}</p>
						<p className="text-muted-foreground mt-1 text-sm">개</p>
					</Card.Content>
				</Card>
			</div>

			{/* 첫 번째 행: 신규 가입 + 챌린지 생성 (2열) */}
			<div className="grid grid-cols-2 gap-4">
				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="flex items-center gap-2 text-sm">
							<LineChartIcon className="text-primary size-4" aria-hidden="true" />
							일별 신규 가입자 추이
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<SignupLineChart data={signupData} height={320} />
					</Card.Content>
				</Card>

				<Card className="shadow-warm rounded-2xl">
					<Card.Header className="pb-2">
						<Card.Title className="flex items-center gap-2 text-sm">
							<BarChart3 className="text-warning size-4" aria-hidden="true" />
							일별 챌린지 생성 수
						</Card.Title>
					</Card.Header>
					<Card.Content>
						<ChallengeBarChart data={challengeData} height={320} />
					</Card.Content>
				</Card>
			</div>

			{/* 두 번째 행: 인증 업로드 (전체 너비) */}
			<Card className="shadow-warm rounded-2xl">
				<Card.Header className="pb-2">
					<Card.Title className="flex items-center gap-2 text-sm">
						<BarChart3 className="text-success size-4" aria-hidden="true" />
						일별 인증 업로드 수
					</Card.Title>
				</Card.Header>
				<Card.Content>
					<CheckinBarChart data={checkinData} height={320} />
				</Card.Content>
			</Card>
		</div>
	);
}
