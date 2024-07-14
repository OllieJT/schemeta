import type { MetadataElement, OpenGraph, Twitter } from "../types/tags.js";

export const use_description = (description: string) => {
	const og_desc: OpenGraph.Description = {
		element: "meta",
		attributes: { property: "og:description", content: description },
	};
	const tw_desc: Twitter.Description = {
		element: "meta",
		attributes: { name: "twitter:description", content: description },
	};

	return [og_desc, tw_desc] satisfies MetadataElement[];
};
