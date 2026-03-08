import { Card } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Table } from "@/shared/ui/Table";

export default function AdminUsersLoading() {
	return (
		<div className="space-y-6 p-8">
			{/* 헤더 */}
			<div>
				<Skeleton className="h-8 w-36" />
				<Skeleton className="mt-2 h-5 w-64" />
			</div>

			{/* 검색 카드 */}
			<Card>
				<Card.Content className="pt-6">
					<Skeleton className="h-9 w-72" />
				</Card.Content>
			</Card>

			{/* 테이블 */}
			<Card>
				<Table>
					<Table.Header>
						<Table.Row>
							{["사용자", "이메일", "역할", "상태", "가입일", "관리"].map((head) => (
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
									<div className="flex items-center gap-3">
										<Skeleton className="size-8 rounded-full" />
										<Skeleton className="h-4 w-20" />
									</div>
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-40" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-5 w-12 rounded-full" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-5 w-12 rounded-full" />
								</Table.Cell>
								<Table.Cell>
									<Skeleton className="h-4 w-20" />
								</Table.Cell>
								<Table.Cell className="pr-4">
									<Skeleton className="ml-auto h-8 w-20" />
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
			</Card>
		</div>
	);
}
