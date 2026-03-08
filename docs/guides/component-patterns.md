# 컴포넌트 패턴 가이드

이 문서는 Next.js 16.x + React 19 환경에서 효율적이고 재사용 가능한 컴포넌트 작성 패턴을 제공합니다.

## 기본 설계 원칙

### 1. 단일 책임 원칙 (Single Responsibility)

```tsx
// 각 컴포넌트가 하나의 명확한 책임
export function UserAvatar({ user, size = "md" }: UserAvatarProps) {
	return (
		<Avatar className={avatarSizes[size]}>
			<AvatarImage src={user.avatar} alt={user.name} />
			<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
		</Avatar>
	);
}

export function UserStatus({ isOnline }: UserStatusProps) {
	return <div className={cn("size-3 rounded-full", isOnline ? "bg-green-500" : "bg-gray-400")} />;
}
```

### 2. 컴포지션 우선 (Composition over Inheritance)

```tsx
// Object.assign 패턴으로 Compound Component 구성
import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";

type CardRootProps = ComponentProps<"div">;

function CardRoot({ className, ...props }: CardRootProps) {
	return <div className={cn("bg-card text-card-foreground rounded-xl border shadow", className)} {...props} />;
}

type CardHeaderProps = ComponentProps<"div">;

function CardHeader({ className, ...props }: CardHeaderProps) {
	return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

type CardTitleProps = ComponentProps<"div">;

function CardTitle({ className, ...props }: CardTitleProps) {
	return <div className={cn("leading-none font-semibold tracking-tight", className)} {...props} />;
}

export const Card = Object.assign(CardRoot, {
	Header: CardHeader,
	Title: CardTitle
});

// 사용법
<Card>
	<Card.Header>
		<Card.Title>제목</Card.Title>
	</Card.Header>
	<Card.Content>내용</Card.Content>
</Card>;
```

## Server vs Client Components

### Server Components (기본값)

```tsx
import { Suspense } from "react";

export default async function UserListPage() {
	const users = await getUsers();

	return (
		<div>
			<h1>사용자 목록</h1>
			<Suspense fallback={<UserListSkeleton />}>
				<UserList users={users} />
			</Suspense>
		</div>
	);
}

async function UserList({ users }: UserListProps) {
	return (
		<div className="grid gap-4">
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
}
```

### Client Components ('use client' 필요)

```tsx
"use client";

import { useState, useActionState } from "react";

// Client Component (상호작용, 상태 관리)
export function UserSearchForm() {
	const [query, setQuery] = useState("");

	const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	return (
		<div>
			<input value={query} onChange={handleQueryChange} placeholder="사용자 검색..." />
			<SearchResults query={query} />
		</div>
	);
}

// React 19 useActionState 활용
export function UserForm() {
	const [state, formAction, isPending] = useActionState(updateUserAction, {
		success: false,
		message: ""
	});

	return (
		<form action={formAction}>
			<input name="name" required />
			<button type="submit" disabled={isPending}>
				{isPending ? "저장 중..." : "저장"}
			</button>
			{state.message && <p>{state.message}</p>}
		</form>
	);
}
```

### Server-Client 경계 설정

```tsx
// 서버 컴포넌트에서 데이터 패칭 후 클라이언트 컴포넌트에 전달
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const product = await getProduct(id);

	return (
		<div>
			<ProductInfo product={product} />
			<ProductImages images={product.images} />
			<ProductInteractions productId={product.id} />
		</div>
	);
}
```

## Props 설계 패턴

### 1. Props type 정의

```tsx
import type { ComponentProps } from "react";

// ComponentProps 활용 (HTML 요소 확장)
type ButtonProps = ComponentProps<"button"> & {
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "sm" | "lg" | "icon";
	loading?: boolean;
};

export function Button({
	children,
	variant = "default",
	size = "default",
	loading = false,
	disabled,
	className,
	...props
}: ButtonProps) {
	return (
		<button className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || loading} {...props}>
			{loading ? <Spinner className="mr-2" /> : null}
			{children}
		</button>
	);
}

// 외부에서 Props 접근 시
type MyButtonProps = ComponentProps<typeof Button>;
```

### 2. ref as prop (React 19)

```tsx
// React 19: forwardRef 없이 ref를 일반 prop으로 전달
import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export function Input({ className, ref, ...props }: InputProps) {
	return (
		<input
			ref={ref}
			className={cn("flex h-9 w-full rounded-md border bg-transparent px-3 py-1", className)}
			{...props}
		/>
	);
}
```

### 3. Polymorphic Components

```tsx
type TextProps<T extends React.ElementType = "p"> = {
	as?: T;
	children: React.ReactNode;
	variant?: "body" | "caption" | "subtitle";
	className?: string;
};

export function Text<T extends React.ElementType = "p">({
	as,
	children,
	variant = "body",
	className,
	...props
}: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps>) {
	const Component = as || "p";

	return (
		<Component className={cn(textVariants[variant], className)} {...props}>
			{children}
		</Component>
	);
}
```

## 재사용성 패턴

### 1. 컴포넌트 변형 (CVA)

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm", {
	variants: {
		variant: {
			default: "border-border",
			outline: "border-2",
			ghost: "border-transparent shadow-none"
		},
		size: {
			sm: "p-4",
			md: "p-6",
			lg: "p-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "md"
	}
});

type StyledCardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export function StyledCard({ variant, size, className, children, ...props }: StyledCardProps) {
	return (
		<div className={cn(cardVariants({ variant, size }), className)} {...props}>
			{children}
		</div>
	);
}
```

### 2. Compound Component 패턴 (Object.assign)

```tsx
// Object.assign 패턴 사용 (Context 기반 대신)
function AccordionRoot({ children, className }: AccordionRootProps) {
	return <div className={cn("space-y-2", className)}>{children}</div>;
}

function AccordionItem({ children, className }: AccordionItemProps) {
	return <div className={cn("rounded-lg border", className)}>{children}</div>;
}

function AccordionTrigger({ children, onClick, className }: AccordionTriggerProps) {
	return (
		<button onClick={onClick} className={cn("w-full p-4 text-left", className)}>
			{children}
		</button>
	);
}

function AccordionContent({ children, isOpen, className }: AccordionContentProps) {
	if (!isOpen) return null;
	return <div className={cn("p-4 pt-0", className)}>{children}</div>;
}

export const Accordion = Object.assign(AccordionRoot, {
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent
});
```

## React 19 패턴

### Context 사용 (use)

```tsx
"use client";

import { createContext, use } from "react";

const CartContext = createContext<CartContextType | null>(null);

// use(Context) 사용 (useContext 대신)
export function useCart() {
	const context = use(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
}

// <Context value={...}> 사용 (.Provider 대신)
export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

	return <CartContext value={{ state, dispatch }}>{children}</CartContext>;
}
```

### React Compiler와 성능

React Compiler가 활성화된 프로젝트에서는 수동 메모이제이션이 대부분 불필요:

```tsx
// React Compiler가 자동 처리하므로 불필요
// const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
// const memoizedCallback = useCallback(() => handleUpdate(id), [id]);

// 예외: Context Provider value 안정성이 필요한 경우에만 사용
export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	// Context value의 안정적인 참조를 위해 useMemo 사용
	const value = useMemo(() => ({ state, dispatch }), [state]);

	return <CartContext value={value}>{children}</CartContext>;
}
```

### 이벤트 핸들러 추출

```tsx
"use client";

// JSX 인라인 함수 지양, named 함수로 추출
export function Counter() {
	const [count, setCount] = useState(0);

	// 화살표 함수 스타일
	const handleIncrement = () => {
		setCount((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setCount((prev) => prev - 1);
	};

	return (
		<div>
			<button onClick={handleDecrement}>-</button>
			<span>{count}</span>
			<button onClick={handleIncrement}>+</button>
		</div>
	);
}
```

## 지연 로딩

```tsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

export function Dashboard() {
	return (
		<div>
			<h1>대시보드</h1>
			<Suspense fallback={<div>로딩 중...</div>}>
				<HeavyComponent />
			</Suspense>
		</div>
	);
}
```

## 타입 안전성 패턴

### 제네릭 컴포넌트

```tsx
type SelectProps<T> = {
	options: T[];
	value?: T;
	onChange: (value: T) => void;
	getLabel: (option: T) => string;
	getValue: (option: T) => string;
	className?: string;
};

export function Select<T>({ options, value, onChange, getLabel, getValue, className }: SelectProps<T>) {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = options.find((option) => getValue(option) === e.target.value);
		if (selectedValue) onChange(selectedValue);
	};

	return (
		<select value={value ? getValue(value) : ""} onChange={handleChange} className={className}>
			{options.map((option) => (
				<option key={getValue(option)} value={getValue(option)}>
					{getLabel(option)}
				</option>
			))}
		</select>
	);
}

// 사용법 (완전한 타입 추론)
<Select<User>
	options={users}
	value={selectedUser}
	onChange={setSelectedUser}
	getLabel={(user) => user.name}
	getValue={(user) => user.id}
/>;
```

## 안티패턴 및 금지사항

### 피해야 할 패턴

```tsx
// 금지: interface 사용 (type 사용)
interface ButtonProps { ... }
// -> type ButtonProps = { ... }

// 금지: forwardRef 사용
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => { ... });
// -> ref를 일반 prop으로 전달

// 금지: useContext 직접 사용
const value = useContext(MyContext);
// -> const value = use(MyContext);

// 금지: Context.Provider 사용
<MyContext.Provider value={...}>
// -> <MyContext value={...}>

// 금지: JSX 인라인 함수
<button onClick={() => setCount(count + 1)}>
// -> named 함수로 추출

// 금지: function 키워드로 이벤트 핸들러 선언
function handleClick() { ... }
// -> const handleClick = () => { ... }

// 금지: 불필요한 memo/useMemo/useCallback (React Compiler 사용 시)
const MemoizedComponent = memo(SimpleComponent);
// -> React Compiler가 자동 처리
```

## 컴포넌트 작성 체크리스트

### 설계

- [ ] 단일 책임 원칙 준수
- [ ] 적절한 컴포지션 활용
- [ ] Compound Component는 Object.assign 패턴 사용

### 타입 안전성

- [ ] Props는 `type`으로 정의 (`interface` 금지)
- [ ] `ComponentProps<>` 활용 (HTML 요소 확장 시)
- [ ] ref는 일반 prop으로 전달 (`forwardRef` 금지)

### React 19

- [ ] `use(Context)` 사용 (`useContext` 대신)
- [ ] `<Context value={...}>` 사용 (`.Provider` 대신)
- [ ] 수동 메모이제이션 최소화 (React Compiler 활용)

### Server/Client 분리

- [ ] Server Component 우선 고려
- [ ] `"use client"` 최소화
- [ ] 이벤트 핸들러는 named 화살표 함수로 추출

### 코드 품질

- [ ] PascalCase 파일명
- [ ] Named export 사용
- [ ] 300줄 이하 유지
