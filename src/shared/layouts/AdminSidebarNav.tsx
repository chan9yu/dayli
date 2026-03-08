"use client";

import { BarChart3, LayoutDashboard, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type NavItem = {
	href: string;
	label: string;
	icon: ReactNode;
};

const NAV_ITEMS: NavItem[] = [
	{
		href: "/admin",
		label: "대시보드",
		icon: <LayoutDashboard className="size-4" aria-hidden="true" />
	},
	{
		href: "/admin/challenges",
		label: "챌린지",
		icon: <Trophy className="size-4" aria-hidden="true" />
	},
	{
		href: "/admin/users",
		label: "사용자",
		icon: <Users className="size-4" aria-hidden="true" />
	},
	{
		href: "/admin/stats",
		label: "통계",
		icon: <BarChart3 className="size-4" aria-hidden="true" />
	}
];

export function AdminSidebarNav() {
	const pathname = usePathname();

	return (
		<nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="관리자 메뉴">
			{NAV_ITEMS.map((item) => {
				const isActive = pathname === item.href;

				return (
					<Link
						key={item.href}
						href={item.href}
						className={cn(
							"flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
							isActive
								? "bg-primary/10 text-primary font-semibold"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						)}
						aria-current={isActive ? "page" : undefined}
					>
						{item.icon}
						<span>{item.label}</span>
					</Link>
				);
			})}
		</nav>
	);
}
