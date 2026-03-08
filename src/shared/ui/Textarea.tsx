import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type TextareaProps = ComponentProps<"textarea">;

function Textarea({ className, ref, ...props }: TextareaProps) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-border/60 placeholder:text-muted-foreground/60 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 hover:border-border flex field-sizing-content min-h-16 w-full resize-none rounded-xl border bg-transparent px-3.5 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring",
				"aria-invalid:border-destructive",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
}

export { Textarea };
