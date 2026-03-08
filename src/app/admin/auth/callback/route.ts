import type { NextRequest } from "next/server";

import { handleOAuthCallback } from "@/shared/lib/supabase/oauthCallback";

export async function GET(request: NextRequest) {
	// TODO: Phase 2에서 role 체크 구현 예정 (admin이 아닌 계정은 관리자 로그인 차단)
	return handleOAuthCallback(request, {
		successRedirect: "/admin",
		errorRedirect: "/admin/login"
	});
}
