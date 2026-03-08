"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent, ComponentProps, FormEvent } from "react";
import { useState } from "react";

import { OAuthSection } from "@/features/auth/components/OAuthSection";
import { createClient } from "@/shared/lib/supabase/client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

type SignUpFormProps = ComponentProps<"div">;

export function SignUpForm({ className, ...props }: SignUpFormProps) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setRepeatPassword(e.target.value);
	};

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();

		if (password !== repeatPassword) {
			setError("Passwords do not match");
			return;
		}

		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${window.location.origin}/protected` }
		});

		if (error) {
			setError(error.message);
			setIsLoading(false);
			return;
		}

		router.push("/auth/sign-up-success");
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<Card.Header>
					<Card.Title className="text-2xl">Sign up</Card.Title>
					<Card.Description>Create a new account</Card.Description>
				</Card.Header>
				<Card.Content>
					<form onSubmit={handleSignUp}>
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
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input id="password" type="password" required value={password} onChange={handlePasswordChange} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="repeat-password">Repeat Password</Label>
								<Input
									id="repeat-password"
									type="password"
									required
									value={repeatPassword}
									onChange={handleRepeatPasswordChange}
								/>
							</div>
							{error && (
								<p role="alert" className="text-sm text-red-500">
									{error}
								</p>
							)}
							<Button type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
								{isLoading ? "Creating an account..." : "Sign up"}
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link href="/auth/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</form>
					<OAuthSection onError={setError} />
				</Card.Content>
			</Card>
		</div>
	);
}
