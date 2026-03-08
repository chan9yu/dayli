"use client";

import type { Provider } from "@supabase/supabase-js";
import { useState } from "react";

import { GoogleIcon } from "@/features/auth/components/GoogleIcon";
import type { OAuthProvider } from "@/features/auth/types/oauth";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/Button";

const OAUTH_PROVIDERS: OAuthProvider[] = [{ id: "google", label: "Google", icon: GoogleIcon }];

type OAuthSectionProps = {
	onError?: (message: string) => void;
};

export function OAuthSection({ onError }: OAuthSectionProps) {
	const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

	const createOAuthHandler = (provider: Provider) => async () => {
		const supabase = createClient();
		setLoadingProvider(provider);

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});

		if (error) {
			onError?.(error.message);
			setLoadingProvider(null);
		}
	};

	return (
		<div className="mt-6">
			<div className="relative" role="separator" aria-label="Or continue with">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase" aria-hidden="true">
					<span className="bg-card text-muted-foreground px-2">Or continue with</span>
				</div>
			</div>
			<div className="mt-4 flex flex-col gap-2">
				{OAUTH_PROVIDERS.map(({ id, label, icon: Icon }) => {
					const isLoading = loadingProvider === id;
					return (
						<Button
							key={id}
							type="button"
							variant="outline"
							className="w-full"
							disabled={loadingProvider !== null}
							aria-busy={isLoading}
							onClick={createOAuthHandler(id)}
						>
							<Icon />
							{isLoading ? `${label} 로그인 중...` : `${label}로 계속하기`}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
