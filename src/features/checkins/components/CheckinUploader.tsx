"use client";

import { Camera, CheckCircle, ImagePlus, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { Challenge } from "@/features/challenges/types/challenge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Label } from "@/shared/ui/Label";
import { Progress } from "@/shared/ui/Progress";
import { Separator } from "@/shared/ui/Separator";
import { Textarea } from "@/shared/ui/Textarea";
import { cn } from "@/shared/utils/cn";

type CheckinUploaderProps = {
	challenge: Challenge;
	isAlreadyCompleted?: boolean;
};

export function CheckinUploader({ challenge, isAlreadyCompleted = false }: CheckinUploaderProps) {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [memo, setMemo] = useState("");
	const [uploadProgress, setUploadProgress] = useState(0);
	const [isUploading, setIsUploading] = useState(false);
	const objectUrlRef = useRef<string | null>(null);

	useEffect(() => {
		return () => {
			if (objectUrlRef.current) {
				URL.revokeObjectURL(objectUrlRef.current);
			}
		};
	}, []);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 10 * 1024 * 1024) {
			toast.error("10MB 이하의 이미지만 업로드 가능합니다");
			return;
		}

		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
		}

		const url = URL.createObjectURL(file);
		objectUrlRef.current = url;
		setImagePreview(url);
	};

	const handleImageRemove = () => {
		if (objectUrlRef.current) {
			URL.revokeObjectURL(objectUrlRef.current);
			objectUrlRef.current = null;
		}
		setImagePreview(null);
	};

	const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMemo(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!imagePreview) return;

		setIsUploading(true);
		setUploadProgress(50);
		try {
			// TODO: Phase 5에서 인증 업로드 API 연결
		} finally {
			setIsUploading(false);
			setUploadProgress(0);
		}
	};

	if (isAlreadyCompleted) {
		return (
			<div className="flex flex-col items-center py-16 text-center">
				<div className="bg-success/10 mb-4 flex size-20 items-center justify-center rounded-full">
					<CheckCircle className="text-success size-10" aria-hidden="true" />
				</div>
				<h2 className="text-foreground mb-2 text-xl font-bold">오늘 인증 완료!</h2>
				<p className="text-muted-foreground mb-6 text-sm">
					오늘의 인증을 이미 완료했습니다.
					<br />
					내일 다시 도전해보세요!
				</p>
				<p className="text-muted-foreground text-xs">재업로드는 불가합니다.</p>
			</div>
		);
	}

	return (
		<div className="px-5 pt-6 pb-24">
			<div className="mb-6">
				<h1 className="text-foreground text-2xl font-bold">오늘의 인증</h1>
				<p className="text-muted-foreground mt-1 text-sm">{challenge.title}</p>
			</div>

			<Card className="border-primary/20 bg-primary/5 mb-6">
				<Card.Content className="pt-4">
					<h2 className="text-foreground mb-1 flex items-center gap-2 text-sm font-semibold">
						<Camera className="text-primary size-4" aria-hidden="true" />
						인증 방법
					</h2>
					<p className="text-muted-foreground text-sm">{challenge.check_in_description}</p>
				</Card.Content>
			</Card>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="space-y-2">
					<Label>
						인증 사진 <span className="text-destructive">*</span>
					</Label>

					{imagePreview ? (
						<div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
							<img src={imagePreview} alt="인증 사진 미리보기" className="size-full object-cover" />
							<Button
								type="button"
								variant="destructive"
								size="icon"
								className="absolute top-2 right-2 size-8"
								onClick={handleImageRemove}
								aria-label="사진 제거"
							>
								<X className="size-4" aria-hidden="true" />
							</Button>
						</div>
					) : (
						<label
							htmlFor="checkin-image-upload"
							className={cn(
								"border-border hover:border-primary/50 flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition-colors",
								isUploading && "pointer-events-none opacity-50"
							)}
						>
							<div className="bg-primary/10 flex size-14 items-center justify-center rounded-full">
								<ImagePlus className="text-primary size-7" aria-hidden="true" />
							</div>
							<div className="text-center">
								<p className="text-foreground text-sm font-medium">사진을 선택해주세요</p>
								<p className="text-muted-foreground mt-1 text-xs">카메라 촬영 또는 갤러리에서 선택</p>
								<p className="text-muted-foreground text-xs">JPG, PNG, WebP • 최대 10MB</p>
							</div>
							<input
								id="checkin-image-upload"
								type="file"
								accept="image/jpeg,image/png,image/webp"
								capture="environment"
								className="sr-only"
								onChange={handleImageChange}
							/>
						</label>
					)}
				</div>

				{isUploading && (
					<div className="space-y-2" aria-live="polite">
						<div className="flex items-center justify-between text-xs">
							<span className="text-muted-foreground">업로드 중...</span>
							<span className="text-muted-foreground">{uploadProgress}%</span>
						</div>
						<Progress value={uploadProgress} className="h-2" aria-label="업로드 진행률" />
					</div>
				)}

				<Separator />

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="memo">인증 메모 (선택)</Label>
						<span className={cn("text-xs", memo.length > 185 ? "text-destructive" : "text-muted-foreground")}>
							{memo.length} / 200
						</span>
					</div>
					<Textarea
						id="memo"
						placeholder="오늘의 소감이나 특별한 점을 적어보세요"
						rows={4}
						value={memo}
						onChange={handleMemoChange}
						maxLength={200}
					/>
				</div>

				<Button
					type="submit"
					className="h-12 w-full rounded-xl"
					disabled={!imagePreview || isUploading}
					aria-busy={isUploading}
				>
					{isUploading ? (
						<>
							<Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
							업로드 중...
						</>
					) : (
						<>
							<CheckCircle className="mr-2 size-4" aria-hidden="true" />
							인증 완료하기
						</>
					)}
				</Button>
			</form>
		</div>
	);
}
