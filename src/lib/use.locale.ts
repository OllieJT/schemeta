import type { MetadataElement, OpenGraph } from "../types/tags.js";

export const use_locale = (site: { locale: string; locale_alternate?: string[] }) => {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:locale", content: site.locale },
		} satisfies OpenGraph.Locale,
	];

	if (site.locale_alternate) {
		site.locale_alternate.forEach((locale) => {
			const og_locale_alt: OpenGraph.LocaleAlternate = {
				element: "meta",
				attributes: { property: "og:locale:alternate", content: locale },
			};
			elements.push(og_locale_alt);
		});
	}

	return elements;
};
