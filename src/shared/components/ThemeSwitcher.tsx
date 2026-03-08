"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/shared/ui/Button";
import { DropdownMenu } from "@/shared/ui/DropdownMenu";

const ICON_SIZE = 16;

const emptySubscribe = () => () => {};

export function ThemeSwitcher() {
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false
	);
	const { theme, setTheme } = useTheme();

	if (!mounted) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenu.Trigger asChild>
				<Button variant="ghost" size="sm">
					{theme === "light" ? (
						<Sun key="light" size={ICON_SIZE} className="text-muted-foreground" />
					) : theme === "dark" ? (
						<Moon key="dark" size={ICON_SIZE} className="text-muted-foreground" />
					) : (
						<Laptop key="system" size={ICON_SIZE} className="text-muted-foreground" />
					)}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className="w-content" align="start">
				<DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
					<DropdownMenu.RadioItem className="flex gap-2" value="light">
						<Sun size={ICON_SIZE} className="text-muted-foreground" /> <span>Light</span>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem className="flex gap-2" value="dark">
						<Moon size={ICON_SIZE} className="text-muted-foreground" /> <span>Dark</span>
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem className="flex gap-2" value="system">
						<Laptop size={ICON_SIZE} className="text-muted-foreground" /> <span>System</span>
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Content>
		</DropdownMenu>
	);
}
