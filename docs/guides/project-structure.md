# 프로젝트 구조 가이드

이 문서는 Next.js 16.x 프로젝트의 폴더 구조, 파일 조직 및 네이밍 컨벤션을 정의합니다.

## 전체 프로젝트 구조

```
nextjs-supabase-app/
├── docs/                           # 프로젝트 문서
│   └── guides/                    # 개발 가이드 모음
├── public/                        # 정적 파일 (이미지, 아이콘)
├── src/                           # 소스 코드 루트
│   ├── app/                      # Next.js App Router
│   ├── features/                 # 기능별 모듈 (Feature-based)
│   └── shared/                   # 공유 자원
│       ├── components/           # 공유 컴포넌트
│       ├── fonts/                # 웹 폰트
│       ├── hooks/                # 공유 커스텀 훅
│       ├── lib/                  # 유틸리티 및 설정
│       ├── styles/               # 전역 스타일
│       ├── ui/                   # shadcn/ui 기반 UI 컴포넌트
│       └── utils/                # 순수 유틸리티 함수
├── components.json               # shadcn/ui 설정
├── next.config.ts                # Next.js 설정
├── package.json                  # 의존성 및 스크립트
└── tsconfig.json                 # TypeScript 설정
```

## 세부 폴더 구조

### src/app/ - App Router 페이지

```
src/app/
├── layout.tsx               # 루트 레이아웃 (전역 설정)
├── page.tsx                # 홈페이지 (/)
├── favicon.ico             # 파비콘
├── opengraph-image.png     # OG 이미지
├── instruments/            # Instruments 페이지
│   └── page.tsx
├── auth/                   # 인증 관련 페이지
│   ├── confirm/
│   │   └── route.ts       # 인증 확인 API 라우트
│   ├── login/
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   └── ...
└── protected/              # 인증 필요 페이지
    ├── layout.tsx
    └── page.tsx
```

App Router 규칙:

- `page.tsx`: 해당 경로의 메인 페이지
- `layout.tsx`: 레이아웃 컴포넌트 (자식 페이지 감쌈)
- `loading.tsx`: 로딩 UI (필요시)
- `error.tsx`: 에러 UI (필요시)
- `not-found.tsx`: 404 페이지 (필요시)
- `route.ts`: API 라우트 핸들러

### src/shared/ - 공유 자원

```
src/shared/
├── ui/                     # shadcn/ui 기반 UI 컴포넌트
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Checkbox.tsx
│   ├── DropdownMenu.tsx
│   ├── Input.tsx
│   └── Label.tsx
├── components/             # 비즈니스 공유 컴포넌트
│   ├── AuthButton.tsx
│   ├── Hero.tsx
│   ├── LoginForm.tsx
│   ├── ThemeSwitcher.tsx
│   └── tutorial/
│       ├── CodeBlock.tsx
│       └── TutorialStep.tsx
├── hooks/                  # 커스텀 훅
│   └── useTheme.ts
├── lib/                    # 라이브러리 설정 및 어댑터
│   ├── utils.ts
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── proxy.ts
├── utils/                  # 순수 유틸리티 함수
│   ├── cn.ts
│   └── logger.ts
├── fonts/                  # 웹 폰트 파일
│   └── PretendardVariable.woff2
└── styles/                 # 전역 스타일
    ├── globals.css         # 진입점 (imports만)
    ├── tokens.css          # 디자인 토큰 (CSS 변수)
    ├── base.css            # 기본 스타일
    └── animations.css      # 애니메이션 정의
```

### src/features/ - Feature-based 모듈

```
src/features/
├── auth/                   # 인증 기능
│   ├── components/        # 기능 전용 컴포넌트
│   │   ├── LoginForm.tsx
│   │   └── SignUpForm.tsx
│   ├── types/             # 기능 전용 타입
│   │   └── auth.ts
│   └── services/          # 기능 전용 서비스
│       └── authService.ts
└── dashboard/              # 대시보드 기능
    ├── components/
    ├── types/
    └── services/
```

Feature-based 구조 규칙:

1. 특정 기능에 속하는 컴포넌트/타입/서비스는 해당 feature 폴더에 배치
2. 여러 기능에서 공유하는 코드는 `src/shared/`에 배치
3. feature 간 직접 참조 지양 (shared를 통해 공유)

## 파일 네이밍 컨벤션

### 파일명 규칙

```bash
# 컴포넌트: PascalCase (필수)
Button.tsx
UserProfile.tsx
ThemeSwitcher.tsx

# utils/hooks: camelCase (필수)
useTheme.ts
formatDate.ts
cn.ts

# 설정/스키마: camelCase
authService.ts
```

### 컴포넌트 네이밍

```typescript
// PascalCase 사용
export function UserProfile() {}
export function LoginForm() {}
```

### 폴더 네이밍

```bash
# 소문자 또는 kebab-case
components/
user-settings/
api-routes/
```

## 경로 별칭 (Path Aliases)

`tsconfig.json`에 정의된 경로 별칭: `@/*` -> `./src/*`

```typescript
// 경로 별칭 사용
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import { LoginForm } from "@/shared/components/LoginForm";
import { useTheme } from "@/shared/hooks/useTheme";

// 상대 경로 사용 금지
import { Button } from "../../../shared/ui/Button";
```

`components.json`에 정의된 shadcn/ui 별칭:

- `@/shared/ui` -> UI 컴포넌트 설치 경로
- `@/shared/lib/utils` -> `cn` 유틸리티 경로
- `@/shared/hooks` -> 커스텀 훅 경로
- `@/shared/lib` -> 라이브러리 경로

## 새 파일/폴더 추가 규칙

### 1. 새 UI 컴포넌트 추가

```bash
# shadcn/ui 컴포넌트 추가 후 PascalCase로 리네이밍
pnpm dlx shadcn@latest add dialog
# dialog.tsx -> Dialog.tsx 로 리네이밍 필수
```

### 2. 새 페이지 추가

```bash
# 정적 페이지
src/app/about/page.tsx

# 동적 페이지
src/app/users/[id]/page.tsx

# 그룹 라우트
src/app/(auth)/login/page.tsx
```

### 3. 새 비즈니스 컴포넌트 추가

위치 결정 기준:

1. 특정 기능에서만 사용 -> `src/features/[feature]/components/`
2. 여러 기능에서 공유 -> `src/shared/components/`
3. 순수 UI 컴포넌트 -> `src/shared/ui/`

### 4. 새 유틸리티 추가

```bash
# 공통 유틸리티
src/shared/utils/formatDate.ts

# 라이브러리 어댑터/설정
src/shared/lib/someLibrary.ts
```

## 코드 조직 베스트 프랙티스

### 1. 단일 책임 원칙

- 하나의 파일은 하나의 주요 기능만 담당
- 관련된 타입은 같은 파일에 포함 가능

### 2. 의존성 순서

```typescript
// 1. 외부 라이브러리
import { Suspense } from "react";
import type { NextPage } from "next";

// 2. 내부 라이브러리 (@/ 경로)
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";

// 3. 상대 경로
import "./component.css";
```

### 3. Export 규칙

```typescript
// Named export 사용 (권장)
export function LoginForm() {}

// Default export (페이지 컴포넌트만)
export default function LoginPage() {}
```

### 4. 파일 크기 관리

- 단일 파일: 300줄 이하 권장
- 300줄 초과 시 분할 고려

## 금지사항

### 피해야 할 구조

```bash
# _components 디렉토리 사용 금지
src/app/dashboard/_components/Chart.tsx

# 배럴 파일(index.ts) 사용 금지
src/shared/ui/index.ts

# 깊은 중첩 구조 (4단계 이상)
src/features/auth/components/forms/login/LoginForm.tsx

# 의미 없는 폴더명
src/components/misc/
src/components/common/
```

### 피해야 할 패턴

```typescript
// 혼재된 import 방식
import Button from "@/shared/ui/Button"; // default
import { Card } from "@/shared/ui/Card"; // named
// -> 하나의 방식으로 통일 (named export 우선)

// 깊은 상대 경로
import { utils } from "../../../../../shared/lib/utils";
// -> @/ 별칭 사용
```

## 체크리스트

새 파일/폴더 추가 시 확인사항:

- [ ] 적절한 카테고리 폴더에 배치
- [ ] 컴포넌트 파일명은 PascalCase
- [ ] utils/hooks 파일명은 camelCase
- [ ] PascalCase 컴포넌트명 사용
- [ ] `@/` 경로 별칭 사용
- [ ] Named export 사용
- [ ] 의존성 import 순서 준수
- [ ] 파일 크기 300줄 이하 유지
- [ ] `_components` 디렉토리 사용하지 않음
- [ ] 배럴 파일(index.ts) 생성하지 않음
