"use client";

import { useState } from "react";

import { ChallengeCard } from "@/features/challenges/components/ChallengeCard";
import type { ChallengeCategory, ChallengeStatus } from "@/features/challenges/types/challenge";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { Button } from "@/shared/ui/Button";
import { Select } from "@/shared/ui/Select";
import { cn } from "@/shared/utils/cn";

type FilterCategory = "all" | ChallengeCategory;
type FilterDuration = "all" | "7" | "14" | "21" | "30";
type FilterStatus = "all" | ChallengeStatus;
type SortOption = "latest" | "popular" | "deadline";

const CATEGORY_TABS: { value: FilterCategory; label: string }[] = [
	{ value: "all", label: "전체" },
	{ value: "health", label: "건강·운동" },
	{ value: "study", label: "학습" },
	{ value: "lifestyle", label: "생활습관" },
	{ value: "other", label: "기타" }
];

export default function ChallengesPage() {
	const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");
	const [selectedDuration, setSelectedDuration] = useState<FilterDuration>("all");
	const [selectedStatus, setSelectedStatus] = useState<FilterStatus>("all");
	const [sortOption, setSortOption] = useState<SortOption>("latest");

	const filteredChallenges = MOCK_CHALLENGES.filter((c) => {
		if (c.status === "hidden") return false;
		if (selectedCategory !== "all" && c.category !== selectedCategory) return false;
		if (selectedDuration !== "all" && c.duration_days !== Number(selectedDuration)) return false;
		if (selectedStatus !== "all" && c.status !== selectedStatus) return false;
		return true;
	}).sort((a, b) => {
		if (sortOption === "popular") return b.current_participants - a.current_participants;
		if (sortOption === "deadline") {
			return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
		}
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	const handleCategoryChange = (value: FilterCategory) => setSelectedCategory(value);
	const handleDurationChange = (value: string) => setSelectedDuration(value as FilterDuration);
	const handleStatusChange = (value: string) => setSelectedStatus(value as FilterStatus);
	const handleSortChange = (value: string) => setSortOption(value as SortOption);

	const handleResetFilters = () => {
		setSelectedCategory("all");
		setSelectedDuration("all");
		setSelectedStatus("all");
	};

	return (
		<div className="px-5 pb-24">
			{/* 페이지 헤더 */}
			<div className="pt-6 pb-2">
				<h1 className="text-foreground text-xl font-bold">챌린지 탐색</h1>
			</div>

			{/* 카테고리 필터 pill 탭 */}
			<div className="py-3">
				<div
					className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"
					role="tablist"
					aria-label="카테고리 필터"
				>
					{CATEGORY_TABS.map((tab) => (
						<button
							key={tab.value}
							role="tab"
							aria-selected={selectedCategory === tab.value}
							onClick={() => handleCategoryChange(tab.value)}
							className={cn(
								"shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
								selectedCategory === tab.value ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
							)}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			{/* 필터/정렬 영역 */}
			<div className="flex items-center gap-2 py-2">
				<Select value={selectedDuration} onValueChange={handleDurationChange}>
					<Select.Trigger className="h-8 w-24 rounded-xl text-xs" aria-label="기간 필터">
						<Select.Value placeholder="기간" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="all">전체 기간</Select.Item>
						<Select.Item value="7">7일</Select.Item>
						<Select.Item value="14">14일</Select.Item>
						<Select.Item value="21">21일</Select.Item>
						<Select.Item value="30">30일</Select.Item>
					</Select.Content>
				</Select>

				<Select value={selectedStatus} onValueChange={handleStatusChange}>
					<Select.Trigger className="h-8 w-24 rounded-xl text-xs" aria-label="상태 필터">
						<Select.Value placeholder="상태" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="all">전체 상태</Select.Item>
						<Select.Item value="recruiting">모집중</Select.Item>
						<Select.Item value="in_progress">진행중</Select.Item>
						<Select.Item value="finished">종료</Select.Item>
					</Select.Content>
				</Select>

				<div className="ml-auto">
					<Select value={sortOption} onValueChange={handleSortChange}>
						<Select.Trigger className="h-8 w-24 rounded-xl text-xs" aria-label="정렬 옵션">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="latest">최신순</Select.Item>
							<Select.Item value="popular">인기순</Select.Item>
							<Select.Item value="deadline">마감순</Select.Item>
						</Select.Content>
					</Select>
				</div>
			</div>

			{/* 결과 개수 */}
			<p className="text-muted-foreground mb-3 text-xs">
				총 <span className="text-foreground font-medium">{filteredChallenges.length}</span>개
			</p>

			{/* 챌린지 카드 리스트 */}
			{filteredChallenges.length > 0 ? (
				<>
					<div className="animate-stagger grid grid-cols-1 gap-3">
						{filteredChallenges.map((challenge) => (
							<ChallengeCard key={challenge.id} challenge={challenge} />
						))}
					</div>
					<div className="mt-8 flex justify-center">
						<p className="text-muted-foreground text-xs">모든 챌린지를 불러왔습니다.</p>
					</div>
				</>
			) : (
				<div className="flex flex-col items-center justify-center py-24 text-center">
					<p className="mb-3 text-5xl" role="img" aria-label="검색 결과 없음">
						🔍
					</p>
					<h3 className="text-foreground mb-1 font-semibold">조건에 맞는 챌린지가 없어요</h3>
					<p className="text-muted-foreground mb-5 text-sm">다른 필터 조건으로 검색해보세요.</p>
					<Button variant="outline" className="rounded-xl" onClick={handleResetFilters}>
						필터 초기화
					</Button>
				</div>
			)}
		</div>
	);
}
