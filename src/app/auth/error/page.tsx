import { Suspense } from "react";

import { Card } from "@/shared/ui/Card";

async function ErrorContent({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	const params = await searchParams;

	return (
		<>
			{params?.error ? (
				<p className="text-muted-foreground text-sm">Code error: {params.error}</p>
			) : (
				<p className="text-muted-foreground text-sm">An unspecified error occurred.</p>
			)}
		</>
	);
}

export default function Page({ searchParams }: { searchParams: Promise<{ error: string }> }) {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<Card.Header>
							<Card.Title className="text-2xl">Sorry, something went wrong.</Card.Title>
						</Card.Header>
						<Card.Content>
							<Suspense>
								<ErrorContent searchParams={searchParams} />
							</Suspense>
						</Card.Content>
					</Card>
				</div>
			</div>
		</div>
	);
}
