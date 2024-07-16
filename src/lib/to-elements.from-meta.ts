import { Meta, ValueElement } from "$src/lib/values.js";

export function from_meta(values: Meta.Values): ValueElement[] {
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
