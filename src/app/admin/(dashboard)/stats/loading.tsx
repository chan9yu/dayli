import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function AdminStatsLoading() {
	return (
		<div className="space-y-6 p-8">
			{/* 헤더 */}
			<div>
				<Skeleton className="h-8 w-32" />
				<Skeleton className="mt-2 h-5 w-56" />
			</div>

			{/* 기간 선택 pill 탭 */}
			<div className="flex gap-2">
				{Array.from({ length: 3 }).map((_, i) => (
					<Skeleton key={i} className="h-9 w-24 rounded-full" />
				))}
			</div>

			{/* 기간별 요약 카드 3개 */}
			<div className="grid grid-cols-3 gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<Card key={i} className="rounded-2xl">
						<Card.Content className="p-5">
							<div className="mb-3 flex items-center justify-between">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="size-8 rounded-lg" />
							</div>
							<Skeleton className="h-9 w-16" />
							<Skeleton className="mt-1 h-4 w-8" />
						</Card.Content>
					</Card>
				))}
			</div>

			{/* 차트 2열 */}
			<div className="grid grid-cols-2 gap-4">
				{Array.from({ length: 2 }).map((_, i) => (
					<Card key={i} className="rounded-2xl">
						<Card.Header className="pb-2">
							<Skeleton className="h-5 w-44" />
						</Card.Header>
						<Card.Content>
							<Skeleton className="h-80 w-full" />
						</Card.Content>
					</Card>
				))}
			</div>

			{/* 차트 전체 너비 */}
			<Card className="rounded-2xl">
				<Card.Header className="pb-2">
					<Skeleton className="h-5 w-44" />
				</Card.Header>
				<Card.Content>
					<Skeleton className="h-80 w-full" />
				</Card.Content>
			</Card>
		</div>
	);
}
