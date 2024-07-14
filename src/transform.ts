import type {
	LinkElement,
	MetadataElement,
	MetaElement,
	ScriptElement,
} from "$src/types/entity.js";
import { Json } from "$src/types/tags.js";
import { Graph } from "schema-dts";

export function meta_to_html<T extends MetaElement>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	return `<${element.element} ${attributes} />`;
}

export function link_to_html<T extends LinkElement>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	return `<${element.element} ${attributes} />`;
}

export function script_to_html<T extends ScriptElement>(element: T) {
	// attributes to string
	const attributes = Object.entries(element.attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(" ");

	// children to JSON
	const children = JSON.stringify(element.children);

	return `<${element.element} ${attributes}>${children}</${element.element}>`;
}

export function script_to_graph<T extends Json.LD>(elements: T[]) {
	const things = elements.map((el) => el.children);

	const graph = JSON.stringify({
		"@context": "https://schema.org",
		"@graph": things,
	} satisfies Graph);

	return `<script type="application/ld+json">${graph}</script>`;
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
