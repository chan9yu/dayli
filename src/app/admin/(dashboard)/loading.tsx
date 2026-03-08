import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function AdminLoading() {
	return (
		<div className="space-y-6 p-8">
			{/* 헤더 */}
			<div>
				<Skeleton className="h-8 w-48" />
				<Skeleton className="mt-2 h-5 w-64" />
			</div>

			{/* 핵심 지표 카드 4개 */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={i}>
						<Card.Content className="pt-6">
							<div className="flex items-center justify-between">
								<div className="space-y-2">
									<Skeleton className="h-4 w-28" />
									<Skeleton className="h-8 w-20" />
									<Skeleton className="h-3 w-24" />
								</div>
								<Skeleton className="size-10 rounded-lg" />
							</div>
						</Card.Content>
					</Card>
				))}
			</div>

			{/* 차트 섹션 */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{Array.from({ length: 2 }).map((_, i) => (
					<Card key={i}>
						<Card.Header>
							<Skeleton className="h-6 w-40" />
						</Card.Header>
						<Card.Content>
							<Skeleton className="h-60 w-full" />
						</Card.Content>
					</Card>
				))}
			</div>

			{/* 최근 데이터 섹션 */}
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{Array.from({ length: 2 }).map((_, i) => (
					<Card key={i}>
						<Card.Header>
							<Skeleton className="h-6 w-36" />
						</Card.Header>
						<Card.Content>
							<div className="space-y-3">
								{Array.from({ length: 5 }).map((_, j) => (
									<div key={j} className="flex items-center justify-between">
										<div className="space-y-1">
											<Skeleton className="h-4 w-40" />
											<Skeleton className="h-3 w-28" />
										</div>
										<Skeleton className="h-5 w-12" />
									</div>
								))}
							</div>
						</Card.Content>
					</Card>
				))}
			</div>
		</div>
	);
}
