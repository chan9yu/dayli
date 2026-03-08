---
description: CSS 및 Tailwind 스타일링 규칙
paths: ["src/**/*.css", "src/**/*.tsx"]
---

# CSS/스타일 컨벤션

- 전역 CSS: `src/shared/styles/` (globals → tokens, base, animations import)
- 폰트: `src/shared/fonts/`, `next/font/local`로 로드
- Tailwind 기본 클래스가 있으면 임의값 금지: `min-w-[8rem]` → `min-w-32`
