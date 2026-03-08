import type { Provider } from "@supabase/supabase-js";
import type { ComponentType, SVGProps } from "react";

export type OAuthProvider = {
	id: Provider;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
};
