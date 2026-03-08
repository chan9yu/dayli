"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/shared/lib/supabase/client";
import { Button } from "@/shared/ui/Button";

export function LogoutButton() {
	const router = useRouter();

	const handleLogout = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/auth/login");
	};

	return <Button onClick={handleLogout}>Logout</Button>;
}
