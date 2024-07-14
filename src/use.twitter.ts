import type { MetadataElement, Twitter } from "./types/tags.js";

export const use_twitter = (twitter: {
	card: Twitter.CardValue;
	site_handle?: Twitter.UsernameValue;
	author_handle?: Twitter.UsernameValue;
}) => {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { name: "twitter:card", content: twitter.card },
		} satisfies Twitter.Card,
	];

	if (twitter.site_handle) {
		const tw_site: Twitter.Site = {
			element: "meta",
			attributes: { name: "twitter:site", content: twitter.site_handle },
		};
		elements.push(tw_site);
	}

	if (twitter.author_handle) {
		const tw_author: Twitter.Creator = {
			element: "meta",
			attributes: { name: "twitter:creator", content: twitter.author_handle },
		};
		elements.push(tw_author);
	}

	return elements;
};
