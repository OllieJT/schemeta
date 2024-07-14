import type { MetadataElement, OpenGraph, Twitter, Web } from "../types/tags.js";

export const use_canonical = (url: string) => {
	const og_url: OpenGraph.Url = {
		element: "meta",
		attributes: { property: "og:url", content: url },
	};
	const tw_url: Twitter.Url = {
		element: "meta",
		attributes: { name: "twitter:url", content: url },
	};
	const canonical: Web.Canonical = {
		element: "link",
		attributes: { rel: "canonical", href: url },
	};

	return [og_url, tw_url, canonical] satisfies MetadataElement[];
};
