# React Hook Form + Zod + Server Actions 완전 가이드

이 문서는 Next.js 16.x에서 React Hook Form + Zod + Server Actions를 활용한 최적의 폼 처리 패턴을 제공합니다.

## 기본 설정 및 셋업

### 패키지 설치

```bash
# 필수 패키지
pnpm add react-hook-form @hookform/resolvers zod

# 고급 기능을 위한 추가 패키지 (선택적)
pnpm add use-debounce react-error-boundary
```

### TypeScript 설정 최적화

```typescript
// src/shared/lib/types/forms.ts
import type { z } from "zod";

// 공통 폼 타입 정의
type FormState<T extends z.ZodSchema> = {
	success: boolean;
	message?: string;
	errors?: Partial<Record<keyof z.infer<T>, string[]>>;
	data?: z.infer<T>;
};

// 서버 액션 반환 타입
type ActionResult<T = unknown> = {
	success: boolean;
	message: string;
	data?: T;
	errors?: Record<string, string[]>;
};

// 폼 훅 공통 타입
type FormHookProps<T extends z.ZodSchema> = {
	schema: T;
	defaultValues?: Partial<z.infer<T>>;
	onSubmit: (data: z.infer<T>) => Promise<ActionResult>;
};
```

## 필수 패턴: 기본 폼 아키텍처

### 스키마 정의 패턴

```typescript
// src/shared/lib/schemas/auth.ts
import { z } from "zod";

// 재사용 가능한 기본 스키마 컴포넌트
export const emailSchema = z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다");

export const passwordSchema = z
	.string()
	.min(8, "비밀번호는 최소 8자 이상이어야 합니다")
	.regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
		"비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다"
	);

// 로그인 폼 스키마
export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "비밀번호를 입력해주세요")
});

// 회원가입 폼 스키마
export const registerSchema = z
	.object({
		name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다").max(50, "이름은 최대 50자까지 입력 가능합니다"),
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: z.string(),
		terms: z.boolean().refine((val) => val === true, {
			message: "이용약관에 동의해주세요"
		})
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "비밀번호가 일치하지 않습니다",
		path: ["confirmPassword"]
	});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
```

### Server Actions 정의

```typescript
// src/app/actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";

import { loginSchema, registerSchema } from "@/shared/lib/schemas/auth";
import type { ActionResult } from "@/shared/lib/types/forms";

export async function loginAction(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
	try {
		// 서버 사이드 스키마 검증
		const validatedFields = loginSchema.safeParse({
			email: formData.get("email"),
			password: formData.get("password")
		});

		if (!validatedFields.success) {
			return {
				success: false,
				message: "입력된 정보를 확인해주세요",
				errors: validatedFields.error.flatten().fieldErrors
			};
		}

		const { email, password } = validatedFields.data;

		const user = await authenticateUser(email, password);

		if (!user) {
			return {
				success: false,
				message: "이메일 또는 비밀번호가 올바르지 않습니다"
			};
		}

		await createSession(user.id);

		// 비동기 후처리 작업
		after(async () => {
			await logUserActivity(user.id, "login");
			await updateLastLoginTime(user.id);
		});

		return {
			success: true,
			message: "로그인되었습니다",
			data: { userId: user.id }
		};
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			message: "로그인 중 오류가 발생했습니다"
		};
	}
}
```

### 기본 폼 컴포넌트 패턴

```typescript
// src/features/auth/components/LoginForm.tsx
"use client";

import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { loginSchema, type LoginFormData } from "@/shared/lib/schemas/auth";
import { loginAction } from "@/app/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

export function LoginForm() {
  // React 19: useActionState로 서버 액션 상태 관리
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: "",
  });

  // React Hook Form 설정
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // 폼 제출 처리
  const handleFormSubmit = async (data: LoginFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    formAction(formData);
  };

  // 서버 에러를 폼 필드 에러로 연동
  useEffect(() => {
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        form.setError(field as keyof LoginFormData, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [state.errors, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {state.message && (
          <div className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </div>
        )}

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              로그인 중...
            </>
          ) : (
            "로그인"
          )}
        </Button>
      </form>
    </Form>
  );
}
```

## 권장 사항: 고급 폼 패턴

### 다단계 폼 (Multi-step Form)

```typescript
// src/features/profile/components/MultiStepForm.tsx
"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

// 단계별 스키마 정의
const step1Schema = z.object({
  firstName: z.string().min(1, "이름을 입력해주세요"),
  lastName: z.string().min(1, "성을 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
});

const step2Schema = z.object({
  company: z.string().min(1, "회사명을 입력해주세요"),
  position: z.string().min(1, "직책을 입력해주세요"),
  experience: z.enum(["junior", "mid", "senior"]),
});

const completeSchema = step1Schema.merge(step2Schema);
type CompleteFormData = z.infer<typeof completeSchema>;

const steps = [
  { schema: step1Schema, title: "기본 정보" },
  { schema: step2Schema, title: "경력 정보" },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [savedData, setSavedData] = useState<Partial<CompleteFormData>>({});

  const form = useForm<CompleteFormData>({
    resolver: zodResolver(steps[currentStep].schema),
    defaultValues: savedData,
    mode: "onChange",
  });

  // 단계별 유효성 검사 및 데이터 저장
  const handleNextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const currentData = form.getValues();
      setSavedData((prev) => ({ ...prev, ...currentData }));

      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // 최종 제출
  const handleFormSubmit = async (data: CompleteFormData) => {
    const completeData = { ...savedData, ...data };

    const validation = completeSchema.safeParse(completeData);
    if (!validation.success) {
      console.error("Validation failed:", validation.error);
      return;
    }

    const formData = new FormData();
    Object.entries(completeData).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    await submitProfileAction(formData);
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* 진행 표시기 */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex items-center ${
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex size-8 items-center justify-center rounded-full border-2 ${
                  index <= currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border"
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {currentStep === 0 && <Step1Form />}
          {currentStep === 1 && <Step2Form />}

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            >
              이전
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNextStep}>
                다음
              </Button>
            ) : (
              <Button type="submit">제출</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function Step1Form() {
  const { control } = useFormContext<CompleteFormData>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이름</FormLabel>
            <FormControl>
              <Input placeholder="이름을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>성</FormLabel>
            <FormControl>
              <Input placeholder="성을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>이메일</FormLabel>
            <FormControl>
              <Input type="email" placeholder="이메일을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Step2Form() {
  const { control } = useFormContext<CompleteFormData>();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>회사명</FormLabel>
            <FormControl>
              <Input placeholder="회사명을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>직책</FormLabel>
            <FormControl>
              <Input placeholder="직책을 입력하세요" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
```

### 실시간 자동저장 폼

```typescript
// src/features/draft/components/AutoSaveForm.tsx
"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/Form";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";

const draftSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type DraftFormData = z.infer<typeof draftSchema>;

type AutoSaveFormProps = {
  draftId: string;
};

export function AutoSaveForm({ draftId }: AutoSaveFormProps) {
  const form = useForm<DraftFormData>({
    resolver: zodResolver(draftSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const watchedValues = useWatch({
    control: form.control,
  });

  // 디바운스된 자동저장
  const debouncedSave = useDebouncedCallback(async (data: DraftFormData) => {
    try {
      await saveDraftAction(draftId, data);
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, 2000);

  // 값 변경 시 자동저장 트리거
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.title || values.content) {
        debouncedSave(values as DraftFormData);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedSave]);

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="글 제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="글 내용을 입력하세요"
                  className="min-h-72"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center text-sm text-muted-foreground">
          {watchedValues.title || watchedValues.content ? (
            <span>자동 저장됨</span>
          ) : (
            <span>저장할 내용이 없습니다</span>
          )}
        </div>
      </div>
    </Form>
  );
}
```

## 성능 최적화 패턴

```typescript
// src/shared/hooks/useOptimizedForm.ts
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

export function useOptimizedForm<T extends z.ZodSchema>(schema: T, defaultValues?: Partial<z.infer<T>>) {
	// 스키마 메모이제이션
	const memoizedResolver = useMemo(() => zodResolver(schema), [schema]);

	const form = useForm<z.infer<T>>({
		resolver: memoizedResolver,
		defaultValues,
		mode: "onBlur",
		shouldFocusError: true,
		shouldUseNativeValidation: false
	});

	return form;
}
```

## 보안 고려사항

### CSRF 보호

```typescript
// src/shared/lib/csrf.ts
import { headers } from "next/headers";

export async function validateCSRFToken(formData: FormData) {
	const token = formData.get("_token") as string;
	const headersList = await headers();
	const sessionToken = headersList.get("x-csrf-token");

	if (!token || !sessionToken || token !== sessionToken) {
		throw new Error("CSRF token validation failed");
	}
}
```

### Rate Limiting

```typescript
// src/shared/lib/rateLimit.ts
import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function checkRateLimit(identifier: string, limit = 5, window = 60000) {
	const now = Date.now();
	const record = rateLimitMap.get(identifier);

	if (!record || now - record.lastReset > window) {
		rateLimitMap.set(identifier, { count: 1, lastReset: now });
		return true;
	}

	if (record.count >= limit) {
		return false;
	}

	record.count++;
	return true;
}
```

## 안티패턴 및 금지사항

### 피해야 할 패턴

```typescript
// 금지: 불필요한 리렌더링 유발 (useState로 폼 관리)
function BadForm() {
  const [data, setData] = useState({});

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <input onChange={(e) => handleChange("name", e.target.value)} />
    </div>
  );
}

// 올바른 방법: React Hook Form 사용
function GoodForm() {
  const { register, handleSubmit } = useForm();

  const handleFormSubmit = (data: FormData) => {
    // ...
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <input {...register("name")} />
    </form>
  );
}

// 금지: 클라이언트에서만 검증
// 올바른 방법: 서버-클라이언트 이중 검증
```

## 체크리스트

### 폼 개발 완료 후 검증 체크리스트

필수 검증 항목:

- [ ] Zod 스키마 정의 및 TypeScript 타입 추론 확인
- [ ] 서버-클라이언트 이중 검증 구현
- [ ] Server Actions에서 스키마 검증 수행
- [ ] 에러 메시지 사용자 친화적으로 표시
- [ ] 로딩 상태 UI 구현
- [ ] 접근성 속성 (aria-label, aria-describedby) 적용

권장 검증 항목:

- [ ] 디바운스된 실시간 검증 구현
- [ ] 자동저장 기능 구현 (필요시)
- [ ] 에러 바운더리 구현
- [ ] 이벤트 핸들러는 named 화살표 함수로 추출
- [ ] Props는 `type`으로 정의 (`interface` 금지)

코드 품질 확인:

- [ ] `pnpm type:check` 통과
- [ ] `pnpm lint` 통과
- [ ] `pnpm format:check` 통과
- [ ] 불필요한 리렌더링 없음
- [ ] 메모리 누수 없음 (useEffect cleanup)
