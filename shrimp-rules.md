# Development Guidelines

## 프로젝트 개요

- **Dayli**: 단기 챌린지 플랫폼 (7/14/21/30일), 모바일 퍼스트 웹 서비스
- **기술 스택**: Next.js 16 (App Router), React 19, TypeScript 5.9 (strict), Tailwind CSS 4, shadcn/ui 4, Supabase (Auth/DB/Storage/Realtime/pg_cron), Recharts, Vercel
- **패키지 매니저**: pnpm 10.31+, Node.js >= 22
- **참고 문서**: `docs/PRD.md` (기능 명세), `docs/ROADMAP.md` (개발 로드맵)

---

## 프로젝트 아키텍처

### 디렉토리 구조

| 디렉토리                             | 역할                         | 배치 기준                                  |
| ------------------------------------ | ---------------------------- | ------------------------------------------ |
| `src/app/`                           | Next.js App Router 라우트    | 페이지/레이아웃만 배치, 비즈니스 로직 금지 |
| `src/features/[feature]/components/` | 기능 전용 컴포넌트           | 해당 feature에서만 사용되는 컴포넌트       |
| `src/features/[feature]/services/`   | Supabase 쿼리, 비즈니스 로직 | 데이터 페칭/뮤테이션 로직                  |
| `src/features/[feature]/types/`      | 기능 전용 타입               | 해당 feature의 도메인 타입                 |
| `src/shared/ui/`                     | shadcn/ui 컴포넌트           | 2개 이상 feature에서 사용되는 UI           |
| `src/shared/layouts/`                | 공통 레이아웃                | Header, Footer, AdminLayout                |
| `src/shared/hooks/`                  | 공통 훅                      | 2개 이상 feature에서 사용되는 훅           |
| `src/shared/utils/`                  | 유틸리티                     | cn, formatDate 등                          |
| `src/shared/lib/supabase/`           | Supabase 클라이언트          | client.ts, server.ts, proxy.ts             |
| `src/shared/styles/`                 | 전역 CSS                     | globals.css → tokens/base/animations       |

### 라우트 그룹

| 그룹         | 경로                                      | 접근 제어                                        |
| ------------ | ----------------------------------------- | ------------------------------------------------ |
| `(public)`   | `/` (랜딩)                                | 비로그인 접근 가능                               |
| `(auth)`     | `/home`, `/my-challenges`, `/my-checkins` | 로그인 필수 (미들웨어)                           |
| `challenges` | `/challenges/*`                           | 목록/상세는 공개, 생성/수정/인증은 미들웨어 보호 |
| `admin`      | `/admin/*`                                | role='admin' 체크 (미들웨어)                     |
| `auth`       | `/auth/*`                                 | 인증 관련 (callback, login 등)                   |

---

## 코드 컨벤션

### TypeScript

- strict mode + `noUncheckedIndexedAccess` 필수
- 모듈 간 import: `@/*` 절대 경로 사용
- 모듈 내부 import: `./`, `../` 상대 경로 사용
- 리턴 타입은 자동 추론에 맡김, **명시 금지**
- `React.*` 네임스페이스 금지 → `import type { MouseEvent } from "react"` 직접 import

```typescript
// DO
import type { MouseEvent } from "react";
const handleClick = (e: MouseEvent<HTMLButtonElement>) => {};

// DON'T
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};
```

### React 19

- `use(Context)` 사용 (`useContext` 금지)
- `<Context value={...}>` 사용 (`.Provider` 금지)
- ref는 일반 prop으로 전달 (`forwardRef` 금지)
- JSX 인라인 함수 금지 → named 화살표 함수로 추출
- `useCallback`/`useMemo`: Context Provider value 안정성 용도로만 사용

```tsx
// DO
const handleChange = (e: ChangeEvent<HTMLInputElement>) => { ... };
return <input onChange={handleChange} />;

// DON'T
return <input onChange={(e) => setValue(e.target.value)} />;
```

### 컴포넌트

- Props는 별도 type 선언 (인라인 타입 금지)
- 파일당 하나의 **named export** (`export default` 금지, page.tsx/layout.tsx 예외)
- `"use client"`: hooks/browser API/이벤트 핸들러 직접 사용 시에만 선언
- 무거운 클라이언트 컴포넌트는 `next/dynamic`으로 지연 로딩

```tsx
// DO
type ButtonProps = { variant?: "primary" | "secondary"; children: React.ReactNode };
export function Button({ variant = "primary", children }: ButtonProps) { ... }

// DON'T
export default function Button({ variant = "primary" }: { variant?: string }) { ... }
```

### shadcn/ui

- 파일명: **PascalCase** (CLI 생성 후 리네이밍 필수: `button.tsx` → `Button.tsx`)
- 복합 컴포넌트: `Object.assign` 패턴, 서브컴포넌트에 부모 prefix 필수
- CVA(`cva()`) 반환값은 컴포넌트 파일 **내부에서만** 사용, 외부 export 금지
- 외부에서 Props 접근: `ComponentProps<typeof Badge>` 사용

### Import/Export

- Named exports 우선 (프레임워크 요구사항 예외)
- 순서: external → internal(`@/*`) → relative(`./`, `../`)
- `eslint-plugin-simple-import-sort`가 자동 정렬
- **배럴 파일(index.ts) 금지** — 직접 파일 경로로 import

```typescript
// DO
import { Badge } from "@/shared/ui/Badge";
import { ChallengeCard } from "@/features/challenges/components/ChallengeCard";

// DON'T
import { Badge } from "@/shared/ui";
import { ChallengeCard } from "@/features/challenges";
```

### 파일명

| 유형        | 규칙       | 예시                             |
| ----------- | ---------- | -------------------------------- |
| 컴포넌트    | PascalCase | `Badge.tsx`, `ChallengeCard.tsx` |
| utils/hooks | camelCase  | `formatDate.ts`, `useTheme.ts`   |
| 서비스      | camelCase  | `challengeService.ts`            |
| 타입        | camelCase  | `oauth.ts`, `challenge.ts`       |

---

## 스타일링

### CSS 구조

- 전역 CSS 진입점: `src/shared/styles/globals.css`
- import 순서: `tokens.css` → `base.css` → `animations.css`
- 디자인 토큰 변경: `tokens.css` 수정
- 기본 스타일 변경: `base.css` 수정
- 애니메이션 추가: `animations.css` 수정

### Tailwind CSS 규칙

- Tailwind 기본 클래스가 존재하면 **임의값 금지**

```tsx
// DO
<div className="min-w-32" />

// DON'T
<div className="min-w-[8rem]" />
```

### 다크모드/테마

- 클래스 기반 다크모드 (`.dark` 클래스)
- `next-themes`의 `enableColorScheme={false}` 필수
- `color-scheme`은 CSS에서 `.dark` 클래스 기반으로 직접 선언 (**inline style 금지**)
- 테마 전환: View Transitions API (`document.startViewTransition`)
- mounted 감지: `useSyncExternalStore` 사용 (hydration 안전)

---

## Supabase 패턴

### 클라이언트 사용 규칙

| 환경     | 파일                                | 함수              | 주의사항                                  |
| -------- | ----------------------------------- | ----------------- | ----------------------------------------- |
| 브라우저 | `src/shared/lib/supabase/client.ts` | `createClient()`  | Client Component에서 사용                 |
| 서버     | `src/shared/lib/supabase/server.ts` | `createClient()`  | **매 요청마다 새로 생성, 전역 변수 금지** |
| 미들웨어 | `src/shared/lib/supabase/proxy.ts`  | `updateSession()` | 세션 갱신 + 라우트 보호                   |

```typescript
// DO - 서버 컴포넌트/Server Action 내에서
export default async function Page() {
	const supabase = await createClient();
	const { data } = await supabase.from("challenges").select("*");
}

// DON'T - 전역 변수로 Supabase 클라이언트 저장
const supabase = await createClient(); // 모듈 최상위에서 금지
```

### 서비스 레이어 패턴

- Supabase 쿼리는 `src/features/[feature]/services/` 에 분리
- 페이지/컴포넌트에서 직접 Supabase 쿼리 작성 금지 (서비스 레이어를 통해 접근)

---

## 기능 구현 표준

### 새 기능 추가 시 파일 생성 순서

1. `src/features/[feature]/types/` — 도메인 타입 정의
2. `src/features/[feature]/services/` — 서비스 레이어 (Supabase 쿼리)
3. `src/features/[feature]/components/` — UI 컴포넌트
4. `src/app/[route]/page.tsx` — 페이지에서 컴포넌트 import

### 새 페이지 추가 시 체크리스트

- [ ] `src/app/` 하위에 라우트 파일 생성
- [ ] 접근 제어 필요 시 미들웨어 규칙 확인 (`src/shared/lib/supabase/proxy.ts`)
- [ ] Server Component 기본, Client Component 필요 시에만 `"use client"` 선언
- [ ] 해당 기능의 PRD 기능 ID(F001~F020) 확인

### shadcn/ui 컴포넌트 추가 시

1. `pnpm dlx shadcn@latest add [component]` 실행
2. 생성된 파일을 `src/shared/ui/` 로 이동
3. 파일명을 **PascalCase**로 리네이밍
4. `export default` → `export function` 으로 변경
5. Props를 별도 type으로 추출

---

## 접근성 표준

| UI 요소              | 필수 속성                               |
| -------------------- | --------------------------------------- |
| 모달/다이얼로그      | `aria-labelledby` (`useId()` + Context) |
| 토글/드롭다운 트리거 | `aria-expanded`                         |
| 로딩 버튼            | `aria-busy`                             |
| 아이콘 버튼          | `aria-label`                            |
| 장식 아이콘          | `aria-hidden="true"`                    |

---

## 핵심 파일 상호작용

### 동시 수정이 필요한 파일 조합

| 변경 대상                   | 함께 수정해야 할 파일                                                           |
| --------------------------- | ------------------------------------------------------------------------------- |
| 새 feature 타입 추가        | `features/[feature]/types/` + `features/[feature]/services/` (타입 import)      |
| Supabase 테이블 스키마 변경 | 마이그레이션 SQL + `features/[feature]/types/` + `features/[feature]/services/` |
| 새 라우트 추가 (보호)       | `src/app/[route]/` + `src/shared/lib/supabase/proxy.ts` (미들웨어 규칙)         |
| shadcn/ui 컴포넌트 추가     | `src/shared/ui/[Component].tsx` (리네이밍) + 사용하는 컴포넌트 파일             |
| 디자인 토큰 변경            | `src/shared/styles/tokens.css` + 영향받는 컴포넌트 확인                         |
| PRD 기능 변경               | `docs/PRD.md` + `docs/ROADMAP.md` (태스크 업데이트)                             |

---

## AI 의사결정 기준

### Server vs Client Component

```
컴포넌트에서 hooks/browser API/이벤트 핸들러를 직접 사용하는가?
├── YES → "use client" 선언
└── NO → Server Component (기본)
```

### 파일 배치 결정

```
이 코드가 2개 이상의 feature에서 사용되는가?
├── YES → src/shared/ 하위에 배치
└── NO → src/features/[feature]/ 하위에 배치
```

### Import 경로 결정

```
현재 파일과 대상 파일이 같은 모듈(feature) 안에 있는가?
├── YES → 상대 경로 (./Component, ../types)
└── NO → 절대 경로 (@/shared/ui/Badge, @/features/auth/types/oauth)
```

---

## 금지 사항

### 코드 패턴

- **`_components` 디렉토리** 사용 금지
- **배럴 파일(`index.ts`)** 사용 금지
- **`export default`** 금지 (page.tsx, layout.tsx, route.ts 예외)
- **`React.*` 네임스페이스** 금지 → 직접 import
- **`forwardRef`** 금지 → ref를 일반 prop으로 전달
- **`useContext`** 금지 → `use(Context)` 사용
- **`.Provider`** 금지 → `<Context value={...}>` 사용
- **JSX 인라인 함수** 금지 → named 화살표 함수로 추출
- **CVA 외부 export** 금지
- **Supabase 클라이언트 전역 변수** 금지 (서버 사이드)
- **Tailwind 임의값** 금지 (기본 클래스 존재 시)
- **inline style로 `color-scheme`** 금지

### 문제 해결

- **`setTimeout`/`setInterval`로 이슈 우회** 절대 금지
- **임시 플래그 변수**로 이슈 우회 금지
- 근본 원인 분석 후 해결할 것

### 워크플로우

- **`git add .`** 또는 **`git add -A`** 금지 → 개별 파일 지정
- **자동 커밋** 금지 → 사용자 명시적 요청 시에만
- **커밋 메시지**: 한국어, `<타입>: <제목>` 형식
- **불필요한 주석** 금지 — 자명한 코드는 주석 없이 작성
