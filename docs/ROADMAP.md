# Dayli 개발 로드맵

사용자들이 7일~30일 단기 챌린지에 참여하고, 매일 이미지 기반 인증을 통해 목표를 달성하도록 돕는 모바일 퍼스트 챌린지 플랫폼

## 개요

Dayli는 챌린지 운영자와 참여자를 위한 단기 챌린지 플랫폼으로 다음 기능을 제공합니다:

- **챌린지 생성 및 관리**: 운영자가 7/14/21/30일 챌린지를 생성하고 참여자를 관리 (F003~F006)
- **이미지 기반 인증 시스템**: 참여자가 매일 이미지와 메모로 챌린지 달성을 인증 (F011~F013)
- **실시간 참여 현황**: Supabase Realtime을 활용한 참여자 수/인증 현황 실시간 업데이트 (F014~F015)
- **관리자 대시보드**: 서비스 전체 현황 모니터링 및 통계 시각화 (F016~F019)

## 기술 스택

| 분류       | 기술                                                  |
| ---------- | ----------------------------------------------------- |
| 프레임워크 | Next.js 16.x (App Router)                             |
| UI         | React 19.x, TypeScript 5.9.x (strict)                 |
| 스타일링   | Tailwind CSS 4.x, shadcn/ui 4.x                       |
| 백엔드     | Supabase (Auth, Database, Storage, Realtime, pg_cron) |
| 차트       | Recharts 2.x                                          |
| 배포       | Vercel                                                |

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현 (구현 -> 테스트 -> 검증 사이클)**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - 구현 완료 -> 개발 서버 실행 -> Playwright MCP로 E2E 테스트 -> 결과 기록 (매 단계 반복)
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 테스트 통과 없이 다음 단계 진행 금지
   - Task 파일에 `## 테스트 결과` 섹션 추가하여 테스트 실행 결과 기록

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 완료 상태로 표시

## 개발 전략: UI-First 접근법

이 로드맵은 **UI/UX를 최대한 초기에 구현**하는 전략을 채택합니다.

- **Phase 1**: 프로젝트 골격 + 전체 UI 프로토타입 (더미 데이터 기반)
- **Phase 2~6**: 인증/DB 기반 구축 후 이미 만들어진 UI에 실제 데이터를 연결

이 전략의 장점:

- 시각적 결과물을 조기에 확인하여 디자인 피드백 루프를 단축
- UI 변경이 백엔드 의존 없이 빠르게 반영 가능
- 전체 앱 플로우를 초기에 체험할 수 있어 사용자 경험 검증 용이

## 페이즈 요약

| Phase   | 기간  | 목표                               | 선행 조건 | 상태   |
| ------- | ----- | ---------------------------------- | --------- | ------ |
| Phase 1 | 1~2주 | 프로젝트 골격 + 전체 UI 프로토타입 | 없음      | 완료   |
| Phase 2 | 3주차 | 인증 시스템 + DB 기반 구축         | Phase 1   | 미시작 |
| Phase 3 | 4주차 | 챌린지 CRUD 기능 연결              | Phase 2   | 미시작 |
| Phase 4 | 5주차 | 참여/탈퇴 + 실시간 기능 연결       | Phase 3   | 미시작 |
| Phase 5 | 5~6주 | 인증(Check-in) 시스템 기능 연결    | Phase 4   | 미시작 |
| Phase 6 | 6주차 | 관리자 기능 연결 + 배포            | Phase 5   | 미시작 |

> 1인 개발자 기준이므로 병렬 진행 없이 순차적으로 진행합니다.

---

## 개발 단계

### Phase 1: 프로젝트 골격 + 전체 UI 프로토타입 — 완료

**목표:** 전체 라우트 골격, 타입 정의, 더미 데이터 기반 모든 페이지 UI 완성
**선행 조건:** 없음
**순서 근거:** UI를 먼저 완성하여 디자인 피드백 루프를 단축하고 전체 앱 플로우를 조기에 검증함
**완료 기준:** 모든 페이지 UI가 더미 데이터로 렌더링되고, 네비게이션/라우팅이 동작하며, 다크모드/로딩 스켈레톤/빈 상태가 적용됨

- **Task 001: 프로젝트 구조 및 전체 라우트 골격 생성** `TASK-001` `done`
  - Next.js App Router 기반 전체 라우트 구조 생성 (PRD 섹션 7 프로젝트 구조 기준)
  - `src/app/(service)/(auth)/page.tsx` 홈 페이지 (`/`)
  - `src/app/(service)/(auth)/my-challenges/page.tsx`, `my-checkins/page.tsx`
  - `src/app/(service)/challenges/page.tsx`, `new/page.tsx`, `[id]/page.tsx`, `[id]/edit/page.tsx`, `[id]/checkin/page.tsx`
  - `src/app/admin/(dashboard)/page.tsx`, `challenges/page.tsx`, `users/page.tsx`, `stats/page.tsx`
  - `src/app/(service)/auth/callback/route.ts` OAuth 콜백 라우트
  - features 디렉토리 구조 생성: `auth/`, `challenges/`, `checkins/`, `admin/` (각각 `components/`, `types/`)
  - 관련 기능: 전체

- **Task 002: TypeScript 타입 정의 및 더미 데이터 생성** `TASK-002` `done`
  - `src/features/auth/types/` - User, OAuth 타입 정의
  - `src/features/challenges/types/` - Challenge, ChallengeCategory, ChallengeStatus, ChallengeParticipant, 상수 정의
  - `src/features/checkins/types/` - ChallengeCheckin 타입 정의
  - `src/features/admin/types/` - AdminDashboardStats, 차트 데이터 타입 정의
  - `src/shared/mocks/` - challenges, checkins, participants, users, adminStats 더미 데이터
  - 관련 기능: 전체

- **Task 003: 공통 레이아웃 및 네비게이션 UI 구현** `TASK-003` `done`
  - `src/shared/layouts/Header.tsx` 공통 헤더 (비로그인/로그인 상태 분기, 사용자 드롭다운)
  - `src/shared/layouts/Footer.tsx` 공통 푸터
  - `src/shared/layouts/MobileTabBar.tsx` 모바일 하단 탭 네비게이션
  - 로그인 상태: 더미 플래그 `IS_LOGGED_IN`으로 전환 가능
  - shadcn/ui 컴포넌트 설치 (Button, Card, Badge, DropdownMenu, Dialog, Tabs, Select, Input, Textarea 등)
  - 다크모드 설정 (next-themes, View Transitions API 테마 전환 애니메이션)

- **Task 004: 홈 페이지 UI 구현** `TASK-004` `done` `F001` `F020`
  - `src/app/(service)/(auth)/page.tsx` 홈 페이지 (`/`) 구현
  - 오늘 인증 미완료 챌린지 카드 목록 (최대 5개, 인증하기 버튼)
  - 전체 인증률 요약 (프로그레스바)
  - 인기 챌린지 추천 섹션 (최대 6개)
  - 새 챌린지 만들기 CTA 버튼
  - 더미 데이터 기반 렌더링

- **Task 005: 챌린지 목록/상세/생성/수정 페이지 UI 구현** `TASK-005` `done` `F003` `F004` `F005` `F007` `F008`
  - `src/features/challenges/components/ChallengeCard.tsx` 카드 컴포넌트
  - `src/app/(service)/challenges/page.tsx` 챌린지 목록 (필터, 정렬, 빈 상태)
  - `src/features/challenges/components/ChallengeDetail.tsx` 상세 컴포넌트 (운영자/참여자 버튼 분기)
  - `src/app/(service)/challenges/[id]/page.tsx` 챌린지 상세 페이지
  - `src/features/challenges/components/ChallengeForm.tsx` 폼 컴포넌트 (React Hook Form + Zod)
  - `src/app/(service)/challenges/new/page.tsx` 생성, `[id]/edit/page.tsx` 수정 페이지
  - 실시간 글자 수 표시, 유효성 검사 UI, 삭제 확인 다이얼로그

- **Task 006: 인증 업로드/기록 페이지 UI 구현** `TASK-006` `done` `F011` `F012` `F013`
  - `src/features/checkins/components/CheckinUploader.tsx` 업로더 (이미지 업로드, 미리보기, 메모, 진행률)
  - `src/app/(service)/challenges/[id]/checkin/page.tsx` 인증 업로드 페이지
  - `src/features/checkins/components/CheckinGrid.tsx` 참여자 인증 현황 그리드
  - `src/features/checkins/components/CheckinCalendar.tsx` 달력 뷰 (날짜 클릭 모달, 월 이동)
  - `src/app/(service)/(auth)/my-checkins/page.tsx` 내 인증 기록 페이지

- **Task 007: 내 챌린지 페이지 UI 구현** `TASK-007` `done` `F020`
  - `src/app/(service)/(auth)/my-challenges/page.tsx` 내 챌린지 페이지
  - "운영 중" / "참여 중" 탭, 오늘 인증 여부 배지, 인증률 프로그레스바
  - 빈 상태 화면

- **Task 008: 관리자 페이지 UI 구현** `TASK-008` `done` `F016` `F017` `F018` `F019`
  - `src/shared/layouts/AdminLayout.tsx` 관리자 레이아웃 (사이드바 + 메인)
  - `src/shared/layouts/AdminSidebarNav.tsx` 사이드바 네비게이션
  - `src/app/admin/(dashboard)/page.tsx` 대시보드 (지표 카드 4개, Recharts 차트 2개, 최근 목록)
  - `src/app/admin/(dashboard)/challenges/page.tsx` 챌린지 관리 (테이블, 필터, 상태 변경, 페이지네이션)
  - `src/app/admin/(dashboard)/users/page.tsx` 사용자 관리 (테이블, 검색, 활성화 토글)
  - `src/app/admin/(dashboard)/stats/page.tsx` 통계 (기간 선택, Recharts 차트 4개)
  - `src/features/admin/components/StatsChart.tsx` 차트 컴포넌트 모음

- **Task 009: 로딩 스켈레톤, 빈 상태, 에러 UI 구현** `TASK-009` `done`
  - 로딩 스켈레톤 UI: 챌린지 목록, 챌린지 상세, 관리자 대시보드/챌린지/사용자
  - 빈 상태(Empty State) UI 전체 적용
  - 에러 바운더리: 전역 `error.tsx`, `not-found.tsx`, 챌린지 상세 `error.tsx`
  - 로그인 페이지 UI (Google OAuth, 에러 표시, returnUrl 지원)
  - 관리자 로그인 페이지 UI

### Phase 2: 인증 시스템 + DB 기반 구축

**목표:** Supabase 설정, Google OAuth 로그인 완성, 핵심 테이블 구축
**선행 조건:** Phase 1 (라우트 골격, 타입 정의)
**순서 근거:** 인증은 모든 보호 라우트의 전제 조건이며, DB 테이블은 이후 모든 기능 연결의 기반임
**완료 기준:** Google 계정 로그인/로그아웃 동작, users 테이블 레코드 생성, 보호 라우트 리디렉션, 모든 핵심 테이블 및 Storage 버킷 생성 완료

- **Task 010: Supabase 프로젝트 설정 및 전체 DB 스키마 구축** `TASK-010` `todo` `F001`
  - Supabase 프로젝트 환경변수 설정 (`.env.local`)
  - Supabase 클라이언트 설정 (`@supabase/ssr` 기반 서버/클라이언트 유틸리티)
  - `users` 테이블 마이그레이션 (PRD 섹션 6-1 스키마 기준)
  - users 테이블 RLS 정책 설정 (SELECT: 모든 인증 사용자, UPDATE: 본인만)
  - Auth Trigger: 신규 가입 시 users 테이블 자동 레코드 생성
  - `updated_at` 자동 갱신 트리거
  - `challenges` 테이블 마이그레이션 (인덱스 전략 적용)
  - challenges RLS 정책 설정 (SELECT: 모든 사용자, INSERT: 인증 사용자, UPDATE/DELETE: 운영자 또는 admin)
  - `set_end_date` 트리거, `update_updated_at` 트리거
  - `challenge_participants` 테이블 마이그레이션 (Partial UNIQUE 인덱스 포함)
  - challenge_participants RLS 정책 설정
  - `update_current_participants` 트리거 (INSERT 시 증가, UPDATE(left_at) 시 감소)
  - `challenge_checkins` 테이블 마이그레이션 (UNIQUE: challenge_id, user_id, check_in_date)
  - challenge_checkins RLS 정책 설정
  - Supabase Storage `challenge-thumbnails` 버킷 생성 (공개, 5MB 제한, image/\* MIME)
  - Supabase Storage `checkin-images` 버킷 생성 (공개, 10MB 제한, image/\* MIME)
  - Supabase Database 타입 생성 (`supabase gen types typescript`)

- **Task 011: Google OAuth 로그인 및 인증 proxy 구현** `TASK-011` `todo` `F001` `F002`
  - Supabase Auth Google OAuth Provider 설정
  - `src/app/(service)/auth/callback/route.ts` OAuth 콜백 처리 구현 (서비스용)
  - `src/app/admin/auth/callback/route.ts` OAuth 콜백 처리 구현 (관리자용)
  - `src/proxy.ts` (Next.js 16 proxy): `(service)/(auth)` 그룹 라우트 인증 보호, `/admin/*` role='admin' 체크
  - 로그인 페이지: `src/app/(service)/auth/login/page.tsx` (Google OAuth)
  - 관리자 로그인 페이지: `src/app/admin/login/page.tsx` (Google OAuth)
  - 로그아웃 기능 구현 (세션 종료 후 홈 페이지 리디렉션)
  - 공통 헤더/모바일 탭의 더미 로그인 상태를 실제 인증 상태로 교체

### Phase 3: 챌린지 CRUD 기능 연결

**목표:** Phase 1에서 만든 챌린지 관련 UI에 실제 Supabase 데이터를 연결
**선행 조건:** Phase 2 (DB 스키마, 인증 시스템)
**순서 근거:** 챌린지는 플랫폼의 핵심 엔티티이며, 참여/인증 기능의 전제 조건임. UI는 이미 완성되어 있으므로 데이터 연결에 집중
**완료 기준:** 챌린지 CRUD가 실제 DB로 동작, 썸네일 업로드, 필터/무한 스크롤이 실제 데이터로 동작, 운영자만 수정/삭제 가능

- **Task 012: 챌린지 생성/수정/삭제 기능 연결** `TASK-012` `todo` `F003` `F004` `F005` `F006`
  - `src/features/challenges/services/challengeService.ts` 서비스 레이어 구현
  - ChallengeForm에 실제 Supabase INSERT/UPDATE 연결
  - 썸네일 이미지 클라이언트 리사이징 (최대 1920px, WebP 변환, 품질 80%)
  - Supabase Storage 업로드 연동
  - 생성 성공 시 챌린지 상세 페이지로 이동
  - 수정 모드: 기간/최대인원 필드 비활성화, "진행 중 변경 불가" 안내
  - 삭제: 참여자 1명 이상이면 삭제 불가 (종료 처리만 가능), 확인 다이얼로그
  - 상태 수동 전환: 운영자는 recruiting -> finished(강제 종료) 또는 hidden으로만 변경 가능
  - 더미 데이터를 실제 API 호출로 교체

- **Task 013: 챌린지 목록/상세 페이지 데이터 연결** `TASK-013` `todo` `F007` `F008`
  - 챌린지 목록 페이지의 더미 데이터를 Supabase 쿼리로 교체
  - 카테고리/기간/상태 필터 실제 쿼리 구현
  - 정렬 옵션 (최신순/참여자 많은순/마감 임박순) 실제 쿼리 구현
  - 무한 스크롤 실제 구현 (`useInfiniteScroll` 훅 완성, 페이지당 12개)
  - 챌린지 상세 페이지의 더미 데이터를 Supabase 쿼리로 교체
  - 비로그인 사용자도 목록/상세 조회 가능

### Phase 4: 참여/탈퇴 + 실시간 기능 연결

**목표:** Phase 1에서 만든 참여 관련 UI에 실제 데이터를 연결하고 Supabase Realtime 구독 구현
**선행 조건:** Phase 3 (challenges 데이터 연결)
**순서 근거:** 참여 시스템은 인증(Check-in) 기능의 전제 조건이며, 실시간 기능은 참여 데이터에 의존함
**완료 기준:** 참여/탈퇴가 실제 DB로 동작, 실시간 참여자 수 업데이트, 내 챌린지/홈 페이지 실제 데이터 표시

- **Task 014: 챌린지 참여/탈퇴 기능 연결** `TASK-014` `todo` `F009` `F010`
  - 챌린지 상세 페이지의 참여하기/탈퇴하기 버튼에 실제 DB 연동
  - 참여 비즈니스 규칙 적용: 이미 참여 중 재참여 불가, 최대 인원 도달 시 불가, 종료 챌린지 불가
  - 비로그인 사용자 클릭 시 로그인 페이지 리디렉션
  - 탈퇴: left_at 필드를 현재 시각으로 soft delete, 기존 인증 기록 유지
  - 동시 참여 신청 정합성: DB 트랜잭션 활용
  - 참여자 현황 섹션: 실제 참여자 수 / 최대 참여자 수 표시

- **Task 015: Supabase Realtime 구독 구현** `TASK-015` `todo` `F014` `F015`
  - `src/shared/hooks/useRealtime.ts` Supabase Realtime 구독 커스텀 훅
  - 챌린지 상세 페이지: challenge_participants 테이블 변경 구독 -> 참여자 수 실시간 반영
  - 챌린지 상세 페이지: challenge_checkins 테이블 변경 구독 -> 인증 현황 실시간 반영
  - 컴포넌트 언마운트 시 구독 해제 처리
  - 다른 브라우저 탭에서 참여/인증 시 즉시 반영 검증

- **Task 016: 내 챌린지/홈 페이지 데이터 연결** `TASK-016` `todo` `F020`
  - 내 챌린지 페이지의 더미 데이터를 Supabase 쿼리로 교체
  - "운영 중" 탭: 실제 내가 만든 챌린지 목록 조회
  - "참여 중" 탭: 실제 참여 중인 챌린지 목록 + 오늘 인증 여부 + 인증률 계산
  - 홈 페이지 데이터 연결: 참여 중 챌린지, 오늘 인증 미완료 목록, 인기 챌린지

### Phase 5: 인증(Check-in) 시스템 기능 연결

**목표:** Phase 1에서 만든 인증 관련 UI에 실제 데이터를 연결
**선행 조건:** Phase 4 (참여 시스템)
**순서 근거:** 인증은 참여 중인 사용자만 가능하므로 참여 시스템이 선행되어야 함
**완료 기준:** 인증 이미지 업로드/조회 실제 동작, 당일 중복 인증 차단, 달력 뷰 실제 데이터, 실시간 인증 현황

- **Task 017: 인증 업로드 기능 연결** `TASK-017` `todo` `F011`
  - `src/features/checkins/services/checkinService.ts` 서비스 레이어 구현
  - CheckinUploader에 실제 Supabase Storage 업로드 + DB INSERT 연결
  - 이미지 클라이언트 리사이징 (최대 1920px, WebP 변환, 품질 80%)
  - 업로드 진행률 실제 구현
  - check_in_date: KST 기준 날짜 (Intl.DateTimeFormat 활용)
  - 비즈니스 규칙: 당일 1회 제한, 챌린지 기간 이외 불가, 참여 중인 사용자만, MIME type 검증
  - 이미 오늘 인증 완료 시: 완료 상태 화면 (재업로드 불가 안내)
  - 업로드 성공 시 챌린지 상세 페이지로 이동 (성공 토스트)

- **Task 018: 인증 현황/기록 페이지 데이터 연결** `TASK-018` `todo` `F012` `F013` `F015`
  - CheckinGrid의 더미 데이터를 Supabase 쿼리로 교체
  - 챌린지 상세 페이지: 참여자별 오늘 인증 완료 여부 실제 데이터 표시
  - Realtime 구독 연동 (다른 참여자 인증 시 실시간 갱신)
  - "오늘 인증하기" 버튼 / "인증 완료" 배지 상태 실제 데이터 연결
  - CheckinCalendar의 더미 데이터를 Supabase 쿼리로 교체
  - 내 인증 기록 페이지: 참여 중 챌린지 선택, 월별 달력 뷰, 인증률 실제 계산
  - 날짜 클릭 시 실제 인증 이미지/메모 모달 표시

### Phase 6: 관리자 기능 연결 + 배포

**목표:** 관리자 페이지에 실제 데이터 연결, 챌린지 상태 자동 전환, 최종 폴리싱 및 배포
**선행 조건:** Phase 5 (모든 일반 사용자 기능 완성)
**순서 근거:** 관리자 기능은 일반 사용자 기능이 모두 완성된 후 실제 데이터로 검증 가능하며, 배포는 최종 단계
**완료 기준:** 관리자 대시보드 실제 지표 정확성, pg_cron 자동 전환, Vercel 프로덕션 배포 성공

- **Task 019: 관리자 대시보드 데이터 연결** `TASK-019` `todo` `F016`
  - `src/features/admin/services/adminService.ts` 통계 데이터 쿼리 서비스 구현
  - 관리자 대시보드의 더미 데이터를 Supabase 쿼리로 교체
  - 핵심 지표 카드 4개 실제 데이터 연결 (MAU, 챌린지 수, 오늘 인증 수, 신규 가입자)
  - Recharts 차트 실제 데이터 연결

- **Task 020: 관리자 챌린지/사용자 관리 기능 연결** `TASK-020` `todo` `F017` `F018`
  - 관리자 챌린지 관리 페이지의 더미 데이터를 Supabase 쿼리로 교체
  - 상태 변경 드롭다운 실제 DB 연동 (관리자는 모든 상태로 변경 가능)
  - 챌린지 강제 삭제 기능 실제 구현
  - 관리자 사용자 관리 페이지의 더미 데이터를 Supabase 쿼리로 교체
  - 이메일/닉네임 검색 실제 쿼리 구현
  - 사용자 비활성화/활성화 토글 실제 DB 연동
  - 페이지네이션 실제 구현 (페이지당 20개)

- **Task 021: 관리자 통계 페이지 데이터 연결** `TASK-021` `todo` `F019`
  - `src/features/admin/components/StatsChart.tsx` 차트 컴포넌트에 실제 데이터 연결
  - 기간 선택 탭 (최근 7일/30일/90일) 실제 쿼리 구현
  - 일별 신규 가입자 LineChart, 챌린지 생성 BarChart, 인증 업로드 BarChart, 카테고리별 참여자 BarChart 실제 데이터 연결
  - 통계 데이터 SQL 쿼리 최적화 (Supabase RPC 함수 활용)

- **Task 022: 챌린지 상태 자동 전환 (pg_cron) 구현** `TASK-022` `todo` `F006`
  - Supabase pg_cron 확장 활성화
  - 매일 KST 00:00 (UTC 15:00) 실행 스케줄러 설정
  - `recruiting` -> `in_progress`: start_date 당일 도래 시 자동 전환
  - `in_progress` -> `finished`: end_date 익일 도래 시 자동 전환
  - 상태 전환 SQL 쿼리 작성 및 테스트

- **Task 023: UX 폴리싱 및 접근성 검수** `TASK-023` `todo`
  - 다크모드 전체 페이지 최종 검수 및 미적용 페이지 보완
  - 반응형 디자인 최종 검수 (375px~ 모바일 대응)
  - 오픈그래프 메타 태그 설정 (각 페이지별)
  - 접근성 검수 (키보드 네비게이션, ARIA 속성)
  - 토스트 알림 통합 (성공/에러/정보)

- **Task 024: Vercel 배포 및 프로덕션 환경 설정** `TASK-024` `todo`
  - Vercel 프로젝트 생성 및 환경변수 설정
  - Supabase 프로덕션 환경 설정 (RLS 최종 검증)
  - pg_cron 확장 프로덕션 활성화
  - 배포 검증: 로그인 -> 챌린지 참여 -> 인증 업로드 전체 플로우 E2E 테스트
  - 성능 검수: Lighthouse 점수 확인

---

## 상태 관리 규칙

- **Phase 상태**: Phase 제목 뒤에 체크 표시로 완료 표시 (예: `### Phase 1: ... 완료`)
- **Task 상태**:
  - `todo` - 대기 중
  - `in_progress` - 진행 중
  - `done` - 완료 (완료 시 `See: /tasks/XXX-xxx.md` 참조 추가)
- **우선순위**: Phase 내 첫 번째 Task가 기본 우선순위. 별도 표기 시 `- 우선순위` 추가

## 더미 데이터 -> 실제 데이터 전환 전략

Phase 1에서 생성한 더미 데이터(mock data)는 Phase 3~6에서 다음 패턴으로 실제 데이터로 교체합니다:

1. **서비스 레이어 구현**: `src/features/[feature]/services/` 에 Supabase 쿼리 서비스 작성
2. **컴포넌트 데이터 소스 교체**: 더미 데이터 import를 서비스 함수 호출로 교체
3. **더미 데이터 정리**: 해당 기능의 모든 더미 데이터가 교체되면 mock 파일에서 제거
4. **검증**: Playwright MCP로 실제 데이터 기반 동작 E2E 테스트
