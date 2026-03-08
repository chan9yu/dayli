---
description: 프로젝트 구조 및 파일 규칙
---

# 프로젝트 구조

- **Feature-based**: `src/features/[feature]/components|types|services`
- **Shared**: `src/shared/ui|layouts|hooks|utils`
- **Next.js**: `app/` (App Router), Server/Client Component 명확히 구분

## 파일명

- 컴포넌트: PascalCase (`Badge.tsx`, `ThemeSwitcher.tsx`)
- utils/hooks: camelCase (`formatDate.ts`, `useTheme.ts`)

## 금지 사항

- `_components` 디렉토리 사용 금지
