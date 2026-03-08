---
description: Import/Export 규칙
paths: ["src/**/*.ts", "src/**/*.tsx"]
---

# Import/Export 컨벤션

- Named exports 우선 (프레임워크 요구사항 예외: page.tsx, layout.tsx 등)
- Import 순서: external → internal (`@/*`) → relative (`./`, `../`)
- 모듈 간 import: `@/*` 절대 경로 (예: `@/shared/ui/Button`, `@/features/auth/types`)
- 모듈 내부 import: `./`, `../` 상대 경로 (예: `../types`, `./TodoItem`)
- 배럴 파일(index.ts) 사용 금지 — 직접 파일 경로로 import
