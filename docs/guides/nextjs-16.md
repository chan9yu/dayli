# Next.js 16.x 개발 지침

이 문서는 Next.js 16.x (2026년 3월 기준) 프로젝트를 개발할 때 따라야 할 핵심 규칙과 가이드라인을 제공합니다.

## 필수 규칙 (엄격 준수)

### App Router 아키텍처

```
app/
├── layout.tsx          # 루트 레이아웃
├── page.tsx           # 메인 페이지
├── loading.tsx        # 로딩 UI
├── error.tsx          # 에러 UI
├── not-found.tsx      # 404 페이지
└── dashboard/
    ├── layout.tsx     # 대시보드 레이아웃
    └── page.tsx       # 대시보드 페이지
```

Pages Router 사용 금지.

### Server Components 우선 설계

```typescript
// 기본적으로 모든 컴포넌트는 Server Components
export default async function UserDashboard() {
  const user = await getUser();

  return (
    <div>
      <h1>{user.name}님의 대시보드</h1>
      <InteractiveChart data={user.analytics} />
    </div>
  );
}

// 클라이언트 컴포넌트는 최소한으로 사용
"use client";

import { useState } from "react";

export function InteractiveChart({ data }: { data: Analytics[] }) {
  const [selectedRange, setSelectedRange] = useState("week");

  const handleRangeChange = (range: string) => {
    setSelectedRange(range);
  };

  return <Chart data={data} range={selectedRange} onRangeChange={handleRangeChange} />;
}
```

### async request APIs 처리

```typescript
import { cookies, headers } from "next/headers";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const cookieStore = await cookies();
  const headersList = await headers();

  const user = await getUser(id);

  return <UserProfile user={user} />;
}
```

### next.config.ts 설정

프로젝트의 실제 설정:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true, // Partial Prerendering (PPR) 활성화
	reactCompiler: true, // React Compiler 활성화 (babel-plugin-react-compiler)
	poweredByHeader: false
};

export default nextConfig;
```

- `cacheComponents: true`: PPR을 활성화하여 정적/동적 컨텐츠를 혼합 렌더링. Suspense 경계를 기준으로 정적 부분을 캐시하고 동적 부분만 서버에서 스트리밍.
- `reactCompiler: true`: React Compiler가 자동으로 메모이제이션을 처리. 수동 `memo`, `useMemo`, `useCallback`이 대부분 불필요.

### proxy.ts (middleware 대체)

Next.js 16에서는 `middleware.ts` 대신 `proxy.ts`를 사용:

```typescript
// src/proxy.ts
import { type NextRequest } from "next/server";

import { updateSession } from "@/shared/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
```

`proxy.ts`는 Node.js 런타임에서 실행되며, 요청 전처리(인증, 리다이렉트 등)를 담당한다.

## 권장 사항 (성능 최적화)

### Streaming과 Suspense 활용

```typescript
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1>대시보드</h1>
      <QuickStats />

      <Suspense fallback={<SkeletonChart />}>
        <SlowChart />
      </Suspense>

      <Suspense fallback={<SkeletonTable />}>
        <SlowDataTable />
      </Suspense>
    </div>
  );
}

async function SlowChart() {
  const data = await getComplexAnalytics();
  return <Chart data={data} />;
}
```

### `use cache` 디렉티브와 `cacheLife`

Next.js 16에서 도입된 캐싱 디렉티브:

```typescript
// 함수 레벨 캐싱
async function getProductData(id: string) {
  "use cache";
  cacheLife("hours");

  const data = await fetch(`/api/products/${id}`);
  return data.json();
}

// 컴포넌트 레벨 캐싱
async function ProductList() {
  "use cache";
  cacheLife("days");

  const products = await getProducts();
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

`cacheLife` 프리셋: `"seconds"`, `"minutes"`, `"hours"`, `"days"`, `"weeks"`, `"max"`.

### 캐시 무효화

```typescript
import { revalidateTag } from "next/cache";

export async function updateProduct(id: string, data: ProductData) {
	await updateDatabase(id, data);

	revalidateTag(`product-${id}`);
	revalidateTag("products");
}
```

### after() API 활용

```typescript
import { after } from "next/server";

export async function POST(request: Request) {
	const body = await request.json();
	const result = await processUserData(body);

	// 비블로킹 후처리 작업
	after(async () => {
		await sendAnalytics(result);
		await updateCache(result.id);
		await sendNotification(result.userId);
	});

	return Response.json({ success: true, id: result.id });
}
```

## React 19 호환성

```typescript
"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "제출 중..." : "제출"}
    </button>
  );
}

// Server Actions와 form 통합
export async function createUser(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await saveUser({ name, email });
  redirect("/users");
}

export default function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <input name="email" type="email" required />
      <SubmitButton />
    </form>
  );
}
```

### React 19 주요 변경 사항

- `use(Context)` 사용 (`useContext` 대신)
- `<Context value={...}>` 사용 (`.Provider` 대신)
- ref는 일반 prop으로 전달 (`forwardRef` 금지)
- React Compiler로 인해 수동 `memo`/`useMemo`/`useCallback` 대부분 불필요

## 라우팅 패턴

### Route Groups

```
app/
├── (marketing)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── about/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   └── analytics/
│       └── page.tsx
└── (auth)/
    ├── login/
    │   └── page.tsx
    └── register/
        └── page.tsx
```

### Parallel Routes

```typescript
// dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="dashboard-grid">
      <main>{children}</main>
      <aside className="analytics-panel">
        <Suspense fallback={<AnalyticsSkeleton />}>{analytics}</Suspense>
      </aside>
      <div className="notifications-panel">
        <Suspense fallback={<NotificationsSkeleton />}>{notifications}</Suspense>
      </div>
    </div>
  );
}
```

### Intercepting Routes

```typescript
// @modal/(.)gallery/[id]/page.tsx
import { Modal } from "@/shared/components/Modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await getPhoto(id);

  return (
    <Modal>
      <img src={photo.url} alt={photo.title} />
    </Modal>
  );
}
```

## 금지 사항

### Pages Router 사용 금지

```typescript
// 금지: Pages Router 패턴
// pages/, getServerSideProps, getStaticProps 사용 불가
```

### 안티패턴 방지

```typescript
// 금지: 불필요한 'use client' 사용
"use client";

export default function SimpleComponent({ title }: { title: string }) {
  // 상태나 이벤트 핸들러가 없는데 'use client' 사용
  return <h1>{title}</h1>;
}

// 올바른 방법: Server Component로 유지
export default function SimpleComponent({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
```

## 코드 품질 체크리스트

개발 완료 후 다음 명령어들을 반드시 실행:

```bash
# 타입 체크
pnpm type:check

# 린트 검사
pnpm lint

# 포맷 검사
pnpm format:check

# 빌드 테스트
pnpm build
```

이 지침을 따라 Next.js 16.x의 모든 기능을 최대한 활용하여 성능 최적화된 애플리케이션을 개발하세요.
