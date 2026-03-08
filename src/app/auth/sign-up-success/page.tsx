import { Card } from "@/shared/ui/Card";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<Card.Header>
							<Card.Title className="text-2xl">Thank you for signing up!</Card.Title>
							<Card.Description>Check your email to confirm</Card.Description>
						</Card.Header>
						<Card.Content>
							<p className="text-muted-foreground text-sm">
								You&apos;ve successfully signed up. Please check your email to confirm your account before signing in.
							</p>
						</Card.Content>
					</Card>
				</div>
			</div>
		</div>
	);
}
