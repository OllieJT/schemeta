import { ElementConfig } from "$src/to-elements.types.js";
import type { Meta } from "$src/types/values.js";
import { format_primitive } from "$src/utility/format-primitive.js";

type MetaElement = ElementConfig<"meta", Meta.Properties, null>;

function msapplication_string(data: Record<string, string | number>) {
	return Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join(";");
}

export function from_meta(values: Meta.ValueMap): MetaElement[] {
	const elements: MetaElement[] = [];

	const keys = Object.keys(values) as (keyof Meta.ValueMap)[];

	keys.forEach((key) => {
		if (key === "twitter:image") {
			const twitter_image = values[key];
			twitter_image.forEach((image) => {
				elements.push({
					element: "meta",
					attributes: { name: "twitter:image", content: image.src },
				});
				if (image.alt) {
					elements.push({
						element: "meta",
						attributes: { name: "twitter:image:alt", content: image.alt },
					});
				}
			});
		} else if (key === "msapplication-task") {
			const msapplication_task = values[key];
			msapplication_task.forEach((task) => {
				elements.push({
					element: "meta",
					attributes: { name: "msapplication-task", content: msapplication_string(task) },
				});
			});
		} else if (key === "msapplication-notification") {
			const msapplication_notification = values[key];
			if (!msapplication_notification) return console.warn(`No value for ${key}`);
			elements.push({
				element: "meta",
				attributes: {
					name: "msapplication-notification",
					content: msapplication_string(msapplication_notification),
				},
			});
		} else if (key === "msapplication-badge") {
			const msapplication_badge = values[key];
			if (!msapplication_badge) return console.warn(`No value for ${key}`);
			elements.push({
				element: "meta",
				attributes: {
					name: "msapplication-badge",
					content: msapplication_string(msapplication_badge),
				},
			});
		} else if (key === "msapplication-window") {
			const msapplication_window = values[key];
			if (!msapplication_window) return console.warn(`No value for ${key}`);
			elements.push({
				element: "meta",
				attributes: {
					name: "msapplication-window",
					content: msapplication_string(msapplication_window),
				},
			});
		} else {
			const value = values[key];
			if (!value) return console.warn(`No value for ${key}`);

			elements.push({
				element: "meta",
				attributes: { name: key, content: format_primitive(value) },
			});
		}
	});

	return elements;
}
