# 스타일링 가이드

이 문서는 Tailwind CSS v4 + shadcn/ui를 활용한 스타일링 규칙과 모범 사례를 제공합니다.

## 기술 스택 개요

### 핵심 스타일링 도구

- **Tailwind CSS v4**: 유틸리티 기반 CSS 프레임워크
- **shadcn/ui**: Radix UI 기반 컴포넌트 라이브러리 (new-york style)
- **next-themes**: 다크모드 지원
- **CSS Variables (oklch)**: 동적 테마 시스템
- **prettier-plugin-tailwindcss**: 자동 클래스 정렬

## Tailwind CSS v4 설정

### globals.css 구조

```css
/* src/shared/styles/globals.css */
@import "tailwindcss";
@import "./tokens.css";
@import "./base.css";
@import "./animations.css";
```

Tailwind CSS v4에서는 `tailwind.config.ts` 대신 CSS 파일에서 직접 설정:

### tokens.css - 디자인 토큰

```css
/* src/shared/styles/tokens.css */
@custom-variant dark (&:where(.dark, .dark *));

:root {
	--background: oklch(0.985 0.002 260);
	--foreground: oklch(0.145 0.015 260);
	--primary: oklch(0.55 0.18 270);
	--primary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.965 0.005 260);
	--muted-foreground: oklch(0.5 0.01 260);
	--border: oklch(0.912 0.008 260);
	/* ... */
}

.dark {
	--background: oklch(0.13 0.01 260);
	--foreground: oklch(0.93 0.005 260);
	--primary: oklch(0.7 0.17 270);
	/* ... */
}

/* Tailwind 유틸리티로 등록 */
@theme inline {
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	/* ... */
	--font-sans: var(--font-geist-sans);
	--font-mono: var(--font-geist-mono);
}
```

핵심 포인트:

- `@custom-variant dark`: `.dark` 클래스 기반 다크모드 variant 정의
- `oklch()`: HSL 대신 oklch 색상 공간 사용 (더 넓은 색역, 인지적 균일성)
- `@theme inline`: CSS 변수를 Tailwind 유틸리티 클래스로 등록

### base.css - 기본 스타일

```css
/* src/shared/styles/base.css */
html {
	color-scheme: light;
}

html.dark {
	color-scheme: dark;
}

body {
	background-color: var(--background);
	color: var(--foreground);
}

/* 테마 전환 애니메이션 (View Transitions API) */
::view-transition-old(root),
::view-transition-new(root) {
	animation-duration: 300ms;
	animation-timing-function: ease;
}

@media (prefers-reduced-motion: reduce) {
	::view-transition-old(root),
	::view-transition-new(root) {
		animation-duration: 0ms;
	}
}
```

`color-scheme`은 CSS에서 `.dark` 클래스 기반으로 직접 선언한다 (inline style 아님).

## Tailwind CSS v4 사용 규칙

### 기본 원칙

```tsx
// Tailwind 유틸리티 클래스 사용
<div className="flex items-center justify-between rounded-lg bg-background p-4 shadow-md">
  <h2 className="text-lg font-semibold text-foreground">제목</h2>
  <Button variant="outline" size="sm">버튼</Button>
</div>

// 인라인 스타일 사용 금지
<div style={{ display: "flex", padding: "16px" }}>
```

### Tailwind 기본 클래스 우선

```tsx
// 기본 클래스 사용
<div className="min-w-32">

// 임의값 지양 (기본 클래스가 있는 경우)
<div className="min-w-[8rem]">
```

### 반응형 디자인

```tsx
// 모바일 우선 접근법
<div className={cn(
  "flex flex-col space-y-4 p-4",
  "md:flex-row md:space-y-0 md:space-x-6 md:p-6",
  "lg:mx-auto lg:max-w-6xl lg:p-8",
  "xl:max-w-7xl",
)}>
```

## shadcn/ui 컴포넌트 활용

### Compound Component 패턴 (Object.assign)

```tsx
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

// Card는 Object.assign 패턴으로 구성
export function UserCard({ user }: UserCardProps) {
	return (
		<Card>
			<Card.Header>
				<Card.Title>{user.name}</Card.Title>
				<Card.Description>{user.email}</Card.Description>
			</Card.Header>
			<Card.Content>
				<Button variant="outline">프로필 보기</Button>
			</Card.Content>
		</Card>
	);
}
```

### 컴포넌트 커스터마이징

```tsx
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";

// 기존 컴포넌트 확장
export function CustomButton({ className, ...props }: ComponentProps<typeof Button>) {
	return (
		<Button
			className={cn("transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg", className)}
			{...props}
		/>
	);
}
```

### 새 shadcn/ui 컴포넌트 추가

```bash
# 컴포넌트 추가
pnpm dlx shadcn@latest add dialog

# 추가 후 PascalCase로 리네이밍 필수
# src/shared/ui/dialog.tsx -> src/shared/ui/Dialog.tsx
```

## 다크모드 구현

### next-themes 설정

```tsx
// ThemeProvider 설정 시 enableColorScheme={false} 필수
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			enableColorScheme={false}
			disableTransitionOnChange
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
```

`enableColorScheme={false}`로 설정하여 `color-scheme`을 CSS에서 `.dark` 클래스 기반으로 직접 제어한다.

### View Transitions API 테마 전환

```typescript
// src/shared/hooks/useTheme.ts
"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function useTheme() {
	const { theme, setTheme: setNextTheme, resolvedTheme } = useNextTheme();

	// useSyncExternalStore로 mounted 상태 감지 (hydration 안전)
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false
	);

	const setTheme = (newTheme: Theme) => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		// View Transitions API로 부드러운 테마 전환
		if (!document.startViewTransition || prefersReducedMotion) {
			setNextTheme(newTheme);
			return;
		}

		document.startViewTransition(() => {
			setNextTheme(newTheme);
		});
	};

	return { theme, resolvedTheme, setTheme, mounted };
}
```

핵심 포인트:

- `useSyncExternalStore`로 클라이언트/서버 상태를 안전하게 분리 (hydration mismatch 방지)
- `document.startViewTransition`으로 테마 전환 시 부드러운 애니메이션 적용
- `prefers-reduced-motion` 미디어 쿼리로 접근성 고려

### 다크모드 대응 스타일링

```tsx
// 시맨틱 색상 변수 사용
<div className="bg-background text-foreground">
  <h1 className="text-primary">제목</h1>
  <p className="text-muted-foreground">설명</p>
</div>

// 하드코딩된 색상 사용 금지
<div className="bg-white text-black dark:bg-black dark:text-white">
```

## 색상 시스템

### oklch 기반 CSS 변수

`src/shared/styles/tokens.css`에 정의된 색상 변수는 oklch 색상 공간을 사용:

```css
:root {
	--background: oklch(0.985 0.002 260);
	--foreground: oklch(0.145 0.015 260);
	--primary: oklch(0.55 0.18 270);
	/* ... */
}
```

oklch 형식: `oklch(lightness chroma hue)`

- **lightness** (0-1): 밝기
- **chroma** (0-0.4+): 채도
- **hue** (0-360): 색상각

### 색상 사용 예시

```tsx
// 시맨틱 색상 클래스 사용
<div className="border-border bg-background">
  <h1 className="text-foreground">메인 텍스트</h1>
  <p className="text-muted-foreground">보조 텍스트</p>
  <Button className="bg-primary text-primary-foreground">버튼</Button>
</div>

// 직접 색상 지정 금지
<div className="border-gray-200 bg-white">
```

## 애니메이션 가이드

### Tailwind transition 활용

```tsx
// 기본 트랜지션
<button className="transition-all duration-200 hover:scale-105 hover:shadow-lg">
  호버 효과
</button>

// will-change 사용으로 성능 최적화
<div className="transition-transform will-change-transform hover:scale-105">
```

## 유틸리티 함수

### cn() 헬퍼 함수

```tsx
import { cn } from "@/shared/lib/utils";

// cn() 함수로 클래스 조합
<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  variant === "primary" && "primary-classes",
  className,
)}>

// 수동 문자열 조합 금지
<div className={`base-classes ${condition ? "conditional-classes" : ""} ${className || ""}`}>
```

## 반응형 디자인 패턴

### 컨테이너 패턴

```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
	<div className="mx-auto max-w-7xl">{/* 컨텐츠 */}</div>
</div>
```

### 그리드 레이아웃

```tsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{items.map((item) => (
		<Card key={item.id}>...</Card>
	))}
</div>
```

## 금지사항

### 피해야 할 패턴

```tsx
// 인라인 스타일 사용
<div style={{ backgroundColor: "red" }}>

// !important 남용
<div className="!text-red-500 !bg-blue-500">

// Tailwind와 CSS 모듈 혼재
<div className={`${styles.customClass} flex items-center`}>

// 하드코딩된 색상 (다크모드 미대응)
<div className="bg-white text-black">

// HSL 값 사용 (oklch 사용)
--primary: 220.9 39.3% 11%;
// -> --primary: oklch(0.55 0.18 270);
```

## 스타일링 체크리스트

### 기본 사항

- [ ] Tailwind CSS 유틸리티 클래스 우선 사용
- [ ] `cn()` 함수로 클래스 조합
- [ ] 시맨틱 색상 변수 사용
- [ ] 반응형 디자인 적용

### 다크모드

- [ ] 시맨틱 색상 변수 사용 (하드코딩 금지)
- [ ] `enableColorScheme={false}` 설정
- [ ] View Transitions API 적용
- [ ] `useSyncExternalStore`로 hydration 안전

### Tailwind CSS v4

- [ ] `@import "tailwindcss"` 사용
- [ ] `@theme inline`으로 토큰 등록
- [ ] `@custom-variant dark` 설정
- [ ] oklch 색상 공간 사용

### shadcn/ui

- [ ] 추가 후 PascalCase 리네이밍 필수
- [ ] Compound Component는 `Object.assign` 패턴
- [ ] import 경로: `@/shared/ui/Button`
