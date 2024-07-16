import { configs_to_html, values_to_configs } from "$src/transform.js";
import { ValueMap } from "$src/types/value-map.js";

export class Metadata {
	values: Partial<ValueMap> = {};

	// TODO: Manage og / meta / schema - seperately

	constructor(initialElements?: Partial<ValueMap>) {
		if (initialElements) {
			this.values = initialElements;
		}
	}

	add<Key extends keyof ValueMap>(key: Key, value: ValueMap[Key]) {
		if (this.values[key] && Array.isArray(this.values[key])) {
			this.values = {
				...this.values,
				[key]: [...this.values[key], value],
			};
			return this;
		} else {
			this.values = {
				...this.values,
				[key]: value,
			};
			return this;
		}
	}

	title(value: string) {
		// TODO: Fix title children
		if (!this.values.title) this.add("title", {});
		if (!this.values["og:title"]) this.add("og:title", { content: value });
		if (!this.values["twitter:title"]) this.add("twitter:title", { content: value });
		return this;
	}
	description(value: string) {
		if (!this.values.description) this.add("description", { content: value });
		if (!this.values["og:description"]) this.add("og:description", { content: value });
		if (!this.values["twitter:description"]) this.add("twitter:description", { content: value });
		return this;
	}
	url(value: URL) {
		if (!this.values.canonical) this.add("canonical", { href: value });
		if (!this.values["og:url"]) this.add("og:url", { content: value });
		if (!this.values["twitter:url"]) this.add("twitter:url", { content: value });
		if (!this.values["msapplication-starturl"]) this.add("msapplication-starturl", { href: value });
		return this;
	}
	image(value: ValueMap["og:image"][number]) {
		this.add("og:image", [value]);
		this.add("twitter:image", [value]);

		return this;
	}

	/* global(value: string) {
		// theme-color
		// site-name
		// twitter:site
		if (!this.values["og:site_name"]) this.add("og:site_name", { content: value });
		return this;
	}
	page(value: string) {
		// twitter:card
		// twitter:creator
		if (!this.values["og:site_name"]) this.add("og:site_name", { content: value });
		return this;
	} */

	type({
		type,
		params,
	}:
		| {
				type: "article";
				params: {
					authors?: ValueMap["og:article:author"];
					expiration_time?: ValueMap["og:article:expiration_time"]["content"];
					modified_time?: ValueMap["og:article:modified_time"]["content"];
					published_time?: ValueMap["og:article:published_time"]["content"];
					section?: ValueMap["og:article:section"]["content"];
					tags?: ValueMap["og:article:tag"];
				};
		  }
		| {
				type: "book";
				params: {
					authors?: ValueMap["og:book:author"];
					isbn?: ValueMap["og:book:isbn"]["content"];
					release_date?: ValueMap["og:book:release_date"]["content"];
					tags?: ValueMap["og:book:tag"];
				};
		  }
		| {
				type: "music.song";
				params: {
					duration?: ValueMap["og:music:duration"]["content"];
					albums?: ValueMap["og:music:album"];
					musicians?: ValueMap["og:music:musician"];
				};
		  }
		| {
				type: "music.album";
				params: {
					songs?: ValueMap["og:music:song"];
					musicians?: ValueMap["og:music:musician"];
					release_date?: ValueMap["og:music:release_date"]["content"];
				};
		  }
		| {
				type: "music.playlist";
				params: {
					songs?: ValueMap["og:music:song"];
					creator?: ValueMap["og:music:creator"]["content"];
				};
		  }
		| {
				type: "music.radio_station";
				params: {
					creator?: ValueMap["og:music:creator"]["content"];
				};
		  }
		| {
				type: "profile";
				params: {
					first_name?: ValueMap["og:profile:first_name"]["content"];
					last_name?: ValueMap["og:profile:last_name"]["content"];
					username?: ValueMap["og:profile:username"]["content"];
					gender?: ValueMap["og:profile:gender"]["content"];
				};
		  }
		| {
				type: "video.episode";
				params: {
					actors?: ValueMap["og:video:actor"];
					directors?: ValueMap["og:video:director"];
					writers?: ValueMap["og:video:writer"];
					duration?: ValueMap["og:video:duration"]["content"];
					release_date?: ValueMap["og:video:release_date"]["content"];
					tags?: ValueMap["og:video:tag"];
					series?: ValueMap["og:video:series"]["content"];
				};
		  }
		| {
				type: "video.movie";
				params: {
					actors?: ValueMap["og:video:actor"];
					directors?: ValueMap["og:video:director"];
					writers?: ValueMap["og:video:writer"];
					duration?: ValueMap["og:video:duration"]["content"];
					release_date?: ValueMap["og:video:release_date"]["content"];
					tags?: ValueMap["og:video:tag"];
				};
		  }
		| {
				type: "video.other";
				params: {
					actors?: ValueMap["og:video:actor"];
					directors?: ValueMap["og:video:director"];
					writers?: ValueMap["og:video:writer"];
					duration?: ValueMap["og:video:duration"]["content"];
					release_date?: ValueMap["og:video:release_date"]["content"];
					tags?: ValueMap["og:video:tag"];
				};
		  }
		| {
				type: "video.tv_show";
				params: {
					actors?: ValueMap["og:video:actor"];
					directors?: ValueMap["og:video:director"];
					writers?: ValueMap["og:video:writer"];
					duration?: ValueMap["og:video:duration"]["content"];
					release_date?: ValueMap["og:video:release_date"]["content"];
					tags?: ValueMap["og:video:tag"];
				};
		  }
		| { type: "website"; params?: object }) {
		if (type === "article") {
			if (params.authors) this.add("og:article:author", params.authors);
			if (params.expiration_time)
				this.add("og:article:expiration_time", { content: params.expiration_time });
			if (params.modified_time)
				this.add("og:article:modified_time", { content: params.modified_time });
			if (params.published_time)
				this.add("og:article:published_time", { content: params.published_time });
			if (params.section) this.add("og:article:section", { content: params.section });
			if (params.tags) this.add("og:article:tag", params.tags);

			return this;
		} else if (type === "book") {
			if (params.authors) this.add("og:book:author", params.authors);
			if (params.isbn) this.add("og:book:isbn", { content: params.isbn });
			if (params.release_date) this.add("og:book:release_date", { content: params.release_date });
			if (params.tags) this.add("og:book:tag", params.tags);

			return this;
		} else if (type === "music.song") {
			if (params.duration) this.add("og:music:duration", { content: params.duration });
			if (params.albums) this.add("og:music:album", params.albums);
			if (params.musicians) this.add("og:music:musician", params.musicians);

			return this;
		} else if (type === "music.album") {
			if (params.songs) this.add("og:music:song", params.songs);
			if (params.musicians) this.add("og:music:musician", params.musicians);
			if (params.release_date) this.add("og:music:release_date", { content: params.release_date });

			return this;
		} else if (type === "music.playlist") {
			if (params.songs) this.add("og:music:song", params.songs);
			if (params.creator) this.add("og:music:creator", { content: params.creator });

			return this;
		} else if (type === "music.radio_station") {
			if (params.creator) this.add("og:music:creator", { content: params.creator });

			return this;
		} else if (type === "profile") {
			if (params.first_name) this.add("og:profile:first_name", { content: params.first_name });
			if (params.last_name) this.add("og:profile:last_name", { content: params.last_name });
			if (params.username) this.add("og:profile:username", { content: params.username });
			if (params.gender) this.add("og:profile:gender", { content: params.gender });

			return this;
		} else if (type === "video.episode") {
			if (params.actors) this.add("og:video:actor", params.actors);
			if (params.directors) this.add("og:video:director", params.directors);
			if (params.writers) this.add("og:video:writer", params.writers);
			if (params.duration) this.add("og:video:duration", { content: params.duration });
			if (params.release_date) this.add("og:video:release_date", { content: params.release_date });
			if (params.tags) this.add("og:video:tag", params.tags);
			if (params.series) this.add("og:video:series", { content: params.series });

			return this;
		} else if (type === "video.movie") {
			if (params.actors) this.add("og:video:actor", params.actors);
			if (params.directors) this.add("og:video:director", params.directors);
			if (params.writers) this.add("og:video:writer", params.writers);
			if (params.duration) this.add("og:video:duration", { content: params.duration });
			if (params.release_date) this.add("og:video:release_date", { content: params.release_date });
			if (params.tags) this.add("og:video:tag", params.tags);

			return this;
		} else if (type === "video.other") {
			if (params.actors) this.add("og:video:actor", params.actors);
			if (params.directors) this.add("og:video:director", params.directors);
			if (params.writers) this.add("og:video:writer", params.writers);
			if (params.duration) this.add("og:video:duration", { content: params.duration });
			if (params.release_date) this.add("og:video:release_date", { content: params.release_date });
			if (params.tags) this.add("og:video:tag", params.tags);

			return this;
		} else if (type === "video.tv_show") {
			if (params.actors) this.add("og:video:actor", params.actors);
			if (params.directors) this.add("og:video:director", params.directors);
			if (params.writers) this.add("og:video:writer", params.writers);
			if (params.duration) this.add("og:video:duration", { content: params.duration });
			if (params.release_date) this.add("og:video:release_date", { content: params.release_date });
			if (params.tags) this.add("og:video:tag", params.tags);

			return this;
		} else if (type === "website") {
			return this;
		} else {
			throw new Error(`Unknown type: ${type}`);
		}
	}

	toConfig() {
		const configs = values_to_configs(this.values);
		return configs;
	}
	toString() {
		const configs = values_to_configs(this.values);
		const html = configs_to_html(configs);

		return Object.values(html).join("\n");
	}
	toHTML() {
		const configs = values_to_configs(this.values);
		const html = configs_to_html(configs);

		return html;
	}
}

const meta = new Metadata();

meta.add("application-name", { content: "" });

meta.title("BBC - Home").type({ type: "article", params: { authors: [{ content: new URL("") }] } });

/*



<script type="application/ld+json">
	{
		"@context": "http://schema.org",
		"@type": "CollectionPage",
		"name": "BBC - Home",
		"headline": "BBC - Home",
		"url": "https://www.bbc.co.uk/",
		"publisher": {
			"@type": "NewsMediaOrganization",
			"name": "BBC",
			"publishingPrinciples": "https://www.bbc.co.uk/news/help-41670342",
			"logo": {
				"@type": "ImageObject",
				"url": "https://static.files.bbci.co.uk/core/website/assets/static/webcore/bbc_blocks_84x24.5b565ac136ea8f9cb3b0f8e02eca1e0f.svg"
			}
		},
		"mainEntity": { "@type": "ItemList", "itemListElement": [] }
	}
</script>
*/
