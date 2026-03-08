import type { User } from "@/features/auth/types/user";

export const MOCK_USERS: User[] = [
	{
		id: "00000000-0000-0000-0000-000000000001",
		email: "admin@dayli.app",
		nickname: "Dayli 관리자",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=admin",
		role: "admin",
		is_active: true,
		created_at: "2026-01-01T00:00:00Z",
		updated_at: "2026-01-01T00:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000002",
		email: "kim.minho@gmail.com",
		nickname: "김민호",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=minho",
		role: "user",
		is_active: true,
		created_at: "2026-01-15T09:00:00Z",
		updated_at: "2026-02-01T00:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000003",
		email: "lee.jiyeon@gmail.com",
		nickname: "이지연",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=jiyeon",
		role: "user",
		is_active: true,
		created_at: "2026-01-20T10:30:00Z",
		updated_at: "2026-01-20T10:30:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000004",
		email: "park.junho@gmail.com",
		nickname: "박준호",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=junho",
		role: "user",
		is_active: true,
		created_at: "2026-02-01T08:00:00Z",
		updated_at: "2026-02-01T08:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000005",
		email: "choi.soyeon@gmail.com",
		nickname: "최소연",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=soyeon",
		role: "user",
		is_active: true,
		created_at: "2026-02-10T14:00:00Z",
		updated_at: "2026-02-10T14:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000006",
		email: "jung.hyunwoo@gmail.com",
		nickname: "정현우",
		avatar_url: null,
		role: "user",
		is_active: true,
		created_at: "2026-02-15T11:00:00Z",
		updated_at: "2026-02-15T11:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000007",
		email: "yoon.seojin@gmail.com",
		nickname: "윤서진",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=seojin",
		role: "user",
		is_active: false,
		created_at: "2026-02-20T16:00:00Z",
		updated_at: "2026-02-25T00:00:00Z"
	},
	{
		id: "00000000-0000-0000-0000-000000000008",
		email: "han.mirae@gmail.com",
		nickname: "한미래",
		avatar_url: "https://api.dicebear.com/9.x/notionists/svg?seed=mirae",
		role: "user",
		is_active: true,
		created_at: "2026-03-01T09:00:00Z",
		updated_at: "2026-03-01T09:00:00Z"
	}
];

export const MOCK_CURRENT_USER = MOCK_USERS[1];
