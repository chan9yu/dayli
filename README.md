# Dayli

단기 챌린지 플랫폼. 사용자가 7/14/21/30일 챌린지에 참여하고 매일 이미지 인증으로 목표를 달성하도록 돕는 모바일 퍼스트 웹 서비스.

## 기술 스택

| 분류       | 기술                                           |
| ---------- | ---------------------------------------------- |
| 프레임워크 | Next.js 16 (App Router)                        |
| 언어       | TypeScript 5.9 (strict mode)                   |
| UI         | React 19, shadcn/ui 4, Tailwind CSS 4          |
| 백엔드     | Supabase (Auth, PostgreSQL, Storage, Realtime) |
| 차트       | Recharts                                       |
| 배포       | Vercel                                         |

## 시작하기

### 사전 요구사항

- Node.js >= 22
- pnpm >= 10

### 설치

```bash
pnpm install
```

### 환경변수

`.env.local` 파일을 생성하고 다음 변수를 설정한다.

```
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<supabase-anon-key>
```

두 값은 [Supabase 대시보드 API 설정](https://supabase.com/dashboard/project/_?showConnect=true)에서 확인할 수 있다.

### 개발 서버

```bash
pnpm dev  # http://localhost:3100
```

## 스크립트

| 명령어              | 설명                  |
| ------------------- | --------------------- |
| `pnpm dev`          | 개발 서버 (포트 3100) |
| `pnpm build`        | 프로덕션 빌드         |
| `pnpm lint`         | ESLint 검사           |
| `pnpm lint:fix`     | ESLint 자동 수정      |
| `pnpm format`       | Prettier 포매팅       |
| `pnpm format:check` | Prettier 포매팅 검사  |
| `pnpm type:check`   | TypeScript 타입 검사  |

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 라우트
├── features/               # 기능 모듈 (auth, challenges, checkins, admin)
│   └── [feature]/
│       ├── components/
│       ├── services/
│       └── types/
└── shared/
    ├── ui/                 # shadcn/ui 컴포넌트
    ├── layouts/            # 공통 레이아웃
    ├── hooks/              # 공통 훅
    ├── utils/              # 유틸리티
    ├── lib/                # 외부 라이브러리 설정 (Supabase 등)
    └── styles/             # 전역 CSS, 디자인 토큰
```

Feature-based 아키텍처. 기능별 코드는 `features/` 하위에, 공유 코드는 `shared/` 하위에 배치한다.

## 문서

| 문서                                               | 설명                                   |
| -------------------------------------------------- | -------------------------------------- |
| [PRD](docs/PRD.md)                                 | 제품 요구사항, 기능 명세, 데이터 모델  |
| [ROADMAP](docs/ROADMAP.md)                         | 개발 로드맵 및 태스크 추적             |
| [프로젝트 구조](docs/guides/project-structure.md)  | 디렉토리 구조 및 파일 배치 규칙        |
| [컴포넌트 패턴](docs/guides/component-patterns.md) | 컴포넌트 작성 패턴                     |
| [스타일링](docs/guides/styling-guide.md)           | Tailwind CSS, 디자인 토큰              |
| [폼 가이드](docs/guides/forms-react-hook-form.md)  | React Hook Form + Zod + Server Actions |
| [Next.js 16 지침](docs/guides/nextjs-16.md)        | App Router 개발 규칙                   |

## 라이선스

Private
