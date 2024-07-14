import type { MetadataElement, OpenGraph, Twitter, Web } from "./types/tags.js";

export const use_description = (description: string) => {
	const desc: Web.Description = {
		element: "meta",
		attributes: { name: "description", content: description },
	};
	const og_desc: OpenGraph.Description = {
		element: "meta",
		attributes: { property: "og:description", content: description },
	};
	const tw_desc: Twitter.Description = {
		element: "meta",
		attributes: { name: "twitter:description", content: description },
	};

	return [desc, og_desc, tw_desc] satisfies MetadataElement[];
};
