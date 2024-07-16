import { ElementConfig } from "$src/to-elements.types.js";
import type { RDFa } from "$src/types/values.js";
import { format_primitive } from "$src/utility/format-primitive.js";

type RDFaElement = ElementConfig<"meta", RDFa.Properties, null>;

export function from_rdfa(values: RDFa.ValueMap): RDFaElement[] {
	const elements: RDFaElement[] = [];

	const keys = Object.keys(values) as (keyof RDFa.ValueMap)[];

	keys.forEach((key) => {
		if (key === "og:image") {
			const twitter_image = values[key];
			twitter_image.forEach((image) => {
				const attribs = [{ property: "og:image", content: image.src }];

				if (image.alt) attribs.push({ property: "twitter:image:alt", content: image.alt });
				if (image.width) attribs.push({ property: "og:image:width", content: String(image.width) });
				if (image.height)
					attribs.push({ property: "og:image:height", content: String(image.height) });
				if (image.type) attribs.push({ property: "og:image:type", content: image.type });
				if (image.secure_url)
					attribs.push({ property: "og:image:secure_url", content: image.secure_url });

				attribs.forEach((attributes) => elements.push({ element: "meta", attributes }));
			});
		} else if (key === "og:music:song") {
			const music_song = values[key];
			music_song.forEach((song) => {
				const attribs = [
					{ property: "og:music:song", content: song.href.href },
					{ property: "og:music:disc", content: String(song.disc) },
					{ property: "og:music:track", content: String(song.track) },
				];

				attribs.forEach((attributes) => elements.push({ element: "meta", attributes }));
			});
		} else if (key === "og:music:album") {
			const music_album = values[key];
			music_album.forEach((album) => {
				const attribs = [
					{ property: "og:music:album", content: album.href.href },
					{ property: "og:music:disc", content: String(album.disc) },
					{ property: "og:music:track", content: String(album.track) },
				];

				attribs.forEach((attributes) => elements.push({ element: "meta", attributes }));
			});
		} else if (key === "og:video:actor") {
			const video_actor = values[key];
			video_actor.forEach((actor) => {
				const attribs = [
					{ property: "og:video:actor", content: actor.href.href },
					{ property: "og:video:role", content: actor.role },
				];

				attribs.forEach((attributes) => elements.push({ element: "meta", attributes }));
			});
		} else {
			const value = values[key];
			if (!value) return console.warn(`No value for ${key}`);

			if (Array.isArray(value)) {
				value.forEach((item) => {
					elements.push({
						element: "meta",
						attributes: { property: key, content: format_primitive(item) },
					});
				});
			} else {
				elements.push({
					element: "meta",
					attributes: { property: key, content: format_primitive(value) },
				});
			}
		}
	});

	return elements;
}
