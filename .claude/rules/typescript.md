---
description: TypeScript 코드 작성 규칙
paths: ["src/**/*.ts", "src/**/*.tsx"]
---

# TypeScript 컨벤션

- strict mode 필수
- 모듈 간 import: `@/*` 절대 경로 (예: `@/shared/ui/Button`, `@/features/auth/types`)
- 모듈 내부 import: `./`, `../` 상대 경로 (예: `../types`, `./TodoItem`)
- 리턴 타입 자동 추론 (명시 금지)
- 불필요한 주석 금지 (자명한 코드는 주석 없이 작성)
- `React.MouseEvent` 등 `React.*` 네임스페이스 접근 금지 → `import type { MouseEvent } from "react"` 직접 import
- `@deprecated` 표시된 API 사용 지양, 최신 지원 API로 대체
