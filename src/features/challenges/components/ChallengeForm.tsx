"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Challenge } from "@/features/challenges/types/challenge";
import { CATEGORY_OPTIONS, DURATION_OPTIONS } from "@/features/challenges/types/constants";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { RadioGroup } from "@/shared/ui/RadioGroup";
import { Select } from "@/shared/ui/Select";
import { Separator } from "@/shared/ui/Separator";
import { Textarea } from "@/shared/ui/Textarea";
import { cn } from "@/shared/utils/cn";

const challengeFormSchema = z.object({
	title: z.string().min(2, "제목은 최소 2자 이상이어야 합니다").max(50, "제목은 최대 50자까지 입력 가능합니다"),
	description: z
		.string()
		.min(10, "설명은 최소 10자 이상이어야 합니다")
		.max(500, "설명은 최대 500자까지 입력 가능합니다"),
	duration_days: z.enum(["7", "14", "21", "30"]),
	category: z.enum(["health", "study", "lifestyle", "other"]),
	check_in_description: z
		.string()
		.min(10, "인증 방법 설명은 최소 10자 이상이어야 합니다")
		.max(200, "인증 방법 설명은 최대 200자까지 입력 가능합니다"),
	max_participants: z
		.number()
		.min(1, "최대 참여자 수는 최소 1명이어야 합니다")
		.max(100, "최대 참여자 수는 최대 100명까지 설정 가능합니다")
});

type ChallengeFormData = z.infer<typeof challengeFormSchema>;

type ChallengeFormProps = {
	mode?: "create" | "edit";
	defaultValues?: Partial<Challenge>;
};

export function ChallengeForm({ mode = "create", defaultValues }: ChallengeFormProps) {
	const router = useRouter();
	const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(defaultValues?.thumbnail_url ?? null);
	const isEditMode = mode === "edit";
	const objectUrlRef = useRef<string | null>(null);

	useEffect(() => {
		return () => {
			if (objectUrlRef.current) {
				URL.revokeObjectURL(objectUrlRef.current);
			}
		};
	}, []);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm<ChallengeFormData>({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		resolver: zodResolver(challengeFormSchema as any),
		defaultValues: {
			title: defaultValues?.title ?? "",
			description: defaultValues?.description ?? "",
			duration_days: String(defaultValues?.duration_days ?? "30") as "7" | "14" | "21" | "30",
			category: defaultValues?.category ?? "health",
			check_in_description: defaultValues?.check_in_description ?? "",
			max_participants: defaultValues?.max_participants ?? 30
		}
	});

	const titleValue = watch("title");
	const descriptionValue = watch("description");
	const checkInDescriptionValue = watch("check_in_description");

	const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
		}

		const url = URL.createObjectURL(file);
		objectUrlRef.current = url;
		setThumbnailPreview(url);
	};

	const handleThumbnailRemove = () => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = null;
		}
		setThumbnailPreview(null);
	};

	const handleFormSubmit = (data: ChallengeFormData) => {
		// TODO: Phase 3에서 챌린지 생성/수정 API 연결
		console.log("폼 데이터:", data);
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<div className="px-5 pt-6 pb-24">
			<div className="mb-6">
				<h1 className="text-foreground text-2xl font-bold">{isEditMode ? "챌린지 수정" : "새 챌린지 만들기"}</h1>
				<p className="text-muted-foreground mt-1 text-sm">
					{isEditMode ? "챌린지 제목과 설명만 수정 가능합니다." : "새로운 챌린지를 만들고 참여자를 모집해보세요."}
				</p>
			</div>

			<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6" noValidate>
				{/* 썸네일 업로드 */}
				<div>
					<Label className="mb-2 block">썸네일 이미지 (선택)</Label>
					<div className="relative">
						{thumbnailPreview ? (
							<div className="relative aspect-video overflow-hidden rounded-2xl">
								<img src={thumbnailPreview} alt="썸네일 미리보기" className="size-full object-cover" />
								<Button
									type="button"
									variant="destructive"
									size="icon"
									className="absolute top-2 right-2 size-7 rounded-xl"
									onClick={handleThumbnailRemove}
									aria-label="썸네일 제거"
								>
									<X className="size-4" aria-hidden="true" />
								</Button>
							</div>
						) : (
							<label
								htmlFor="thumbnail-upload"
								className="border-border hover:border-primary/50 flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed transition-colors"
							>
								<ImagePlus className="text-muted-foreground size-10" aria-hidden="true" />
								<span className="text-muted-foreground text-sm">클릭하여 이미지 업로드</span>
								<span className="text-muted-foreground text-xs">JPG, PNG, WebP • 최대 5MB</span>
								<input
									id="thumbnail-upload"
									type="file"
									accept="image/jpeg,image/png,image/webp"
									className="sr-only"
									onChange={handleThumbnailChange}
								/>
							</label>
						)}
					</div>
				</div>

				<Separator />

				{/* 챌린지 제목 */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="title">
							챌린지 제목 <span className="text-destructive">*</span>
						</Label>
						<span className={cn("text-xs", titleValue?.length > 45 ? "text-destructive" : "text-muted-foreground")}>
							{titleValue?.length ?? 0} / 50
						</span>
					</div>
					<Input
						id="title"
						placeholder="예: 매일 아침 30분 러닝"
						className="h-11 rounded-xl"
						aria-required="true"
						aria-invalid={!!errors.title}
						aria-describedby={errors.title ? "title-error" : undefined}
						{...register("title")}
					/>
					{errors.title && (
						<p id="title-error" className="text-destructive text-xs" role="alert">
							{errors.title.message}
						</p>
					)}
				</div>

				{/* 챌린지 설명 */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="description">
							챌린지 설명 <span className="text-destructive">*</span>
						</Label>
						<span
							className={cn("text-xs", descriptionValue?.length > 480 ? "text-destructive" : "text-muted-foreground")}
						>
							{descriptionValue?.length ?? 0} / 500
						</span>
					</div>
					<Textarea
						id="description"
						placeholder="챌린지에 대한 상세 설명을 입력해주세요"
						rows={4}
						className="rounded-xl"
						aria-required="true"
						aria-invalid={!!errors.description}
						aria-describedby={errors.description ? "description-error" : undefined}
						{...register("description")}
					/>
					{errors.description && (
						<p id="description-error" className="text-destructive text-xs" role="alert">
							{errors.description.message}
						</p>
					)}
				</div>

				{/* 기간 선택 */}
				<div className="space-y-3">
					<Label>
						챌린지 기간 <span className="text-destructive">*</span>
					</Label>
					{isEditMode && (
						<Card className="border-warning/30 bg-warning/10">
							<Card.Content className="py-3">
								<p className="text-warning text-xs">진행 중인 챌린지는 기간을 변경할 수 없습니다.</p>
							</Card.Content>
						</Card>
					)}
					<RadioGroup
						defaultValue={String(defaultValues?.duration_days ?? "30")}
						onValueChange={(value) => setValue("duration_days", value as "7" | "14" | "21" | "30")}
						className="grid grid-cols-4 gap-2"
						disabled={isEditMode}
						aria-label="챌린지 기간 선택"
					>
						{DURATION_OPTIONS.map((option) => (
							<div key={option.value}>
								<RadioGroup.Item value={option.value} id={`duration-${option.value}`} className="sr-only" />
								<Label
									htmlFor={`duration-${option.value}`}
									className={cn(
										"border-border flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 p-2.5 transition-colors",
										isEditMode && "cursor-not-allowed opacity-50"
									)}
								>
									<span className="text-foreground font-semibold">{option.label}</span>
								</Label>
							</div>
						))}
					</RadioGroup>
				</div>

				{/* 카테고리 선택 */}
				<div className="space-y-2">
					<Label htmlFor="category">
						카테고리 <span className="text-destructive">*</span>
					</Label>
					<Select
						defaultValue={defaultValues?.category ?? "health"}
						onValueChange={(value) => setValue("category", value as "health" | "study" | "lifestyle" | "other")}
					>
						<Select.Trigger
							className="h-11 w-full rounded-xl"
							id="category"
							aria-invalid={!!errors.category}
							aria-describedby={errors.category ? "category-error" : undefined}
						>
							<Select.Value placeholder="카테고리를 선택해주세요" />
						</Select.Trigger>
						<Select.Content>
							{CATEGORY_OPTIONS.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
					{errors.category && (
						<p id="category-error" className="text-destructive text-xs" role="alert">
							{errors.category.message}
						</p>
					)}
				</div>

				{/* 인증 방법 설명 */}
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="check_in_description">
							인증 방법 <span className="text-destructive">*</span>
						</Label>
						<span
							className={cn(
								"text-xs",
								checkInDescriptionValue?.length > 185 ? "text-destructive" : "text-muted-foreground"
							)}
						>
							{checkInDescriptionValue?.length ?? 0} / 200
						</span>
					</div>
					<Textarea
						id="check_in_description"
						placeholder="참여자들이 어떻게 인증해야 하는지 설명해주세요"
						rows={3}
						className="rounded-xl"
						aria-required="true"
						aria-invalid={!!errors.check_in_description}
						aria-describedby={errors.check_in_description ? "checkin-desc-error" : undefined}
						{...register("check_in_description")}
					/>
					{errors.check_in_description && (
						<p id="checkin-desc-error" className="text-destructive text-xs" role="alert">
							{errors.check_in_description.message}
						</p>
					)}
				</div>

				{/* 최대 참여자 수 */}
				<div className="space-y-2">
					<Label htmlFor="max_participants">
						최대 참여자 수 <span className="text-destructive">*</span>
					</Label>
					{isEditMode && (
						<p className="text-muted-foreground text-xs">진행 중인 챌린지는 최대 참여자 수를 변경할 수 없습니다.</p>
					)}
					<Input
						id="max_participants"
						type="number"
						min={1}
						max={100}
						disabled={isEditMode}
						className="h-11 rounded-xl"
						aria-required="true"
						aria-invalid={!!errors.max_participants}
						aria-describedby={errors.max_participants ? "max-participants-error" : undefined}
						{...register("max_participants", { valueAsNumber: true })}
					/>
					{errors.max_participants && (
						<p id="max-participants-error" className="text-destructive text-xs" role="alert">
							{errors.max_participants.message}
						</p>
					)}
				</div>

				<Separator />

				{/* 제출 버튼 */}
				<div className="flex gap-3">
					<Button type="button" variant="secondary" className="h-12 flex-1 rounded-xl" onClick={handleCancel}>
						취소
					</Button>
					<Button type="submit" className="h-12 flex-1 rounded-xl" disabled={isSubmitting} aria-busy={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
								{isEditMode ? "수정 중..." : "생성 중..."}
							</>
						) : isEditMode ? (
							"챌린지 수정"
						) : (
							"챌린지 생성"
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}
