import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const ADMIN_PUBLIC_PATHS = ["/admin/login", "/admin/auth"];

// 인증 불필요한 서비스 라우트 (startsWith 매칭)
const SERVICE_PUBLIC_PREFIXES = ["/auth"];

// /challenges 경로 중 인증이 필요한 패턴
const CHALLENGES_AUTH_REQUIRED_PATTERNS = [
	/^\/challenges\/new$/,
	/^\/challenges\/[^/]+\/edit$/,
	/^\/challenges\/[^/]+\/checkin$/
];

function isPublicServiceRoute(pathname: string) {
	if (SERVICE_PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}

	// /challenges 목록과 /challenges/[id] 상세는 공개
	// /challenges/new, /challenges/[id]/edit, /challenges/[id]/checkin은 보호
	if (pathname.startsWith("/challenges")) {
		const requiresAuth = CHALLENGES_AUTH_REQUIRED_PATTERNS.some((pattern) => pattern.test(pathname));
		return !requiresAuth;
	}

	return false;
}

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request
	});

	if (!hasEnvVars) {
		return supabaseResponse;
	}

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
					supabaseResponse = NextResponse.next({
						request
					});
					cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
				}
			}
		}
	);

	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;

	const { pathname } = request.nextUrl;
	const isAdminRoute = pathname.startsWith("/admin");

	if (isAdminRoute) {
		const isAdminPublicRoute = ADMIN_PUBLIC_PATHS.some((path) => pathname.startsWith(path));

		if (isAdminPublicRoute) {
			return supabaseResponse;
		}

		if (!user) {
			const url = request.nextUrl.clone();
			url.pathname = "/admin/login";
			return NextResponse.redirect(url);
		}

		const { data: userData } = await supabase.from("users").select("role").eq("id", user.sub).single();

		if (userData?.role !== "admin") {
			const url = request.nextUrl.clone();
			url.pathname = "/admin/login";
			url.searchParams.set("error", "not_admin");
			return NextResponse.redirect(url);
		}
	} else {
		if (!isPublicServiceRoute(pathname) && !user) {
			const url = request.nextUrl.clone();
			url.pathname = "/auth/login";
			return NextResponse.redirect(url);
		}
	}

	return supabaseResponse;
}
