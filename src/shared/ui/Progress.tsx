"use client";

import { Progress as ProgressPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type ProgressProps = ComponentProps<typeof ProgressPrimitive.Root>;

function Progress({ className, value, ...props }: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			data-slot="progress"
			className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
			{...props}
		>
			<ProgressPrimitive.Indicator
				data-slot="progress-indicator"
				className="from-primary to-primary/80 h-full w-full flex-1 bg-gradient-to-r transition-all duration-500 ease-out"
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	);
}

export { Progress };
