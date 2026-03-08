import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type CardRootProps = ComponentProps<"div">;

function CardRoot({ className, ...props }: CardRootProps) {
	return (
		<div
			className={cn("bg-card text-card-foreground shadow-warm rounded-2xl transition-shadow", className)}
			{...props}
		/>
	);
}

type CardHeaderProps = ComponentProps<"div">;

function CardHeader({ className, ...props }: CardHeaderProps) {
	return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

type CardTitleProps = ComponentProps<"div">;

function CardTitle({ className, ...props }: CardTitleProps) {
	return <div className={cn("leading-none font-semibold tracking-tight", className)} {...props} />;
}

type CardDescriptionProps = ComponentProps<"div">;

function CardDescription({ className, ...props }: CardDescriptionProps) {
	return <div className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

type CardContentProps = ComponentProps<"div">;

function CardContent({ className, ...props }: CardContentProps) {
	return <div className={cn("p-6 pt-0", className)} {...props} />;
}

type CardFooterProps = ComponentProps<"div">;

function CardFooter({ className, ...props }: CardFooterProps) {
	return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Title: CardTitle,
	Description: CardDescription,
	Content: CardContent,
	Footer: CardFooter
});
