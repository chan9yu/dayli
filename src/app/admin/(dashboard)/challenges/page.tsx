"use client";

import { Trash2, Users } from "lucide-react";
import { useState } from "react";

import type { ChallengeStatus } from "@/features/challenges/types/challenge";
import { CATEGORY_LABELS, STATUS_LABELS, STATUS_LIST, STATUS_VARIANT } from "@/features/challenges/types/constants";
import { MOCK_CHALLENGES } from "@/shared/mocks/challenges";
import { MOCK_USERS } from "@/shared/mocks/users";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Dialog } from "@/shared/ui/Dialog";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";
import { Select } from "@/shared/ui/Select";
import { cn } from "@/shared/utils/cn";
import { formatDate } from "@/shared/utils/formatDate";

const PAGE_SIZE = 20;

const CATEGORY_FILTER_LABELS: Record<string, string> = {
	all: "전체 카테고리",
	...CATEGORY_LABELS
};

const STATUS_FILTER_LABELS: Record<string, string> = {
	all: "전체 상태",
	...STATUS_LABELS
};

const getUserNickname = (userId: string) => {
	const user = MOCK_USERS.find((u) => u.id === userId);
	return user?.nickname ?? "알 수 없음";
};

export default function AdminChallengesPage() {
	const [challenges, setChallenges] = useState(MOCK_CHALLENGES);
	const [statusFilter, setStatusFilter] = useState("all");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

	const filtered = challenges.filter((c) => {
		const matchStatus = statusFilter === "all" || c.status === statusFilter;
		const matchCategory = categoryFilter === "all" || c.category === categoryFilter;
		return matchStatus && matchCategory;
	});

	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	const handleStatusFilterChange = (value: string) => {
		setStatusFilter(value);
		setCurrentPage(1);
	};

	const handleCategoryFilterChange = (value: string) => {
		setCategoryFilter(value);
		setCurrentPage(1);
	};

	const handleStatusChange = (challengeId: string, newStatus: ChallengeStatus) => {
		// TODO: Phase 6에서 실제 상태 변경 API 연동
		setChallenges((prev) => prev.map((c) => (c.id === challengeId ? { ...c, status: newStatus } : c)));
	};

	const handleDeleteConfirm = () => {
		if (!deleteTargetId) return;
		// TODO: Phase 6에서 실제 삭제 API 연동
		setChallenges((prev) => prev.filter((c) => c.id !== deleteTargetId));
		setDeleteTargetId(null);
	};

	const handleDeleteCancel = () => {
		setDeleteTargetId(null);
	};

	const handlePagePrev = () => {
		setCurrentPage((p) => Math.max(1, p - 1));
	};

	const handlePageNext = () => {
		setCurrentPage((p) => Math.min(totalPages, p + 1));
	};

	const deleteTarget = deleteTargetId ? challenges.find((c) => c.id === deleteTargetId) : null;

	return (
		<div className="space-y-6 p-8">
			{/* 페이지 헤더 */}
			<div>
				<h1 className="text-foreground text-2xl font-bold">챌린지 관리</h1>
				<p className="text-muted-foreground text-sm">전체 챌린지를 조회하고 상태를 관리하세요</p>
			</div>

			{/* 필터 영역 */}
			<div className="flex items-center gap-3">
				<Select value={statusFilter} onValueChange={handleStatusFilterChange}>
					<Select.Trigger className="h-9 w-40 rounded-xl text-sm">
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						{Object.entries(STATUS_FILTER_LABELS).map(([value, label]) => (
							<Select.Item key={value} value={value} className="text-sm">
								{label}
							</Select.Item>
						))}
					</Select.Content>
				</Select>

				<Select value={categoryFilter} onValueChange={handleCategoryFilterChange}>
					<Select.Trigger className="h-9 w-40 rounded-xl text-sm">
						<Select.Value />
					</Select.Trigger>
					<Select.Content>
						{Object.entries(CATEGORY_FILTER_LABELS).map(([value, label]) => (
							<Select.Item key={value} value={value} className="text-sm">
								{label}
							</Select.Item>
						))}
					</Select.Content>
				</Select>

				<span className="text-muted-foreground ml-auto text-sm">총 {filtered.length}개</span>
			</div>

			{/* 챌린지 데이터 테이블 */}
			<Card className="shadow-warm overflow-hidden rounded-2xl">
				<div className="overflow-x-auto">
					<table className="w-full" aria-label="챌린지 목록">
						<thead>
							<tr className="bg-muted/50 border-b">
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									제목
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									운영자
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									상태
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									기간
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									참여자
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									생성일
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									관리
								</th>
							</tr>
						</thead>
						<tbody>
							{paginated.length === 0 ? (
								<tr>
									<td colSpan={7} className="text-muted-foreground py-16 text-center text-sm">
										챌린지가 없습니다.
									</td>
								</tr>
							) : (
								paginated.map((challenge) => (
									<tr key={challenge.id} className="border-border/50 hover:bg-muted/30 border-b last:border-0">
										<td className="px-4 py-3 text-sm">
											<span className="text-foreground block max-w-[200px] truncate font-medium">
												{challenge.title}
											</span>
										</td>
										<td className="text-muted-foreground px-4 py-3 text-sm">{getUserNickname(challenge.created_by)}</td>
										<td className="px-4 py-3 text-sm">
											<Badge variant={STATUS_VARIANT[challenge.status]} className="text-xs">
												{STATUS_LABELS[challenge.status]}
											</Badge>
										</td>
										<td className="text-muted-foreground px-4 py-3 text-sm">{challenge.duration_days}일</td>
										<td className="text-muted-foreground px-4 py-3 text-sm">
											<span className="flex items-center gap-1">
												<Users className="size-3.5" aria-hidden="true" />
												{challenge.current_participants} / {challenge.max_participants}명
											</span>
										</td>
										<td className="text-muted-foreground px-4 py-3 text-sm">{formatDate(challenge.created_at)}</td>
										<td className="px-4 py-3 text-sm">
											<DropdownMenu>
												<DropdownMenu.Trigger asChild>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 rounded-xl px-3 text-xs"
														aria-label={`${challenge.title} 관리`}
													>
														관리
													</Button>
												</DropdownMenu.Trigger>
												<DropdownMenu.Content align="end" className="w-40">
													<DropdownMenu.Label className="text-xs font-medium">상태 변경</DropdownMenu.Label>
													<DropdownMenu.Separator />
													{STATUS_LIST.map((status) => (
														<DropdownMenu.Item
															key={status}
															disabled={challenge.status === status}
															onClick={() => handleStatusChange(challenge.id, status)}
															className={cn("text-sm", challenge.status === status && "text-muted-foreground")}
														>
															{STATUS_LABELS[status]}
														</DropdownMenu.Item>
													))}
													<DropdownMenu.Separator />
													<DropdownMenu.Item
														className="text-destructive focus:text-destructive text-sm"
														onClick={() => setDeleteTargetId(challenge.id)}
													>
														<Trash2 className="size-3.5" aria-hidden="true" />
														강제 삭제
													</DropdownMenu.Item>
												</DropdownMenu.Content>
											</DropdownMenu>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</Card>

			{/* 페이지네이션 */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between pt-4">
					<span className="text-muted-foreground text-sm">
						{currentPage} / {totalPages} 페이지
					</span>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={handlePagePrev}
							disabled={currentPage === 1}
							className="h-8 rounded-xl text-xs"
						>
							이전
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={handlePageNext}
							disabled={currentPage === totalPages}
							className="h-8 rounded-xl text-xs"
						>
							다음
						</Button>
					</div>
				</div>
			)}

			{/* 삭제 확인 다이얼로그 */}
			<Dialog open={!!deleteTargetId} onOpenChange={handleDeleteCancel}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>챌린지 강제 삭제</Dialog.Title>
						<Dialog.Description>
							{deleteTarget ? (
								<>
									<span className="font-medium">&quot;{deleteTarget.title}&quot;</span> 챌린지를 영구 삭제합니다. 이
									작업은 되돌릴 수 없습니다.
								</>
							) : (
								"챌린지를 영구 삭제합니다. 이 작업은 되돌릴 수 없습니다."
							)}
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Button variant="outline" onClick={handleDeleteCancel}>
							취소
						</Button>
						<Button variant="destructive" onClick={handleDeleteConfirm}>
							삭제
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog>
		</div>
	);
}
