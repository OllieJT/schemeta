import { to_elements } from "$src/to-elements.js";
import { to_html } from "$src/to-html.js";
import { Prettify } from "$src/types/utility.js";
import type { Meta, RDFa, XML } from "$src/types/values.js";

export class Metadata {
	#meta: Meta.ValueMap = {
		"application-name": undefined,
		title: undefined,
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
	};
	#rdfa: RDFa.ValueMap = {
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
		"og:music:duration": undefined,
		"og:music:album": [],
		"og:music:musician": [],
		"og:music:song": [],
		"og:music:release_date": undefined,
		"og:music:creator": undefined,
		"og:video:actor": [],
		"og:video:director": [],
		"og:video:duration": undefined,
		"og:video:release_date": undefined,
		"og:video:tag": [],
		"og:video:series": undefined,
		"og:video:writer": [],
		"og:article:author": [],
		"og:article:expiration_time": undefined,
		"og:article:modified_time": undefined,
		"og:article:published_time": undefined,
		"og:article:section": undefined,
		"og:article:tag": [],
		"og:book:author": [],
		"og:book:isbn": undefined,
		"og:book:release_date": undefined,
		"og:book:tag": [],
		"og:profile:first_name": undefined,
		"og:profile:gender": undefined,
		"og:profile:last_name": undefined,
		"og:profile:username": undefined,
	};
	#script: XML.ValueMap = {
		title: undefined,
		schema: [],
	};

	constructor(values?: {
		meta?: Partial<Meta.ValueMap>;
		rdfa?: Partial<RDFa.ValueMap>;
		scropt?: Partial<XML.ValueMap>;
	}) {
		if (values?.meta) this.#meta = { ...this.#meta, ...values.meta };
		if (values?.rdfa) this.#rdfa = { ...this.#rdfa, ...values.rdfa };
		if (values?.scropt) this.#script = { ...this.#script, ...values.scropt };
	}

	// Add Values
	add_meta<Key extends keyof Meta.Values>(key: Key, value: Meta.Values[Key]) {
		if (this.#meta[key] && Array.isArray(this.#meta[key])) {
			this.#meta = { ...this.#meta, [key]: [...this.#meta[key], value] };
		} else {
			this.#meta = { ...this.#meta, [key]: value };
		}
		return this;
	}
	add_rdfa<Key extends keyof RDFa.Values>(key: Key, value: RDFa.Values[Key]) {
		if (this.#rdfa[key] && Array.isArray(this.#rdfa[key])) {
			this.#rdfa = { ...this.#rdfa, [key]: [...this.#rdfa[key], value] };
		} else {
			this.#rdfa = { ...this.#rdfa, [key]: value };
		}
		return this;
	}
	add_xml<Key extends keyof XML.Values>(key: Key, value: XML.Values[Key]) {
		if (this.#script[key] && Array.isArray(this.#script[key])) {
			this.#script = { ...this.#script, [key]: [...this.#script[key], value] };
		} else {
			this.#script = { ...this.#script, [key]: value };
		}
		return this;
	}

	add<Key extends keyof Meta.Values | keyof RDFa.Values | keyof XML.Values>({
		key,
		value,
	}: Key extends keyof Meta.Values
		? { key: Key; value: Meta.Values[Key] }
		: Key extends keyof RDFa.Values
			? { key: Key; value: RDFa.Values[Key] }
			: Key extends keyof XML.Values
				? { key: Key; value: XML.Values[Key] }
				: never) {
		if (key in this.#meta) {
			const k = key as keyof Meta.Values;
			this.add_meta(k, value as Meta.Values[typeof k]);
		} else if (key in this.#rdfa) {
			const k = key as keyof RDFa.Values;
			this.add_rdfa(k, value as RDFa.Values[typeof k]);
		} else if (key in this.#script) {
			const k = key as keyof XML.Values;
			this.add_xml(k, value as XML.Values[typeof k]);
		}
	}

	title(value: string) {
		this.add_xml("title", value);
		this.add_rdfa("og:title", value);
		this.add_meta("twitter:title", value);
		return this;
	}
	description(value: string) {
		this.add_meta("description", value);
		this.add_rdfa("og:description", value);
		this.add_meta("twitter:description", value);
		return this;
	}
	url(value: URL) {
		const canonical = new URL(value);
		value.hash = "";
		value.search = "";

		this.add_meta("canonical", canonical);
		this.add_rdfa("og:url", value);
		this.add_meta("twitter:url", value);
		this.add_meta("msapplication-starturl", value);
		return this;
	}

	image(value: RDFa.Values["og:image"]) {
		this.add_rdfa("og:image", value);
		this.add_meta("twitter:image", value);
		return this;
	}

	type({
		type,
		params,
	}:
		| {
				type: "article";
				params: Prettify<{
					authors?: RDFa.ValueMap["og:article:author"];
					expiration_time?: RDFa.ValueMap["og:article:expiration_time"];
					modified_time?: RDFa.ValueMap["og:article:modified_time"];
					published_time?: RDFa.ValueMap["og:article:published_time"];
					section?: RDFa.ValueMap["og:article:section"];
					tags?: RDFa.ValueMap["og:article:tag"];
				}>;
		  }
		| {
				type: "book";
				params: Prettify<{
					authors?: RDFa.ValueMap["og:book:author"];
					isbn?: RDFa.ValueMap["og:book:isbn"];
					release_date?: RDFa.ValueMap["og:book:release_date"];
					tags?: RDFa.ValueMap["og:book:tag"];
				}>;
		  }
		| {
				type: "music.song";
				params: Prettify<{
					duration?: RDFa.ValueMap["og:music:duration"];
					albums?: RDFa.ValueMap["og:music:album"];
					musicians?: RDFa.ValueMap["og:music:musician"];
				}>;
		  }
		| {
				type: "music.album";
				params: Prettify<{
					songs?: RDFa.ValueMap["og:music:song"];
					musicians?: RDFa.ValueMap["og:music:musician"];
					release_date?: RDFa.ValueMap["og:music:release_date"];
				}>;
		  }
		| {
				type: "music.playlist";
				params: Prettify<{
					songs?: RDFa.ValueMap["og:music:song"];
					creator?: RDFa.ValueMap["og:music:creator"];
				}>;
		  }
		| {
				type: "music.radio_station";
				params: Prettify<{
					creator?: RDFa.ValueMap["og:music:creator"];
				}>;
		  }
		| {
				type: "profile";
				params: Prettify<{
					first_name?: RDFa.ValueMap["og:profile:first_name"];
					last_name?: RDFa.ValueMap["og:profile:last_name"];
					username?: RDFa.ValueMap["og:profile:username"];
					gender?: RDFa.ValueMap["og:profile:gender"];
				}>;
		  }
		| {
				type: "video.episode";
				params: Prettify<{
					actors?: RDFa.ValueMap["og:video:actor"];
					directors?: RDFa.ValueMap["og:video:director"];
					writers?: RDFa.ValueMap["og:video:writer"];
					duration?: RDFa.ValueMap["og:video:duration"];
					release_date?: RDFa.ValueMap["og:video:release_date"];
					tags?: RDFa.ValueMap["og:video:tag"];
					series?: RDFa.ValueMap["og:video:series"];
				}>;
		  }
		| {
				type: "video.movie";
				params: Prettify<{
					actors?: RDFa.ValueMap["og:video:actor"];
					directors?: RDFa.ValueMap["og:video:director"];
					writers?: RDFa.ValueMap["og:video:writer"];
					duration?: RDFa.ValueMap["og:video:duration"];
					release_date?: RDFa.ValueMap["og:video:release_date"];
					tags?: RDFa.ValueMap["og:video:tag"];
				}>;
		  }
		| {
				type: "video.other";
				params: Prettify<{
					actors?: RDFa.ValueMap["og:video:actor"];
					directors?: RDFa.ValueMap["og:video:director"];
					writers?: RDFa.ValueMap["og:video:writer"];
					duration?: RDFa.ValueMap["og:video:duration"];
					release_date?: RDFa.ValueMap["og:video:release_date"];
					tags?: RDFa.ValueMap["og:video:tag"];
				}>;
		  }
		| {
				type: "video.tv_show";
				params: Prettify<{
					actors?: RDFa.ValueMap["og:video:actor"];
					directors?: RDFa.ValueMap["og:video:director"];
					writers?: RDFa.ValueMap["og:video:writer"];
					duration?: RDFa.ValueMap["og:video:duration"];
					release_date?: RDFa.ValueMap["og:video:release_date"];
					tags?: RDFa.ValueMap["og:video:tag"];
				}>;
		  }
		| { type: "website"; params?: object }) {
		if (type === "article") {
			if (params.authors) {
				params.authors.forEach((author) => this.add_rdfa("og:article:author", author));
			}
			if (params.expiration_time) {
				this.add_rdfa("og:article:expiration_time", params.expiration_time);
			}
			if (params.modified_time) this.add_rdfa("og:article:modified_time", params.modified_time);
			if (params.published_time) this.add_rdfa("og:article:published_time", params.published_time);
			if (params.section) this.add_rdfa("og:article:section", params.section);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:article:tag", tag));
			}

			return this;
		} else if (type === "book") {
			if (params.authors) {
				params.authors.forEach((author) => this.add_rdfa("og:book:author", author));
			}
			if (params.isbn) this.add_rdfa("og:book:isbn", params.isbn);
			if (params.release_date) this.add_rdfa("og:book:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:book:tag", tag));
			}

			return this;
		} else if (type === "music.song") {
			if (params.duration) this.add_rdfa("og:music:duration", params.duration);
			if (params.albums) {
				params.albums.forEach((album) => this.add_rdfa("og:music:album", album));
			}
			if (params.musicians) {
				params.musicians.forEach((musician) => this.add_rdfa("og:music:musician", musician));
			}

			return this;
		} else if (type === "music.album") {
			if (params.songs) {
				params.songs.forEach((song) => this.add_rdfa("og:music:song", song));
			}
			if (params.musicians) {
				params.musicians.forEach((musician) => this.add_rdfa("og:music:musician", musician));
			}
			if (params.release_date) this.add_rdfa("og:music:release_date", params.release_date);

			return this;
		} else if (type === "music.playlist") {
			if (params.songs) {
				params.songs.forEach((song) => this.add_rdfa("og:music:song", song));
			}
			if (params.creator) this.add_rdfa("og:music:creator", params.creator);

			return this;
		} else if (type === "music.radio_station") {
			if (params.creator) this.add_rdfa("og:music:creator", params.creator);

			return this;
		} else if (type === "profile") {
			if (params.first_name) this.add_rdfa("og:profile:first_name", params.first_name);
			if (params.last_name) this.add_rdfa("og:profile:last_name", params.last_name);
			if (params.username) this.add_rdfa("og:profile:username", params.username);
			if (params.gender) this.add_rdfa("og:profile:gender", params.gender);

			return this;
		} else if (type === "video.episode") {
			if (params.actors) {
				params.actors.forEach((actor) => this.add_rdfa("og:video:actor", actor));
			}
			if (params.directors) {
				params.directors.forEach((director) => this.add_rdfa("og:video:director", director));
			}
			if (params.writers) {
				params.writers.forEach((writer) => this.add_rdfa("og:video:writer", writer));
			}
			if (params.duration) this.add_rdfa("og:video:duration", params.duration);
			if (params.release_date) this.add_rdfa("og:video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:video:tag", tag));
			}
			if (params.series) this.add_rdfa("og:video:series", params.series);

			return this;
		} else if (type === "video.movie") {
			if (params.actors) {
				params.actors.forEach((actor) => this.add_rdfa("og:video:actor", actor));
			}
			if (params.directors) {
				params.directors.forEach((director) => this.add_rdfa("og:video:director", director));
			}
			if (params.writers) {
				params.writers.forEach((writer) => this.add_rdfa("og:video:writer", writer));
			}
			if (params.duration) this.add_rdfa("og:video:duration", params.duration);
			if (params.release_date) this.add_rdfa("og:video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:video:tag", tag));
			}

			return this;
		} else if (type === "video.other") {
			if (params.actors) {
				params.actors.forEach((actor) => this.add_rdfa("og:video:actor", actor));
			}
			if (params.directors) {
				params.directors.forEach((director) => this.add_rdfa("og:video:director", director));
			}
			if (params.writers) {
				params.writers.forEach((writer) => this.add_rdfa("og:video:writer", writer));
			}
			if (params.duration) this.add_rdfa("og:video:duration", params.duration);
			if (params.release_date) this.add_rdfa("og:video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:video:tag", tag));
			}

			return this;
		} else if (type === "video.tv_show") {
			if (params.actors) {
				params.actors.forEach((actor) => this.add_rdfa("og:video:actor", actor));
			}
			if (params.directors) {
				params.directors.forEach((director) => this.add_rdfa("og:video:director", director));
			}
			if (params.writers) {
				params.writers.forEach((writer) => this.add_rdfa("og:video:writer", writer));
			}
			if (params.duration) this.add_rdfa("og:video:duration", params.duration);
			if (params.release_date) this.add_rdfa("og:video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((tag) => this.add_rdfa("og:video:tag", tag));
			}

			return this;
		} else if (type === "website") {
			return this;
		} else {
			throw new Error(`Unknown type: ${type}`);
		}
	}

	site(s: {
		name: string;
		theme_color?: Meta.Values["theme-color"];
		twitter_handle?: Meta.Values["twitter:site"];
	}) {
		if (s.name) {
			this.add_meta("application-name", s.name);
			this.add_rdfa("og:site_name", s.name);
			this.add_meta("apple-mobile-web-app-title", { content: s.name });
		}

		if (s.theme_color) this.add_meta("theme-color", s.theme_color);
		if (s.twitter_handle) this.add_meta("twitter:site", s.twitter_handle);
	}
	page(p: {
		title: string;
		url: URL;
		description?: string;
		images?: RDFa.Values["og:image"][];
		twitter_card?: Meta.Values["twitter:card"];
		twitter_creator?: Meta.Values["twitter:creator"];
	}) {
		this.title(p.title);
		this.url(p.url);
		if (p.description) this.description(p.description);
		if (p.twitter_card) this.add_meta("twitter:card", p.twitter_card);
		if (p.twitter_creator) this.add_meta("twitter:creator", p.twitter_creator);
		if (p.images) p.images.forEach((img) => this.image(img));
		return this;
	}

	toValues() {
		return {
			meta: this.#meta,
			rdfa: this.#rdfa,
			script: this.#script,
		};
	}
	toElements() {
		const meta = to_elements.from_meta(this.#meta);
		const rdfa = to_elements.from_rdfa(this.#rdfa);
		const script = to_elements.from_xml(this.#script);

		return [...meta, ...rdfa, ...script];
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

const meta = new Metadata();

meta.title("BBC - Home").type({
	type: "article",
	params: {
		authors: [new URL("https://www.bbc.co.uk/")],
	},
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
