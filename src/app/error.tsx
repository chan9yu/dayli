"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/shared/ui/Button";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("App Error:", error);
	}, [error]);

	return (
		<div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
			<div className="bg-destructive/10 flex size-20 items-center justify-center rounded-full">
				<AlertTriangle className="text-destructive size-10" aria-hidden="true" />
			</div>
			<h1 className="text-foreground mt-6 text-2xl font-bold">오류가 발생했습니다</h1>
			<p className="text-muted-foreground mt-2 max-w-md text-sm">
				일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
			</p>
			{error.digest && <p className="text-muted-foreground mt-1 font-mono text-xs">오류 코드: {error.digest}</p>}
			<Button className="mt-8" onClick={reset}>
				다시 시도
			</Button>
		</div>
	);
}
