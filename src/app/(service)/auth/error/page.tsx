import { AlertTriangle } from "lucide-react";
import { Suspense } from "react";

import { Card } from "@/shared/ui/Card";

async function ErrorContent({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const params = await searchParams;

	return (
		<div role="alert">
			{params?.error ? (
				<p className="text-muted-foreground text-sm">오류 코드: {params.error}</p>
			) : (
				<p className="text-muted-foreground text-sm">알 수 없는 오류가 발생했습니다.</p>
			)}
		</div>
	);
}

export default function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	return (
		<div className="flex min-h-svh w-full items-center justify-center px-6 py-10">
			<div className="w-full">
				<div className="mb-8 flex flex-col items-center gap-3 text-center">
					<div className="bg-destructive/10 flex size-16 items-center justify-center rounded-2xl">
						<AlertTriangle className="text-destructive size-8" aria-hidden="true" />
					</div>
					<h1 className="text-foreground text-xl font-bold">문제가 발생했습니다</h1>
				</div>
				<Card>
					<Card.Content className="pt-6">
						<Suspense>
							<ErrorContent searchParams={searchParams} />
						</Suspense>
					</Card.Content>
				</Card>
			</div>
		</div>
	);
}
