"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from "recharts";

import type {
	CategoryDistribution,
	DailyChallengeData,
	DailyCheckinData,
	DailySignupData
} from "@/features/admin/types/admin";
import { CATEGORY_LABELS } from "@/features/challenges/types/constants";

const TOOLTIP_STYLE = {
	backgroundColor: "var(--popover)",
	border: "1px solid var(--border)",
	borderRadius: "8px",
	color: "var(--popover-foreground)"
};

const CATEGORY_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#f43f5e"];

type CheckinBarChartProps = {
	data: DailyCheckinData[];
	height?: number;
};

export function CheckinBarChart({ data, height = 240 }: CheckinBarChartProps) {
	const summary = data.map((d) => `${d.date}: ${d.count}건`).join(", ");

	return (
		<div role="img" aria-label={`일별 인증 수 차트. ${summary}`}>
			<ResponsiveContainer width="100%" height={height}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Bar dataKey="count" fill="var(--primary)" name="인증 수" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

type CategoryPieChartProps = {
	data: CategoryDistribution[];
	height?: number;
};

export function CategoryPieChart({ data, height = 240 }: CategoryPieChartProps) {
	const chartData = data.map((d) => ({
		...d,
		name: CATEGORY_LABELS[d.category] ?? d.category
	}));

	const total = chartData.reduce((sum, d) => sum + d.count, 0);
	const summary = chartData.map((d) => `${d.name} ${total > 0 ? ((d.count / total) * 100).toFixed(0) : 0}%`).join(", ");

	return (
		<div role="img" aria-label={`카테고리별 챌린지 분포 차트. ${summary}`}>
			<ResponsiveContainer width="100%" height={height}>
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						outerRadius={70}
						dataKey="count"
						nameKey="name"
						label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
						labelLine={false}
					>
						{chartData.map((_, index) => (
							<Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
						))}
					</Pie>
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}

type SignupLineChartProps = {
	data: DailySignupData[];
	height?: number;
};

export function SignupLineChart({ data, height = 240 }: SignupLineChartProps) {
	const summary = data.map((d) => `${d.date}: ${d.count}명`).join(", ");

	return (
		<div role="img" aria-label={`일별 신규 가입자 추이 차트. ${summary}`}>
			<ResponsiveContainer width="100%" height={height}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Line
						type="monotone"
						dataKey="count"
						stroke="var(--primary)"
						strokeWidth={2}
						dot={{ r: 3 }}
						name="신규 가입자"
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

type ChallengeBarChartProps = {
	data: DailyChallengeData[];
	height?: number;
};

export function ChallengeBarChart({ data, height = 240 }: ChallengeBarChartProps) {
	const summary = data.map((d) => `${d.date}: ${d.count}개`).join(", ");

	return (
		<div role="img" aria-label={`일별 챌린지 생성 수 차트. ${summary}`}>
			<ResponsiveContainer width="100%" height={height}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
					<XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<YAxis tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
					<Tooltip contentStyle={TOOLTIP_STYLE} />
					<Bar dataKey="count" fill="#f59e0b" name="챌린지 생성 수" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
