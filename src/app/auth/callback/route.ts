import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/shared/lib/supabase/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const rawNext = searchParams.get("next") ?? "/protected";
	const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/protected";
	const errorDescription = searchParams.get("error_description");

	if (errorDescription) {
		const safeError = errorDescription.slice(0, 200);
		return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(safeError)}`);
	}

	if (code) {
		const supabase = await createClient();
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	return NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent("OAuth callback failed")}`);
}
