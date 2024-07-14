import type { MetadataElement, OpenGraph, Twitter } from "../types/tags.js";

export const use_title = (title: string) => {
	const og_title: OpenGraph.Title = {
		element: "meta",
		attributes: { property: "og:title", content: title },
	};
	const tw_title: Twitter.Title = {
		element: "meta",
		attributes: { name: "twitter:title", content: title },
	};

	return [og_title, tw_title] satisfies MetadataElement[];
};
