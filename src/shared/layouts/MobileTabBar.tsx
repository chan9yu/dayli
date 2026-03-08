"use client";

import { Compass, Home, Plus, Trophy, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type TabItem = {
	href: string;
	label: string;
	icon: ReactNode;
	isCenter?: boolean;
};

const TAB_ITEMS: TabItem[] = [
	{
		href: "/",
		label: "홈",
		icon: <Home className="size-5" aria-hidden="true" />
	},
	{
		href: "/challenges",
		label: "탐색",
		icon: <Compass className="size-5" aria-hidden="true" />
	},
	{
		href: "/challenges/new",
		label: "새 챌린지",
		icon: <Plus className="size-5" aria-hidden="true" />,
		isCenter: true
	},
	{
		href: "/my-challenges",
		label: "내 챌린지",
		icon: <Trophy className="size-5" aria-hidden="true" />
	},
	{
		href: "/my-checkins",
		label: "프로필",
		icon: <User className="size-5" aria-hidden="true" />
	}
];

export function MobileTabBar() {
	const pathname = usePathname();

	return (
		<nav
			className="bg-background/95 border-border/40 fixed right-0 bottom-0 left-0 z-50 mx-auto max-w-[430px] border-t backdrop-blur-xl"
			aria-label="하단 탭 네비게이션"
		>
			<div className="flex h-16 items-end justify-around pb-2">
				{TAB_ITEMS.map((item) => {
					const isActive =
						item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);

					if (item.isCenter) {
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-label={item.label}
								className={cn("flex flex-col items-center gap-0.5 px-3 pb-0.5", "text-primary")}
							>
								<div className="bg-primary text-primary-foreground shadow-warm-sm flex size-10 items-center justify-center rounded-2xl transition-transform active:scale-95">
									{item.icon}
								</div>
							</Link>
						);
					}

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"flex flex-col items-center gap-0.5 px-3 pt-2 transition-colors",
								isActive ? "text-foreground" : "text-muted-foreground/60"
							)}
							aria-label={item.label}
							aria-current={isActive ? "page" : undefined}
						>
							{item.icon}
							<span
								className={cn("text-[10px] font-medium", isActive ? "text-foreground" : "text-muted-foreground/60")}
							>
								{item.label}
							</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
