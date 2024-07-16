import { ElementConfig } from "$src/to-elements.types.js";
import type { XML } from "$src/types/values.js";

type XMLElement = ElementConfig<"script" | "title", XML.Properties, string>;

export function from_xml(values: XML.ValueMap): XMLElement[] {
	const elements: XMLElement[] = [];

	const keys = Object.keys(values) as (keyof XML.ValueMap)[];

	keys.forEach((key) => {
		if (key === "title") {
			const title = values[key];
			if (!title) return console.warn(`No value for ${key}`);

			elements.push({ element: "title", attributes: { type: null }, children: title });
		} else if (key === "schema") {
			const schema = values[key];
			if (!schema) return console.warn(`No value for ${key}`);

			schema.forEach((item) => {
				elements.push({
					element: "script",
					attributes: { type: `application/ld+json` },
					children: JSON.stringify(item),
				});
			});
		}
	});

	return elements;
}
