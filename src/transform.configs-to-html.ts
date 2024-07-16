import { ConfigMap } from "$src/transform.values-to-configs.js";
import { ValueMap } from "$src/types/value-map.js";
import { create_tag } from "$src/utility.js";

export function configs_to_html<C extends Partial<ConfigMap>>(configs: C) {
	const output = new Set<string>();
	const keys = Object.keys(configs) as (keyof ValueMap)[];

	keys.forEach((key) => {
		if (key === "application/ld+json") {
			const c = configs[key];
			if (!c?.attributes) return;

			output.add(create_tag(c.element, { [c.type]: "application/ld+json" }, c.attributes));
		} else if (key === "og:image") {
			const c = configs[key];
			if (!c?.attributes) return;

			const { src, alt, height, secure_url, type, width } = c.attributes.content;

			output.add(create_tag(c.element, { [c.type]: "og:image", content: src }));

			if (alt) {
				output.add(create_tag(c.element, { [c.type]: "og:image:alt", content: alt }));
			}
			if (height) {
				output.add(
					create_tag(c.element, { [c.type]: "og:image:height", content: height.toString() }),
				);
			}
			if (width) {
				output.add(
					create_tag(c.element, { [c.type]: "og:image:width", content: width.toString() }),
				);
			}
			if (type) {
				output.add(create_tag(c.element, { [c.type]: "og:image:type", content: type }));
			}
			if (secure_url) {
				output.add(create_tag(c.element, { [c.type]: "og:image:secure_url", content: secure_url }));
			}

			return;
		} else if (key === "twitter:image") {
			const c = configs[key];
			if (!c?.attributes) return;

			const { src, alt } = c.attributes.content;

			output.add(create_tag(c.element, { [c.type]: "twitter:image", content: src }));

			if (alt) {
				output.add(create_tag(c.element, { [c.type]: "twitter:image:alt", content: alt }));
			}

			return;
		} else if (key === "msapplication-task") {
			const c = configs[key];
			if (!c?.attributes) return;

			// c.attributes?.forEach(({ content }) => {
			const content = Object.entries(c.attributes.content)
				.map(([key, value]) => `${key}= ${value}`)
				.join(";");

			output.add(create_tag(c.element, { [c.type]: "msapplication-task", content }));

			return;
		} else {
			const c = configs[key];
			if (!c?.attributes) return;

			output.add(create_tag(c.element, { [c.type]: key, ...c.attributes }, c.children));

			return;
		}
	});

	return output;
}
