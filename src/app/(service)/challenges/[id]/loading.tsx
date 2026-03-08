import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function ChallengeDetailLoading() {
	return (
		<div className="px-5 pt-6 pb-24">
			{/* 썸네일 */}
			<Skeleton className="aspect-video w-full rounded-2xl" />

			{/* 배지 */}
			<div className="mt-5 flex gap-2">
				<Skeleton className="h-6 w-16 rounded-full" />
				<Skeleton className="h-6 w-14 rounded-full" />
				<Skeleton className="h-6 w-12 rounded-full" />
			</div>

			{/* 제목 */}
			<Skeleton className="mt-4 h-7 w-3/4 rounded-lg" />

			{/* 설명 */}
			<div className="mt-3 space-y-2">
				<Skeleton className="h-4 w-full rounded-lg" />
				<Skeleton className="h-4 w-full rounded-lg" />
				<Skeleton className="h-4 w-2/3 rounded-lg" />
			</div>

			{/* 인증 방법 카드 */}
			<Card className="mt-6">
				<Card.Content className="space-y-3 pt-6">
					<Skeleton className="h-5 w-32 rounded-lg" />
					<Skeleton className="h-4 w-full rounded-lg" />
					<Skeleton className="h-4 w-5/6 rounded-lg" />
				</Card.Content>
			</Card>

			{/* 참여 액션 */}
			<div className="mt-6 space-y-3">
				<div className="flex items-center justify-between">
					<Skeleton className="h-5 w-28 rounded-lg" />
					<Skeleton className="h-5 w-16 rounded-lg" />
				</div>
				<Skeleton className="h-2 w-full rounded-full" />
				<Skeleton className="h-12 w-full rounded-xl" />
			</div>

			{/* 인증 현황 그리드 */}
			<Card className="mt-6">
				<Card.Header>
					<Skeleton className="h-6 w-40 rounded-lg" />
				</Card.Header>
				<Card.Content>
					<div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="flex flex-col items-center gap-1.5">
								<Skeleton className="size-12 rounded-full" />
								<Skeleton className="h-3 w-10 rounded-lg" />
							</div>
						))}
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
