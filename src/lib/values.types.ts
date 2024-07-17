import { PickArrayLike } from "$src/lib/types.js";
import type { OptionOutput } from "./values.options.js";

export type ValueElement = {
	element: string;
	attributes: Record<string, string>;
	children?: string;
};

export type Values = PickArrayLike<
	OptionOutput,
	| "application/ld+json"
	| "msapplication-task"
	| "twitter:image"
	| "apple-touch-icon"
	| "og:image"
	| "og:locale:alternate"
	| "music:album"
	| "music:musician"
	| "music:song"
	| "video:actor"
	| "video:director"
	| "video:tag"
	| "video:writer"
	| "article:author"
	| "article:tag"
	| "book:author"
	| "book:tag"
>;
