"use client";

import { AlertTriangle, Trophy } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { GoogleIcon } from "@/features/auth/components/GoogleIcon";
import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/Button";

const ERROR_MESSAGES: Record<string, string> = {
	admin_account: "관리자 계정으로는 서비스에 로그인할 수 없습니다.",
	oauth_failed: "Google 로그인에 실패했습니다. 다시 시도해 주세요.",
	default: "로그인 중 오류가 발생했습니다."
};

function LoginContent() {
	const searchParams = useSearchParams();
	const error = searchParams.get("error");
	const [isLoading, setIsLoading] = useState(false);

	const errorMessage = error ? (ERROR_MESSAGES[error] ?? ERROR_MESSAGES.default) : null;

	const handleGoogleLogin = async () => {
		const supabase = createClient();
		setIsLoading(true);

		const { error: authError } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});

		if (authError) {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center px-6 py-10">
			<div className="w-full max-w-sm space-y-8">
				{/* 로고 영역 */}
				<div className="flex flex-col items-center gap-4">
					<div className="bg-primary/10 flex size-16 items-center justify-center rounded-2xl">
						<Trophy className="text-primary size-8" aria-hidden="true" />
					</div>
					<div className="flex flex-col items-center gap-1">
						<h1 className="text-foreground text-2xl font-bold tracking-tight">Dayli</h1>
						<p className="text-muted-foreground text-sm">매일의 작은 도전이 큰 변화를 만듭니다</p>
					</div>
				</div>

				{/* 로그인 카드 */}
				<div className="bg-card border-border space-y-6 rounded-2xl border p-8 shadow-sm">
					{/* 에러 메시지 */}
					{errorMessage && (
						<div
							role="alert"
							className="bg-destructive/10 text-destructive flex items-start gap-3 rounded-xl px-4 py-3 text-sm"
						>
							<AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
							<span>{errorMessage}</span>
						</div>
					)}

					{/* Google OAuth 로그인 */}
					<Button
						type="button"
						variant="outline"
						className="h-12 w-full rounded-xl text-sm font-medium"
						disabled={isLoading}
						aria-busy={isLoading}
						onClick={handleGoogleLogin}
					>
						<GoogleIcon />
						{isLoading ? "로그인 중..." : "Google 계정으로 로그인"}
					</Button>

					{/* 안내 */}
					<p className="text-muted-foreground text-center text-xs leading-relaxed">
						Google 계정으로 간편하게 로그인하세요.
						<br />
						처음이시라면 자동으로 가입됩니다.
					</p>
				</div>

				{/* 챌린지 둘러보기 링크 */}
				<div className="text-center">
					<Link href="/challenges" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
						챌린지 둘러보기
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function ServiceLoginPage() {
	return (
		<Suspense>
			<LoginContent />
		</Suspense>
	);
}
