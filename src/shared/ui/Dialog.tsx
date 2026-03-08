"use client";

import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type { ComponentProps } from "react";

import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/utils/cn";

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

function DialogRoot(props: DialogRootProps) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

function DialogTrigger(props: DialogTriggerProps) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

function DialogPortal(props: DialogPortalProps) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

function DialogClose(props: DialogCloseProps) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={cn(
				"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/40",
				className
			)}
			{...props}
		/>
	);
}

type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
	showCloseButton?: boolean;
};

function DialogContent({ className, children, showCloseButton = true, ...props }: DialogContentProps) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(
					"border-border/50 bg-background data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-4 shadow-warm-lg fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border p-6 duration-300 outline-none sm:max-w-lg",
					className
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close asChild>
						<Button
							variant="ghost"
							size="icon"
							className="absolute top-4 right-4 size-7 opacity-70 transition-opacity hover:opacity-100"
							aria-label="닫기"
						>
							<XIcon className="size-4" aria-hidden="true" />
						</Button>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

type DialogHeaderProps = ComponentProps<"div">;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
			{...props}
		/>
	);
}

type DialogFooterProps = ComponentProps<"div"> & {
	showCloseButton?: boolean;
};

function DialogFooter({ className, showCloseButton = false, children, ...props }: DialogFooterProps) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
			{...props}
		>
			{children}
			{showCloseButton && (
				<DialogPrimitive.Close asChild>
					<Button variant="outline">닫기</Button>
				</DialogPrimitive.Close>
			)}
		</div>
	);
}

type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

function DialogTitle({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("text-lg leading-none font-semibold", className)}
			{...props}
		/>
	);
}

type DialogDescriptionProps = ComponentProps<typeof DialogPrimitive.Description>;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export const Dialog = Object.assign(DialogRoot, {
	Trigger: DialogTrigger,
	Portal: DialogPortal,
	Close: DialogClose,
	Overlay: DialogOverlay,
	Content: DialogContent,
	Header: DialogHeader,
	Footer: DialogFooter,
	Title: DialogTitle,
	Description: DialogDescription
});
