import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/shared/lib/supabase/server";

type OAuthCallbackOptions = {
	/** 인증 성공 시 리디렉션할 경로 */
	successRedirect: string;
	/** 인증 실패 시 리디렉션할 경로 */
	errorRedirect: string;
	/** `next` 쿼리 파라미터로 리디렉션 경로를 오버라이드할지 여부 */
	allowNextParam?: boolean;
};

/**
 * Supabase OAuth 콜백 공통 처리 유틸리티
 *
 * 서비스 로그인과 관리자 로그인 모두에서 사용되며,
 * code exchange 및 에러 처리 로직을 공유한다.
 */
export async function handleOAuthCallback(request: NextRequest, options: OAuthCallbackOptions) {
	const { successRedirect, errorRedirect, allowNextParam = false } = options;
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");

	if (searchParams.get("error_description")) {
		return NextResponse.redirect(`${origin}${errorRedirect}?error=oauth_failed`);
	}

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);

		if (!error) {
			let redirect = successRedirect;

			if (allowNextParam) {
				const rawNext = searchParams.get("next") ?? successRedirect;
				redirect = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : successRedirect;
			}

			return NextResponse.redirect(`${origin}${redirect}`);
		}
	}

	return NextResponse.redirect(`${origin}${errorRedirect}?error=${encodeURIComponent("oauth_failed")}`);
}
