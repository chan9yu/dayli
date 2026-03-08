import type { ReactNode } from "react";

import { AdminLayout } from "@/shared/layouts/AdminLayout";

type AdminDashboardLayoutProps = {
	children: ReactNode;
};

export default function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
	return <AdminLayout>{children}</AdminLayout>;
}
