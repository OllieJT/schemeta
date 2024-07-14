import type { Prettify } from "$lib/types/utility.js";

type ElementModel<Element extends string, Attribs extends Record<string, unknown>> = {
	element: Element;
	attributes: Attribs;
};

export type MetaElement<
	Type extends "name" | "property",
	Name extends string,
	Content extends string | number = string | number,
> = Prettify<
	ElementModel<
		"meta",
		Type extends "name" ? { name: Name; content: Content } : { property: Name; content: Content }
	>
>;

export type LinkElement<Rel extends string> = Prettify<
	ElementModel<"link", { rel: Rel; href: string; hreflang?: string }>
>;

export type ScriptElement<Children extends Record<string, unknown>> = Prettify<
	ElementModel<"script", { type: "application/ld+json" }> & {
		children: Children;
	}
>;

export type MetadataElement =
	| MetaElement<"name" | "property", string>
	| LinkElement<string>
	| ScriptElement<Record<string, unknown>>;
