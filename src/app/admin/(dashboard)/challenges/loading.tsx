import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Table } from "@/shared/ui/Table";

export default function AdminChallengesLoading() {
	return (
		<div className="space-y-6 p-8">
			{/* 헤더 */}
			<div>
				<Skeleton className="h-8 w-36" />
				<Skeleton className="mt-2 h-5 w-64" />
			</div>

			{/* 필터 카드 */}
			<Card>
				<Card.Content className="pt-6">
					<div className="flex gap-3">
						<Skeleton className="h-9 w-32" />
						<Skeleton className="h-9 w-36" />
					</div>
				</Card.Content>
			</Card>

			{/* 테이블 */}
			<Card>
				<Table>
					<Table.Header>
						<Table.Row>
							{["챌린지 제목", "운영자", "카테고리", "상태", "참여자", "기간", "생성일", "관리"].map((head) => (
								<Table.Head key={head} className="pl-4">
									{head}
								</Table.Head>
							))}
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{Array.from({ length: 8 }).map((_, i) => (
							<Table.Row key={i}>
								<Table.Cell className="pl-4">
									<Skeleton className="h-4 w-36" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-16" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-16" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-5 w-14 rounded-full" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-12" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-10" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-20" />
								</Table.Cell>
								<Table.Cell className="pr-4">
									<Skeleton className="ml-auto size-8 rounded-md" />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Card>
		</div>
	);
}
