import type { Json } from "$src/types/tags.js";

export function use_json_ld(data: Json.LinkedDataValue[]): Json.LD[] {
	const elements: Json.LD[] = [];

	data.forEach((children) => {
		elements.push({
			element: "script",
			attributes: { type: "application/ld+json" },
			children,
		} satisfies Json.LD);
	});

	return elements;
}
