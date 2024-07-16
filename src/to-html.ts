import { ValueElement } from "$src/values.js";

function attributes_to_string(attributes: Record<string, unknown>) {
	return Object.entries(attributes)
		.map(([key, value]) => {
			if (value instanceof URL) return `${key}="${value.href}"`;
			if (value instanceof Date) return `${key}="${value.toISOString()}"`;
			else return `${key}="${value}"`;
		})
		.join(" ");
}

function element_to_html(data: ValueElement) {
	const attribs = attributes_to_string(data.attributes || {});

	if (data.children) {
		return `<${data.element} ${attribs}>${JSON.stringify(data.children)}</${data.element}>`;
	} else {
		return `<${data.element} ${attribs} />`;
	}
}

export function to_html(elements: ValueElement[]) {
	return elements.map(element_to_html);
}
