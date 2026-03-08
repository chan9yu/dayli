import "@/shared/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

import { Toaster } from "@/shared/ui/Sonner";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3100";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Dayli - 단기 챌린지 플랫폼",
	description: "7일~30일 단기 챌린지에 참여하고 매일 이미지 기반 인증으로 목표를 달성하세요"
};

const geistSans = Geist({
	variable: "--font-geist-sans",
	display: "swap",
	subsets: ["latin"]
});

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="ko" suppressHydrationWarning>
			<body className={`${geistSans.variable} bg-muted antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					enableColorScheme={false}
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
