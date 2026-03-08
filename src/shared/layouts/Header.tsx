import { CheckSquare, LogOut, Trophy } from "lucide-react";
import Link from "next/link";

import { ThemeSwitcher } from "@/shared/components/ThemeSwitcher";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";

// 실제 인증 연결 전까지 더미 플래그로 로그인 상태 전환
const IS_LOGGED_IN = true;

const MOCK_USER = {
	nickname: "김민호",
	email: "kim.minho@gmail.com",
	avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=minho"
};

export function Header() {
	return (
		<header className="bg-background/80 sticky top-0 z-50 w-full [box-shadow:var(--shadow-warm-sm)] backdrop-blur-xl">
			<div className="flex h-14 items-center justify-between px-5">
				{/* 로고 */}
				<Link href="/" className="flex items-center gap-1.5">
					<div className="bg-primary/10 flex size-7 items-center justify-center rounded-lg">
						<Trophy className="text-primary size-4" aria-hidden="true" />
					</div>
					<span className="text-foreground text-xl font-extrabold tracking-tighter">Dayli</span>
				</Link>

				{/* 우측 액션 영역 */}
				<div className="flex items-center gap-0.5">
					<ThemeSwitcher />

					{IS_LOGGED_IN ? (
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button variant="ghost" size="icon" className="size-9 rounded-xl" aria-label="사용자 메뉴">
									<Avatar className="ring-primary/30 size-7 ring-2 ring-offset-1">
										<Avatar.Image src={MOCK_USER.avatar_url} alt={MOCK_USER.nickname} />
										<Avatar.Fallback className="bg-primary/10 text-primary text-xs font-semibold">
											{MOCK_USER.nickname.charAt(0)}
										</Avatar.Fallback>
									</Avatar>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end" className="w-56 rounded-2xl p-1.5">
								{/* 사용자 정보 */}
								<div className="bg-muted/50 mb-1 rounded-xl px-3 py-2.5">
									<p className="text-foreground text-sm font-semibold">{MOCK_USER.nickname}</p>
									<p className="text-muted-foreground truncate text-xs">{MOCK_USER.email}</p>
								</div>

								<DropdownMenu.Item asChild className="rounded-xl">
									<Link href="/my-challenges" className="flex items-center gap-2">
										<Trophy className="size-4" aria-hidden="true" />내 챌린지
									</Link>
								</DropdownMenu.Item>
								<DropdownMenu.Item asChild className="rounded-xl">
									<Link href="/my-checkins" className="flex items-center gap-2">
										<CheckSquare className="size-4" aria-hidden="true" />내 인증 기록
									</Link>
								</DropdownMenu.Item>

								<DropdownMenu.Separator className="my-1" />

								<DropdownMenu.Item className="text-destructive focus:text-destructive rounded-xl">
									<LogOut className="size-4" aria-hidden="true" />
									로그아웃
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu>
					) : (
						<Button size="sm" className="rounded-xl px-4 font-semibold" asChild>
							<Link href="/auth/login">로그인</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
