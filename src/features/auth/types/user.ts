export type User = {
	id: string;
	email: string;
	nickname: string;
	avatar_url: string | null;
	role: "user" | "admin";
	is_active: boolean;
	created_at: string;
	updated_at: string;
};
