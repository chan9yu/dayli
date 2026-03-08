import { Shield } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { AdminSidebarNav } from "@/shared/layouts/AdminSidebarNav";
import { Badge } from "@/shared/ui/Badge";

type AdminLayoutProps = {
	children: ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className="bg-muted flex min-h-screen">
			{/* 사이드바 */}
			<aside
				className="border-border bg-background fixed top-0 left-0 flex h-screen w-64 flex-col border-r"
				aria-label="관리자 사이드바"
			>
				{/* 로고 영역 */}
				<div className="border-border flex h-16 items-center gap-3 border-b px-5">
					<div className="bg-primary/10 flex size-8 items-center justify-center rounded-lg">
						<Shield className="text-primary size-4" aria-hidden="true" />
					</div>
					<div className="flex flex-col">
						<span className="text-foreground text-sm leading-tight font-semibold">Dayli</span>
						<span className="text-muted-foreground text-xs leading-tight">관리자</span>
					</div>
					<Badge variant="secondary" className="ml-auto text-xs">
						Admin
					</Badge>
				</div>

				{/* 네비게이션 (클라이언트 컴포넌트) */}
				<AdminSidebarNav />

				{/* 하단: 서비스로 돌아가기 */}
				<div className="border-border border-t px-3 py-4">
					<Link
						href="/"
						className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
					>
						<span>← 서비스로 돌아가기</span>
					</Link>
				</div>
			</aside>

			{/* 메인 콘텐츠 영역 */}
			<main className="ml-64 flex-1">{children}</main>
		</div>
	);
}
