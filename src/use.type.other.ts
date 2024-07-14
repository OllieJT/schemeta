import type { MetadataElement } from "$src/types/entity.js";
import type { OpenGraph } from "$src/types/tags.js";

export function use_type_article(data: {
	published_time?: Date;
	modified_time?: Date;
	expiration_time?: Date;
	author?: { url: string }[];
	section?: string;
	tags?: string[];
}): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "article" },
		} satisfies OpenGraph.Type,
	];

	if (data.published_time) {
		elements.push({
			element: "meta",
			attributes: {
				property: "article:published_time",
				content: data.published_time.toISOString(),
			},
		} satisfies OpenGraph.ArticlePublishedTime);
	}

	if (data.modified_time) {
		elements.push({
			element: "meta",
			attributes: { property: "article:modified_time", content: data.modified_time.toISOString() },
		} satisfies OpenGraph.ArticleModifiedTime);
	}

	if (data.expiration_time) {
		elements.push({
			element: "meta",
			attributes: {
				property: "article:expiration_time",
				content: data.expiration_time.toISOString(),
			},
		} satisfies OpenGraph.ArticleExpirationTime);
	}

	if (data.author) {
		data.author.forEach((author) => {
			elements.push({
				element: "meta",
				attributes: { property: "article:author", content: author.url },
			} satisfies OpenGraph.ArticleAuthor);
		});
	}

	if (data.section) {
		elements.push({
			element: "meta",
			attributes: { property: "article:section", content: data.section },
		} satisfies OpenGraph.ArticleSection);
	}

	if (data.tags) {
		data.tags.forEach((tag) => {
			elements.push({
				element: "meta",
				attributes: { property: "article:tag", content: tag },
			} satisfies OpenGraph.ArticleTag);
		});
	}

	return elements;
}

export function use_type_book(data: {
	author?: { url: string }[];
	isbn?: string;
	release_date?: Date;
	tags?: string[];
}): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "book" },
		} satisfies OpenGraph.Type,
	];

	if (data.author) {
		data.author.forEach((author) => {
			elements.push({
				element: "meta",
				attributes: { property: "book:author", content: author.url },
			} satisfies OpenGraph.BookAuthor);
		});
	}

	if (data.isbn) {
		elements.push({
			element: "meta",
			attributes: { property: "book:isbn", content: data.isbn },
		} satisfies OpenGraph.BookIsbn);
	}

	if (data.release_date) {
		elements.push({
			element: "meta",
			attributes: { property: "book:release_date", content: data.release_date.toISOString() },
		} satisfies OpenGraph.BookReleaseDate);
	}

	if (data.tags) {
		data.tags.forEach((tag) => {
			elements.push({
				element: "meta",
				attributes: { property: "book:tag", content: tag },
			} satisfies OpenGraph.BookTag);
		});
	}

	return elements;
}

export function use_type_profile(data: {
	username?: string;
	first_name?: string;
	last_name?: string;
	gender?: string;
}): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "profile" },
		} satisfies OpenGraph.Type,
	];

	if (data.username) {
		elements.push({
			element: "meta",
			attributes: { property: "profile:username", content: data.username },
		} satisfies OpenGraph.ProfileUsername);
	}

	if (data.first_name) {
		elements.push({
			element: "meta",
			attributes: { property: "profile:first_name", content: data.first_name },
		} satisfies OpenGraph.ProfileFirstName);
	}

	if (data.last_name) {
		elements.push({
			element: "meta",
			attributes: { property: "profile:last_name", content: data.last_name },
		} satisfies OpenGraph.ProfileLastName);
	}

	if (data.gender) {
		elements.push({
			element: "meta",
			attributes: { property: "profile:gender", content: data.gender },
		} satisfies OpenGraph.ProfileGender);
	}

	return elements;
}

export function use_type_website(): MetadataElement[] {
	return [
		{
			element: "meta",
			attributes: { property: "og:type", content: "website" },
		} satisfies OpenGraph.Type,
	];
}
