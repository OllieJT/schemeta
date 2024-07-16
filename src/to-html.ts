import { AnyElementConfig } from "$src/to-elements.types.js";

function to_attributes(attributes: Record<string, unknown>) {
	return Object.entries(attributes)
		.map(([key, value]) => {
			if (value instanceof URL) return `${key}="${value.href}"`;
			if (value instanceof Date) return `${key}="${value.toISOString()}"`;
			else return `${key}="${value}"`;
		})
		.join(" ");
}

function element_to_html(data: AnyElementConfig) {
	const attribs = to_attributes(data.attributes || {});

	if (data.children) {
		return `<${data.element} ${attribs}>${JSON.stringify(data.children)}</${data.element}>`;
	} else {
		return `<${data.element} ${attribs} />`;
	}
}

export function to_html(elements: AnyElementConfig[]) {
	return elements.map(element_to_html);
}
