import type { ReactNode } from "react";
import { Suspense } from "react";

import { Footer } from "@/shared/layouts/Footer";
import { Header } from "@/shared/layouts/Header";
import { MobileTabBar } from "@/shared/layouts/MobileTabBar";

type ServiceLayoutProps = {
	children: ReactNode;
};

export default function ServiceLayout({ children }: ServiceLayoutProps) {
	return (
		<div className="bg-background relative mx-auto flex min-h-screen max-w-[430px] flex-col shadow-xl">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
			<Suspense fallback={<div className="h-16" />}>
				<MobileTabBar />
			</Suspense>
		</div>
	);
}
