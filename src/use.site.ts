import type { MetadataElement, OpenGraph, Web } from "./types/tags.js";

export const use_site = (site: {
	site_name: string;
	determiner?: string;
	theme_color?: `#${string}`;
}) => {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:site_name", content: site.site_name },
		} satisfies OpenGraph.SiteName,
	];

	if (site.determiner) {
		const og_determiner: OpenGraph.Determiner = {
			element: "meta",
			attributes: { property: "og:determiner", content: site.determiner },
		};
		elements.push(og_determiner);
	}

	if (site.theme_color) {
		const theme_color: Web.ThemeColor = {
			element: "meta",
			attributes: { name: "theme-color", content: site.theme_color },
		};
		elements.push(theme_color);
	}

	return elements;
};
