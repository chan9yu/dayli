"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/shared/ui/Button";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

export default function ChallengeError({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("Challenge Error:", error);
	}, [error]);

	return (
		<div className="flex min-h-96 flex-col items-center justify-center p-6 text-center">
			<div className="bg-destructive/10 flex size-16 items-center justify-center rounded-full">
				<AlertCircle className="text-destructive size-8" aria-hidden="true" />
			</div>
			<h2 className="text-foreground mt-4 text-xl font-bold">챌린지를 불러올 수 없어요</h2>
			<p className="text-muted-foreground mt-2 text-sm">챌린지 정보를 가져오는 중 오류가 발생했습니다.</p>
			<div className="mt-6 flex gap-3">
				<Button onClick={reset}>다시 시도</Button>
				<Button variant="outline" asChild>
					<Link href="/challenges">목록으로</Link>
				</Button>
			</div>
		</div>
	);
}
