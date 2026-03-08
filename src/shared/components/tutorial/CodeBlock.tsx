"use client";

import { useState } from "react";

import { Button } from "@/shared/ui/Button";

type CodeBlockProps = {
	code: string;
};

function CopyIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
			<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
		</svg>
	);
}

function CheckIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

export function CodeBlock({ code }: CodeBlockProps) {
	const [icon, setIcon] = useState(CopyIcon);

	const handleCopy = async () => {
		await navigator?.clipboard?.writeText(code);
		setIcon(CheckIcon);
		setTimeout(() => setIcon(CopyIcon), 2000);
	};

	return (
		<pre className="bg-muted relative my-6 rounded-md p-6">
			<Button size="icon" onClick={handleCopy} variant="outline" className="absolute top-2 right-2">
				{icon}
			</Button>
			<code className="p-3 text-xs">{code}</code>
		</pre>
	);
}
