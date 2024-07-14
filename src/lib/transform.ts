import type {
	LinkElement,
	MetadataElement,
	MetaElement,
	ScriptElement,
} from "$lib/types/entity.js";

export function meta_to_html<T extends MetaElement<"name" | "property", string>>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	return `<${element.element} ${attributes} />`;
}

export function link_to_html<T extends LinkElement<string>>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	return `<${element.element} ${attributes} />`;
}

export function script_to_html<T extends ScriptElement<Record<string, unknown>>>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	// children to JSON
	const children = JSON.stringify(element.children);

	return `<${element.element} ${attributes}>${children}</${element.element}>`;
}

export function element_to_html(element: MetadataElement) {
	switch (element.element) {
		case "meta":
			return meta_to_html(element);
		case "link":
			return link_to_html(element);
		case "script":
			return script_to_html(element);
	}
}
