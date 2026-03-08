"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/shared/hooks/useTheme";
import { Button } from "@/shared/ui/Button";

export function ThemeSwitcher() {
	const { resolvedTheme, setTheme, mounted } = useTheme();

	const handleToggle = () => {
		const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
		setTheme(nextTheme);
	};

	if (!mounted) {
		return <div className="size-9" />;
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			className="size-9 rounded-xl"
			onClick={handleToggle}
			aria-label={resolvedTheme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
			aria-pressed={resolvedTheme === "dark"}
		>
			{resolvedTheme === "dark" ? (
				<Moon className="text-muted-foreground size-[18px]" aria-hidden="true" />
			) : (
				<Sun className="text-muted-foreground size-[18px]" aria-hidden="true" />
			)}
		</Button>
	);
}
