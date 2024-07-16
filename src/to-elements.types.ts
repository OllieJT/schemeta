export type ElementConfig<
	Element extends string,
	Attributes extends Record<string, unknown> | null,
	Children extends string | null,
> = Children extends string
	? {
			element: Element;
			attributes: Attributes;
			children: string;
		}
	: {
			element: Element;
			attributes: Attributes;
			children?: null;
		};

export type AnyElementConfig = ElementConfig<string, Record<string, unknown> | null, string | null>;
