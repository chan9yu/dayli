"use client";

import { Search, Shield, UserCheck, UserX } from "lucide-react";
import { useState } from "react";

import type { User } from "@/features/auth/types/user";
import { MOCK_USERS } from "@/shared/mocks/users";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { formatDate } from "@/shared/utils/formatDate";

const PAGE_SIZE = 10;

type UserTableRowProps = {
	user: User;
	onToggleActive: (userId: string, isActive: boolean) => void;
};

function UserTableRow({ user, onToggleActive }: UserTableRowProps) {
	const handleToggle = () => {
		onToggleActive(user.id, !user.is_active);
	};

	return (
		<tr className="border-border/50 hover:bg-muted/30 border-b last:border-0">
			{/* 사용자 */}
			<td className="px-4 py-3 text-sm">
				<div className="flex items-center gap-3">
					<div
						className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
						aria-hidden="true"
					>
						{user.nickname.charAt(0)}
					</div>
					<div className="flex items-center gap-1.5">
						<span className="text-foreground font-semibold">{user.nickname}</span>
						{user.role === "admin" && <Shield className="text-primary size-3.5 shrink-0" aria-label="관리자" />}
					</div>
				</div>
			</td>

			{/* 이메일 */}
			<td className="text-muted-foreground px-4 py-3 text-sm">{user.email}</td>

			{/* 역할 */}
			<td className="px-4 py-3 text-sm">
				{user.role === "admin" ? (
					<Badge variant="secondary" className="gap-1">
						<Shield className="size-3" aria-hidden="true" />
						관리자
					</Badge>
				) : (
					<span className="text-muted-foreground">일반</span>
				)}
			</td>

			{/* 상태 */}
			<td className="px-4 py-3 text-sm">
				<Badge variant={user.is_active ? "secondary" : "outline"}>{user.is_active ? "활성" : "비활성"}</Badge>
			</td>

			{/* 가입일 */}
			<td className="text-muted-foreground px-4 py-3 text-sm">{formatDate(user.created_at)}</td>

			{/* 관리 */}
			<td className="px-4 py-3 text-sm">
				{user.role !== "admin" && (
					<Button
						variant="outline"
						size="sm"
						className="h-8 rounded-xl px-3 text-xs"
						onClick={handleToggle}
						aria-label={user.is_active ? `${user.nickname} 비활성화` : `${user.nickname} 활성화`}
					>
						{user.is_active ? (
							<UserX className="mr-1 size-3.5" aria-hidden="true" />
						) : (
							<UserCheck className="mr-1 size-3.5" aria-hidden="true" />
						)}
						{user.is_active ? "비활성화" : "활성화"}
					</Button>
				)}
			</td>
		</tr>
	);
}

export default function AdminUsersPage() {
	const [query, setQuery] = useState("");
	const [users, setUsers] = useState(MOCK_USERS);
	const [currentPage, setCurrentPage] = useState(1);

	const filtered = users.filter((u) => {
		if (!query) return true;
		const q = query.toLowerCase();
		return u.email.toLowerCase().includes(q) || u.nickname.toLowerCase().includes(q);
	});

	const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
	const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setCurrentPage(1);
	};

	const handleToggleActive = (userId: string, isActive: boolean) => {
		// TODO: Phase 6에서 실제 활성화/비활성화 API 연동
		setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, is_active: isActive } : u)));
	};

	const handlePagePrev = () => {
		setCurrentPage((p) => Math.max(1, p - 1));
	};

	const handlePageNext = () => {
		setCurrentPage((p) => Math.min(totalPages, p + 1));
	};

	return (
		<div className="space-y-6 p-8">
			{/* 페이지 헤더 */}
			<div>
				<h1 className="text-foreground text-2xl font-bold">사용자 관리</h1>
				<p className="text-muted-foreground text-sm">전체 사용자를 조회하고 관리하세요</p>
			</div>

			{/* 검색 */}
			<div className="flex items-center gap-3">
				<div className="relative max-w-sm flex-1">
					<Search
						className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
						aria-hidden="true"
					/>
					<Input
						type="search"
						placeholder="이메일 또는 닉네임 검색"
						value={query}
						onChange={handleQueryChange}
						className="rounded-xl pl-9"
						aria-label="사용자 검색"
					/>
				</div>
				<span className="text-muted-foreground shrink-0 text-sm">총 {filtered.length}명</span>
			</div>

			{/* 사용자 테이블 */}
			{paginated.length === 0 ? (
				<div className="py-16 text-center">
					<p className="text-muted-foreground text-sm">검색 결과가 없습니다.</p>
				</div>
			) : (
				<Card className="shadow-warm overflow-hidden rounded-2xl">
					<table className="w-full" aria-label="사용자 목록">
						<thead>
							<tr className="bg-muted/50 border-b">
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									사용자
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									이메일
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									역할
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									상태
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									가입일
								</th>
								<th scope="col" className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
									관리
								</th>
							</tr>
						</thead>
						<tbody>
							{paginated.map((user) => (
								<UserTableRow key={user.id} user={user} onToggleActive={handleToggleActive} />
							))}
						</tbody>
					</table>
				</Card>
			)}

			{/* 페이지네이션 */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between pt-2">
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
		</div>
	);
}
