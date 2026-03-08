"use client";

import { CheckCircle, ChevronLeft, ChevronRight, Image } from "lucide-react";
import { useState } from "react";

import type { ChallengeCheckin } from "@/features/checkins/types/checkin";
import { Button } from "@/shared/ui/Button";
import { Dialog } from "@/shared/ui/Dialog";
import { cn } from "@/shared/utils/cn";

type CheckinCalendarProps = {
	checkins: ChallengeCheckin[];
	startDate: string;
	endDate: string;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export function CheckinCalendar({ checkins, startDate, endDate }: CheckinCalendarProps) {
	const today = new Date();
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [selectedCheckin, setSelectedCheckin] = useState<ChallengeCheckin | null>(null);

	const checkinMap = new Map(checkins.map((c) => [c.check_in_date, c]));
	const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

	const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
	const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
	const startPadding = firstDayOfMonth.getDay();
	const totalDays = lastDayOfMonth.getDate();

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentYear((y) => y - 1);
			setCurrentMonth(11);
		} else {
			setCurrentMonth((m) => m - 1);
		}
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentYear((y) => y + 1);
			setCurrentMonth(0);
		} else {
			setCurrentMonth((m) => m + 1);
		}
	};

	const handleDayClick = (dateStr: string) => {
		const checkin = checkinMap.get(dateStr);
		if (checkin) {
			setSelectedCheckin(checkin);
		}
	};

	const handleDialogClose = (open: boolean) => {
		if (!open) setSelectedCheckin(null);
	};

	// 완료된 인증 수 계산
	const completedCount = checkins.length;
	const challengeStart = new Date(startDate);
	const challengeEnd = new Date(endDate);
	const totalChallengeDays = Math.ceil((challengeEnd.getTime() - challengeStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

	return (
		<div className="space-y-4">
			{/* 인증률 통계 */}
			<div className="bg-muted/50 rounded-xl p-4 text-center">
				<p className="text-muted-foreground mb-1 text-sm">전체 인증률</p>
				<p className="text-foreground text-2xl font-bold">
					{completedCount}일 / {totalChallengeDays}일
				</p>
				<p className="text-primary text-sm font-medium">
					{totalChallengeDays > 0 ? Math.round((completedCount / totalChallengeDays) * 100) : 0}% 달성
				</p>
			</div>

			{/* 달력 헤더 */}
			<div className="flex items-center justify-between">
				<Button variant="ghost" size="icon" onClick={handlePrevMonth} aria-label="이전 달">
					<ChevronLeft className="size-4" aria-hidden="true" />
				</Button>
				<h3 className="text-foreground font-semibold">
					{currentYear}년 {currentMonth + 1}월
				</h3>
				<Button variant="ghost" size="icon" onClick={handleNextMonth} aria-label="다음 달">
					<ChevronRight className="size-4" aria-hidden="true" />
				</Button>
			</div>

			{/* 요일 헤더 */}
			<div className="grid grid-cols-7 text-center">
				{WEEKDAYS.map((day, index) => (
					<div
						key={day}
						className={cn(
							"text-muted-foreground py-2 text-xs font-medium",
							index === 0 && "text-red-500",
							index === 6 && "text-blue-500"
						)}
					>
						{day}
					</div>
				))}
			</div>

			{/* 날짜 그리드 */}
			<div className="grid grid-cols-7 gap-1">
				{/* 첫 주 빈 칸 */}
				{Array.from({ length: startPadding }).map((_, i) => (
					<div key={`empty-${i}`} />
				))}

				{/* 날짜 */}
				{Array.from({ length: totalDays }).map((_, i) => {
					const day = i + 1;
					const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
					const hasCheckin = checkinMap.has(dateStr);
					const isToday = dateStr === todayStr;
					const dayOfWeek = (startPadding + i) % 7;
					const isInChallengeRange = dateStr >= startDate && dateStr <= endDate;

					return (
						<button
							type="button"
							key={day}
							onClick={() => handleDayClick(dateStr)}
							disabled={!hasCheckin}
							className={cn(
								"relative flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition-colors",
								hasCheckin ? "bg-primary/10 hover:bg-primary/20 cursor-pointer" : "cursor-default",
								isToday && "ring-primary ring-2",
								!isInChallengeRange && "opacity-30",
								dayOfWeek === 0 && "text-red-500",
								dayOfWeek === 6 && "text-blue-500"
							)}
							aria-label={`${dateStr} ${hasCheckin ? "인증 완료" : ""}`}
						>
							<span className="text-xs font-medium">{day}</span>
							{hasCheckin && (
								<CheckCircle className="text-primary absolute -top-0.5 -right-0.5 size-3.5" aria-hidden="true" />
							)}
						</button>
					);
				})}
			</div>

			{/* 인증 상세 모달 */}
			<Dialog open={!!selectedCheckin} onOpenChange={handleDialogClose}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title className="flex items-center gap-2">
							<CheckCircle className="text-primary size-5" aria-hidden="true" />
							인증 기록
						</Dialog.Title>
						<Dialog.Description>{selectedCheckin?.check_in_date}의 인증 사진</Dialog.Description>
					</Dialog.Header>

					{selectedCheckin && (
						<div className="space-y-4">
							{selectedCheckin.image_url ? (
								<div className="aspect-video overflow-hidden rounded-lg">
									<img src={selectedCheckin.image_url} alt="인증 사진" className="size-full object-cover" />
								</div>
							) : (
								<div className="bg-muted flex aspect-video items-center justify-center rounded-lg">
									<Image className="text-muted-foreground size-10" aria-hidden="true" />
								</div>
							)}
							{selectedCheckin.memo && (
								<div className="bg-muted rounded-lg p-3">
									<p className="text-muted-foreground mb-1 text-xs">메모</p>
									<p className="text-foreground text-sm">{selectedCheckin.memo}</p>
								</div>
							)}
						</div>
					)}
				</Dialog.Content>
			</Dialog>
		</div>
	);
}
