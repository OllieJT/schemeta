import { ValueElement, Values } from "$src/lib/values.types.js";

export function values_to_elements(values: Values): ValueElement[] {
	const elements: ValueElement[] = [];

	Object.values(values).forEach((value) => {
		if (!value) return;
		else if (Array.isArray(value)) {
			value.forEach((v_a) => {
				if (Array.isArray(v_a)) {
					v_a.forEach((v_b) => elements.push(v_b));
				} else {
					elements.push(v_a);
				}
			});
		} else {
			elements.push(value);
		}
	});

	return elements;
}
