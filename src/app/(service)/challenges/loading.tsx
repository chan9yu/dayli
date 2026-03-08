import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";

function ChallengeCardSkeleton() {
	return (
		<Card className="overflow-hidden rounded-2xl">
			{/* 썸네일 — 실제 카드와 동일한 aspect-ratio */}
			<Skeleton className="aspect-[2/1] w-full rounded-none" />
			<div className="p-4">
				{/* 배지 */}
				<Skeleton className="mb-2.5 h-5 w-14 rounded-full" />
				{/* 제목 */}
				<Skeleton className="mb-1 h-[18px] w-3/4 rounded-lg" />
				{/* 설명 */}
				<Skeleton className="mb-3.5 h-3.5 w-full rounded-lg" />
				{/* 메타 정보 */}
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<Skeleton className="h-3.5 w-12 rounded-lg" />
						<Skeleton className="h-3.5 w-16 rounded-lg" />
						<Skeleton className="ml-auto h-3.5 w-16 rounded-lg" />
					</div>
					{/* 프로그레스바 */}
					<Skeleton className="h-1 w-full rounded-full" />
				</div>
			</div>
		</Card>
	);
}

export default function ChallengesLoading() {
	return (
		<div className="px-5 pt-6 pb-24">
			{/* 헤더 */}
			<div className="mb-6">
				<Skeleton className="h-8 w-40 rounded-lg" />
				<Skeleton className="mt-2 h-5 w-64 rounded-lg" />
			</div>

			{/* 카테고리 필터 탭 */}
			<div className="mb-6 flex gap-2 overflow-x-auto pb-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<Skeleton key={i} className="h-9 w-20 shrink-0 rounded-full" />
				))}
			</div>

			{/* 필터 옵션 */}
			<div className="mb-6 flex gap-3">
				<Skeleton className="h-9 w-28 rounded-xl" />
				<Skeleton className="h-9 w-28 rounded-xl" />
				<Skeleton className="ml-auto h-9 w-32 rounded-xl" />
			</div>

			{/* 챌린지 카드 그리드 */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<ChallengeCardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
