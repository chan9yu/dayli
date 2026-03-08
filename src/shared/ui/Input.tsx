import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type InputProps = ComponentProps<"input">;

export function Input({ className, type, ref, ...props }: InputProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"border-border/60 file:text-foreground placeholder:text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 hover:border-border flex h-10 w-full min-w-0 rounded-xl border bg-transparent px-3.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:px-3 file:text-sm file:font-medium disabled:pointer-events-none disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring",
				"aria-invalid:border-destructive",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
}
