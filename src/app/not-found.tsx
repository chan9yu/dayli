import { SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/ui/Button";

export default function NotFound() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
			<div className="bg-muted flex size-20 items-center justify-center rounded-full">
				<SearchX className="text-muted-foreground size-10" aria-hidden="true" />
			</div>
			<h1 className="text-foreground mt-6 text-3xl font-bold">페이지를 찾을 수 없어요</h1>
			<p className="text-muted-foreground mt-2 max-w-md">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
			<div className="mt-8 flex gap-3">
				<Button asChild>
					<Link href="/">홈으로 이동</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link href="/challenges">챌린지 탐색</Link>
				</Button>
			</div>
		</div>
	);
}
