"use client";

import { AlertTriangle, Shield } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { GoogleIcon } from "@/features/auth/components/GoogleIcon";
import { createClient } from "@/shared/lib/supabase/client";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";

const ERROR_MESSAGES: Record<string, string> = {
	not_admin: "관리자 계정이 아닙니다. 관리자 권한이 필요합니다.",
	oauth_failed: "Google 로그인에 실패했습니다. 다시 시도해 주세요.",
	default: "로그인 중 오류가 발생했습니다."
};

function AdminLoginContent() {
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
				redirectTo: `${window.location.origin}/admin/auth/callback`
			}
		});

		if (authError) {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-muted flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md space-y-8">
				{/* 로고 영역 */}
				<div className="flex flex-col items-center gap-4">
					<div className="bg-primary/10 flex size-16 items-center justify-center rounded-2xl">
						<Shield className="text-primary size-8" aria-hidden="true" />
					</div>
					<div className="flex flex-col items-center gap-1">
						<div className="flex items-center gap-2">
							<h1 className="text-foreground text-2xl font-bold tracking-tight">Dayli 관리자</h1>
							<Badge variant="secondary" className="text-xs">
								Admin
							</Badge>
						</div>
						<p className="text-muted-foreground text-sm">관리자 계정으로 로그인하세요</p>
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
						관리자 권한이 부여된 Google 계정만 로그인할 수 있습니다.
					</p>
				</div>

				{/* 서비스 페이지 링크 */}
				<div className="text-center">
					<Link href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
						서비스 페이지로 돌아가기
					</Link>
				</div>
			</div>
		</div>
	);
}

export default function AdminLoginPage() {
	return (
		<Suspense>
			<AdminLoginContent />
		</Suspense>
	);
}
