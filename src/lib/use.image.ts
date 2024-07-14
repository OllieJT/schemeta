import type { MetadataElement, OpenGraph, Twitter } from "../types/tags.js";

export const use_image = (image: {
	src: string;
	secure_url?: string;
	width?: number;
	height?: number;
	alt?: string;
	type?: string;
}) => {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:image", content: image.src },
		} satisfies OpenGraph.Image,
		{
			element: "meta",
			attributes: { name: "twitter:image", content: image.src },
		} satisfies Twitter.Image,
	];

	if (image.alt) {
		const og_img_alt: OpenGraph.ImageAlt = {
			element: "meta",
			attributes: { property: "og:image:alt", content: image.alt },
		};
		const tw_img_alt: Twitter.ImageAlt = {
			element: "meta",
			attributes: { name: "twitter:image:alt", content: image.alt },
		};
		elements.push(og_img_alt, tw_img_alt);
	}

	if (image.width && image.height) {
		const og_img_width: OpenGraph.ImageWidth = {
			element: "meta",
			attributes: { property: "og:image:width", content: image.width.toString() },
		};
		const og_img_height: OpenGraph.ImageHeight = {
			element: "meta",
			attributes: { property: "og:image:height", content: image.height.toString() },
		};
		elements.push(og_img_width, og_img_height);
	}

	if (image.type) {
		const og_img_type: OpenGraph.ImageType = {
			element: "meta",
			attributes: { property: "og:image:type", content: image.type },
		};
		elements.push(og_img_type);
	}

	if (image.secure_url) {
		const og_img_secure_url: OpenGraph.ImageSecureUrl = {
			element: "meta",
			attributes: { property: "og:image:secure_url", content: image.secure_url },
		};
		elements.push(og_img_secure_url);
	}

	return elements;
};
