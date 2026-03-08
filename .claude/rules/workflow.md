---
description: 개발 워크플로우 및 문제 해결 원칙
---

# 개발 워크플로우

- Pre-commit: lefthook + Lint-staged (자동 린팅/포매팅)
- 커밋: 명시적 요청 시에만, 작은 단위로

# 문제 해결 원칙

- 근본 원인 분석 후 해결
- 의미 없는 타이머(setTimeout/setInterval)로 이슈 우회 금지
- 임시 플래그 변수 선언으로 이슈 우회 금지
