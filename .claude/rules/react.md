---
description: React 19 코드 작성 규칙
paths: ["src/**/*.tsx"]
---

# React 19 컨벤션

## API 패턴

- `use(Context)` 사용 (`useContext` 대신)
- `<Context value={...}>` 사용 (`.Provider` 대신)
- ref는 일반 prop으로 전달 (`forwardRef` 금지)
- 내장 유틸리티 타입(`PropsWithChildren` 등) 활용 (커스텀 재정의 금지)

## 함수 스타일

- JSX 인라인 함수 지양 → named 함수로 추출 (`onChange={handleChange}`)
- 컴포넌트 내부 함수는 화살표 함수 사용 (`function handleX()` -> `const handleX = () =>`)

## 성능

- `useCallback`/`useMemo`: Context Provider value 안정성 용도로만 사용
