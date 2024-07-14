import type { Prettify } from "$src/types/utility.js";

type ElementModel<Element extends string, Attribs extends Record<string, unknown>> = {
	element: Element;
	attributes: Attribs;
};

export type MetaElement<
	Type extends "name" | "property" = "name" | "property",
	Name extends string = string,
	Content extends string | number = string | number,
> = Prettify<
	ElementModel<
		"meta",
		Type extends "name" ? { name: Name; content: Content } : { property: Name; content: Content }
	>
>;

export type LinkElement<Rel extends string = string> = Prettify<
	ElementModel<"link", { rel: Rel; href: string; hreflang?: string }>
>;

export type ScriptElement<
	Type extends "application/ld+json" = "application/ld+json",
	Children extends object = object,
> = Prettify<
	ElementModel<"script", { type: Type }> & {
		children: Children;
	}
>;

export type MetadataElement = MetaElement | LinkElement | ScriptElement;
