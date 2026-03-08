import { Separator } from "@/shared/ui/Separator";

export function Footer() {
	return (
		<footer className="bg-background mt-auto">
			<Separator />
			<div className="px-5 py-4 text-center">
				<p className="text-muted-foreground text-[10px]">Made with ♥ for daily challengers</p>
			</div>
		</footer>
	);
}
