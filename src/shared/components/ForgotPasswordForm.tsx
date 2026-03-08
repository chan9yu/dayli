"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useState } from "react";

import { createClient } from "@/shared/lib/supabase/client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

type ForgotPasswordFormProps = ComponentProps<"div">;

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleForgotPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/update-password`
			});
			if (error) throw error;
			setSuccess(true);
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			{success ? (
				<Card>
					<Card.Header>
						<Card.Title className="text-2xl">Check Your Email</Card.Title>
						<Card.Description>Password reset instructions sent</Card.Description>
					</Card.Header>
					<Card.Content>
						<p className="text-muted-foreground text-sm">
							If you registered using your email and password, you will receive a password reset email.
						</p>
					</Card.Content>
				</Card>
			) : (
				<Card>
					<Card.Header>
						<Card.Title className="text-2xl">Reset Your Password</Card.Title>
						<Card.Description>
							Type in your email and we&apos;ll send you a link to reset your password
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<form onSubmit={handleForgotPassword}>
							<div className="flex flex-col gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										value={email}
										onChange={handleEmailChange}
									/>
								</div>
								{error && <p className="text-sm text-red-500">{error}</p>}
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Sending..." : "Send reset email"}
								</Button>
							</div>
							<div className="mt-4 text-center text-sm">
								Already have an account?{" "}
								<Link href="/auth/login" className="underline underline-offset-4">
									Login
								</Link>
							</div>
						</form>
					</Card.Content>
				</Card>
			)}
		</div>
	);
}
