import { to_elements } from "$src/lib/to-elements.js";
import { to_html } from "$src/lib/to-html.js";
import { Prettify } from "$src/lib/types.js";
import { Meta, meta, Xml, xml } from "$src/lib/values.js";

export class Metadata {
	#meta_values: Meta.Values = {
		"application-name": undefined,
		description: undefined,
		canonical: undefined,
		"theme-color": undefined,
		"msapplication-allowDomainApiCalls": undefined,
		"msapplication-allowDomainMetaTags": undefined,
		"msapplication-badge": undefined,
		"msapplication-config": undefined,
		"msapplication-navbutton-color": undefined,
		"msapplication-notification": undefined,
		"msapplication-square150x150logo": undefined,
		"msapplication-square310x310logo": undefined,
		"msapplication-square70x70logo": undefined,
		"msapplication-starturl": undefined,
		"msapplication-task-separator": undefined,
		"msapplication-task": [],
		"msapplication-TileColor": undefined,
		"msapplication-TileImage": undefined,
		"msapplication-tooltip": undefined,
		"msapplication-wide310x150logo": undefined,
		"msapplication-window": undefined,
		"twitter:card": undefined,
		"twitter:creator": undefined,
		"twitter:description": undefined,
		"twitter:image": [],
		"twitter:site": undefined,
		"twitter:title": undefined,
		"twitter:url": undefined,
		"og:site_name": undefined,
		"og:determiner": undefined,
		"og:title": undefined,
		"og:description": undefined,
		"og:image": [],
		"og:locale": undefined,
		"og:locale:alternate": [],
		"og:url": undefined,
		"og:audio": undefined,
		"og:video": undefined,
		"og:type": undefined,
		"music:duration": undefined,
		"music:album": [],
		"music:musician": [],
		"music:song": [],
		"music:release_date": undefined,
		"music:creator": undefined,
		"video:actor": [],
		"video:director": [],
		"video:duration": undefined,
		"video:release_date": undefined,
		"video:tag": [],
		"video:series": undefined,
		"video:writer": [],
		"article:author": [],
		"article:expiration_time": undefined,
		"article:modified_time": undefined,
		"article:published_time": undefined,
		"article:section": undefined,
		"article:tag": [],
		"book:author": [],
		"book:isbn": undefined,
		"book:release_date": undefined,
		"book:tag": [],
		"profile:first_name": undefined,
		"profile:gender": undefined,
		"profile:last_name": undefined,
		"profile:username": undefined,
		"apple-mobile-web-app-capable": undefined,
		"apple-mobile-web-app-status-bar-style": undefined,
		"apple-mobile-web-app-title": undefined,
		"apple-touch-icon": [],
		"apple-touch-startup-image": undefined,
		"format-detection": undefined,
		"pinterest-rich-pin": undefined,
		pinterest: undefined,
	};
	#xml_values: Xml.Values = {
		title: undefined,
		"application/ld+json": [],
	};

	constructor(values?: { meta?: Partial<Meta.Values>; xml?: Partial<Xml.Values> }) {
		if (values?.meta) this.#meta_values = { ...this.#meta_values, ...values.meta };
		if (values?.xml) this.#xml_values = { ...this.#xml_values, ...values.xml };
	}

	// Add Values
	add_meta<Key extends keyof Meta.OptionInput>(key: Key, input: Meta.OptionInput[Key]) {
		const output = meta.option[key].parse(input);

		if (Array.isArray(this.#meta_values[key])) {
			// Appending Value
			this.#meta_values = {
				...this.#meta_values,
				[key]: [...this.#meta_values[key], output],
			};
		} else {
			// Replacing Value
			this.#meta_values = {
				...this.#meta_values,
				[key]: output,
			};
		}
		return this;
	}

	add_xml<Key extends keyof Xml.OptionInput>(key: Key, input: Xml.OptionInput[Key]) {
		const output = xml.option[key].parse(input);

		if (Array.isArray(this.#xml_values[key])) {
			// Appending Value
			this.#xml_values = {
				...this.#xml_values,
				[key]: [...this.#xml_values[key], output],
			};
		} else {
			// Replacing Value
			this.#xml_values = {
				...this.#xml_values,
				[key]: output,
			};
		}
		return this;
	}

	add<Key extends keyof Meta.OptionInput | keyof Xml.OptionInput>({
		key,
		value,
	}: Key extends keyof Meta.OptionInput
		? { key: Key; value: Meta.OptionInput[Key] }
		: Key extends keyof Xml.OptionInput
			? { key: Key; value: Xml.OptionInput[Key] }
			: never) {
		if (key in this.#meta_values) {
			const k = key as keyof Meta.OptionInput;
			this.add_meta(k, value as Meta.OptionInput[typeof k]);
		} else if (key in this.#xml_values) {
			const k = key as keyof Xml.OptionInput;
			this.add_xml(k, value as Xml.OptionInput[typeof k]);
		}
	}

	title(content: string) {
		this.add_xml("title", content);
		this.add_meta("og:title", content);
		this.add_meta("twitter:title", content);
		return this;
	}
	description(content: string) {
		this.add_meta("description", content);
		this.add_meta("og:description", content);
		this.add_meta("twitter:description", content);
		return this;
	}
	url(content: string) {
		const canonical = new URL(content);
		canonical.hash = "";
		canonical.search = "";

		this.add_meta("canonical", canonical.href);
		this.add_meta("og:url", content);
		this.add_meta("twitter:url", content);
		this.add_meta("msapplication-starturl", content);
		return this;
	}

	image(img: {
		src: string;
		alt?: string;
		width?: number;
		height?: number;
		type?: string;
		secure_url?: string;
	}) {
		this.add_meta("og:image", img);
		this.add_meta("twitter:image", img);
		return this;
	}

	type({
		type,
		params,
	}:
		| {
				type: "article";
				params: Prettify<{
					authors?: Meta.OptionInput["article:author"][];
					expiration_time?: Meta.OptionInput["article:expiration_time"];
					modified_time?: Meta.OptionInput["article:modified_time"];
					published_time?: Meta.OptionInput["article:published_time"];
					section?: Meta.OptionInput["article:section"];
					tags?: Meta.OptionInput["article:tag"][];
				}>;
		  }
		| {
				type: "book";
				params: Prettify<{
					authors?: Meta.OptionInput["book:author"][];
					isbn?: Meta.OptionInput["book:isbn"];
					release_date?: Meta.OptionInput["book:release_date"];
					tags?: Meta.OptionInput["book:tag"][];
				}>;
		  }
		| {
				type: "music.song";
				params: Prettify<{
					duration?: Meta.OptionInput["music:duration"];
					albums?: Meta.OptionInput["music:album"][];
					musicians?: Meta.OptionInput["music:musician"][];
				}>;
		  }
		| {
				type: "music.album";
				params: Prettify<{
					songs?: Meta.OptionInput["music:song"][];
					musicians?: Meta.OptionInput["music:musician"][];
					release_date?: Meta.OptionInput["music:release_date"];
				}>;
		  }
		| {
				type: "music.playlist";
				params: Prettify<{
					songs?: Meta.OptionInput["music:song"][];
					creator?: Meta.OptionInput["music:creator"];
				}>;
		  }
		| {
				type: "music.radio_station";
				params: Prettify<{
					creator?: Meta.OptionInput["music:creator"];
				}>;
		  }
		| {
				type: "profile";
				params: Prettify<{
					first_name?: Meta.OptionInput["profile:first_name"];
					last_name?: Meta.OptionInput["profile:last_name"];
					username?: Meta.OptionInput["profile:username"];
					gender?: Meta.OptionInput["profile:gender"];
				}>;
		  }
		| {
				type: "video.episode";
				params: Prettify<{
					actors?: Meta.OptionInput["video:actor"][];
					directors?: Meta.OptionInput["video:director"][];
					writers?: Meta.OptionInput["video:writer"][];
					duration?: Meta.OptionInput["video:duration"];
					release_date?: Meta.OptionInput["video:release_date"];
					tags?: Meta.OptionInput["video:tag"][];
					series?: Meta.OptionInput["video:series"];
				}>;
		  }
		| {
				type: "video.movie";
				params: Prettify<{
					actors?: Meta.OptionInput["video:actor"][];
					directors?: Meta.OptionInput["video:director"][];
					writers?: Meta.OptionInput["video:writer"][];
					duration?: Meta.OptionInput["video:duration"];
					release_date?: Meta.OptionInput["video:release_date"];
					tags?: Meta.OptionInput["video:tag"][];
				}>;
		  }
		| {
				type: "video.other";
				params: Prettify<{
					actors?: Meta.OptionInput["video:actor"][];
					directors?: Meta.OptionInput["video:director"][];
					writers?: Meta.OptionInput["video:writer"][];
					duration?: Meta.OptionInput["video:duration"];
					release_date?: Meta.OptionInput["video:release_date"];
					tags?: Meta.OptionInput["video:tag"][];
				}>;
		  }
		| {
				type: "video.tv_show";
				params: Prettify<{
					actors?: Meta.OptionInput["video:actor"][];
					directors?: Meta.OptionInput["video:director"][];
					writers?: Meta.OptionInput["video:writer"][];
					duration?: Meta.OptionInput["video:duration"];
					release_date?: Meta.OptionInput["video:release_date"];
					tags?: Meta.OptionInput["video:tag"][];
				}>;
		  }
		| { type: "website"; params?: object }) {
		if (type === "article") {
			if (params.authors) {
				params.authors.forEach((content) => this.add_meta("article:author", content));
			}
			if (params.expiration_time) {
				this.add_meta("article:expiration_time", params.expiration_time);
			}
			if (params.modified_time) {
				this.add_meta("article:modified_time", params.modified_time);
			}
			if (params.published_time) {
				this.add_meta("article:published_time", params.published_time);
			}
			if (params.section) {
				this.add_meta("article:section", params.section);
			}
			if (params.tags) {
				params.tags.forEach((tag) => this.add_meta("article:tag", tag));
			}

			return this;
		} else if (type === "book") {
			if (params.authors) {
				params.authors.forEach((content) => this.add_meta("book:author", content));
			}
			if (params.isbn) this.add_meta("book:isbn", params.isbn);
			if (params.release_date) this.add_meta("book:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add_meta("book:tag", content));
			}

			return this;
		} else if (type === "music.song") {
			if (params.duration) this.add_meta("music:duration", params.duration);
			if (params.albums) {
				params.albums.forEach((content) => this.add_meta("music:album", content));
			}
			if (params.musicians) {
				params.musicians.forEach((content) => this.add_meta("music:musician", content));
			}

			return this;
		} else if (type === "music.album") {
			if (params.songs) {
				params.songs.forEach((content) => this.add_meta("music:song", content));
			}
			if (params.musicians) {
				params.musicians.forEach((content) => this.add_meta("music:musician", content));
			}
			if (params.release_date) this.add_meta("music:release_date", params.release_date);

			return this;
		} else if (type === "music.playlist") {
			if (params.songs) {
				params.songs.forEach((content) => this.add_meta("music:song", content));
			}
			if (params.creator) this.add_meta("music:creator", params.creator);

			return this;
		} else if (type === "music.radio_station") {
			if (params.creator) this.add_meta("music:creator", params.creator);

			return this;
		} else if (type === "profile") {
			if (params.first_name) this.add_meta("profile:first_name", params.first_name);
			if (params.last_name) this.add_meta("profile:last_name", params.last_name);
			if (params.username) this.add_meta("profile:username", params.username);
			if (params.gender) this.add_meta("profile:gender", params.gender);

			return this;
		} else if (type === "video.episode") {
			if (params.actors) {
				params.actors.forEach((content) => this.add_meta("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add_meta("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add_meta("video:writer", content));
			}
			if (params.duration) this.add_meta("video:duration", params.duration);
			if (params.release_date) this.add_meta("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add_meta("video:tag", content));
			}
			if (params.series) this.add_meta("video:series", params.series);

			return this;
		} else if (type === "video.movie") {
			if (params.actors) {
				params.actors.forEach((content) => this.add_meta("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add_meta("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add_meta("video:writer", content));
			}
			if (params.duration) this.add_meta("video:duration", params.duration);
			if (params.release_date) this.add_meta("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add_meta("video:tag", content));
			}

			return this;
		} else if (type === "video.other") {
			if (params.actors) {
				params.actors.forEach((content) => this.add_meta("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add_meta("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add_meta("video:writer", content));
			}
			if (params.duration) this.add_meta("video:duration", params.duration);
			if (params.release_date) this.add_meta("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add_meta("video:tag", content));
			}

			return this;
		} else if (type === "video.tv_show") {
			if (params.actors) {
				params.actors.forEach((content) => this.add_meta("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add_meta("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add_meta("video:writer", content));
			}
			if (params.duration) this.add_meta("video:duration", params.duration);
			if (params.release_date) this.add_meta("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add_meta("video:tag", content));
			}

			return this;
		} else if (type === "website") {
			return this;
		} else {
			throw new Error(`Unknown type: ${type}`);
		}
	}

	toValues() {
		return {
			meta: this.#meta_values,
			xml: this.#xml_values,
		};
	}
	toElements() {
		const meta = to_elements.from_meta(this.#meta_values);
		const script = to_elements.from_xml(this.#xml_values);

		return [...meta, ...script];
	}
	toHTML() {
		const elements = this.toElements();
		const html = to_html(elements);

		return html;
	}
	toString() {
		const elements = this.toElements();
		const html = to_html(elements);

		return html.join("\n");
	}
}

const schemeta = new Metadata();

schemeta.title("BBC - Home").type({
	type: "article",
	params: {},
});

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
