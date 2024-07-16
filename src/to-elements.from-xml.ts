import { ValueElement, Xml } from "$src/values.js";

export function from_xml(values: Xml.Values): ValueElement[] {
	const elements: ValueElement[] = [];

	Object.values(values).forEach((value) => {
		if (!value) return;
		else if (Array.isArray(value)) {
			elements.push(...value.flat(2));
		} else {
			elements.push(value);
		}
	});

	return elements;
}
