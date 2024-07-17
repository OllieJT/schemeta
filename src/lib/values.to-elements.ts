import { ValueElement, Values } from "$src/lib/values.types.js";

export function values_to_elements(values: Values): ValueElement[] {
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
