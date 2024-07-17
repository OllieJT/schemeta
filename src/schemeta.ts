import { to_html } from "$src/lib/to-html.js";
import { Prettify } from "$src/lib/types.js";
import { OptionInput, value_option, Values, values_to_elements } from "$src/lib/values.js";

export type MetadataValues = Values;
export type MetadataInitialValues = Partial<Values>;

export class Metadata {
	#raw_values: MetadataValues = {
		title: undefined,
		bookmark: undefined,
		"application/ld+json": [],
		"application-name": undefined,
		description: undefined,
		canonical: undefined,
		"theme-color": undefined,
		"apple-touch-fullscreen": undefined,
		"color-scheme": undefined,
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

	constructor(initial_values?: MetadataInitialValues) {
		if (initial_values) this.#raw_values = { ...this.#raw_values, ...initial_values };
	}

	add<Key extends keyof OptionInput>(key: Key, input: OptionInput[Key]) {
		const validator = value_option[key];
		if (!validator) throw new Error(`Unable to validate key: ${key}`);

		const output = validator.parse(input);

		if (Array.isArray(this.#raw_values[key])) {
			// Appending Value
			this.#raw_values = {
				...this.#raw_values,
				[key]: [...this.#raw_values[key], output],
			};
		} else {
			// Replacing Value
			this.#raw_values = {
				...this.#raw_values,
				[key]: output,
			};
		}
		return this;
	}

	title(content: string) {
		this.add("title", content);
		this.add("og:title", content);
		this.add("twitter:title", content);
		return this;
	}
	description(content: string) {
		this.add("description", content);
		this.add("og:description", content);
		this.add("twitter:description", content);
		return this;
	}
	url(content: string) {
		const canonical = new URL(content);
		canonical.hash = "";
		canonical.search = "";

		this.add("canonical", canonical.href);
		this.add("og:url", content);
		this.add("twitter:url", content);
		this.add("msapplication-starturl", content);
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
		this.add("og:image", img);
		this.add("twitter:image", img);
		return this;
	}
	site_name(content: string) {
		this.add("og:site_name", content);
		this.add("application-name", content);
		this.add("apple-mobile-web-app-title", content);
		return this;
	}

	type({
		type,
		params,
	}:
		| {
				type: "article";
				params: Prettify<{
					authors?: OptionInput["article:author"][];
					expiration_time?: OptionInput["article:expiration_time"];
					modified_time?: OptionInput["article:modified_time"];
					published_time?: OptionInput["article:published_time"];
					section?: OptionInput["article:section"];
					tags?: OptionInput["article:tag"][];
				}>;
		  }
		| {
				type: "book";
				params: Prettify<{
					authors?: OptionInput["book:author"][];
					isbn?: OptionInput["book:isbn"];
					release_date?: OptionInput["book:release_date"];
					tags?: OptionInput["book:tag"][];
				}>;
		  }
		| {
				type: "music.song";
				params: Prettify<{
					duration?: OptionInput["music:duration"];
					albums?: OptionInput["music:album"][];
					musicians?: OptionInput["music:musician"][];
				}>;
		  }
		| {
				type: "music.album";
				params: Prettify<{
					songs?: OptionInput["music:song"][];
					musicians?: OptionInput["music:musician"][];
					release_date?: OptionInput["music:release_date"];
				}>;
		  }
		| {
				type: "music.playlist";
				params: Prettify<{
					songs?: OptionInput["music:song"][];
					creator?: OptionInput["music:creator"];
				}>;
		  }
		| {
				type: "music.radio_station";
				params: Prettify<{
					creator?: OptionInput["music:creator"];
				}>;
		  }
		| {
				type: "profile";
				params: Prettify<{
					first_name?: OptionInput["profile:first_name"];
					last_name?: OptionInput["profile:last_name"];
					username?: OptionInput["profile:username"];
					gender?: OptionInput["profile:gender"];
				}>;
		  }
		| {
				type: "video.episode";
				params: Prettify<{
					actors?: OptionInput["video:actor"][];
					directors?: OptionInput["video:director"][];
					writers?: OptionInput["video:writer"][];
					duration?: OptionInput["video:duration"];
					release_date?: OptionInput["video:release_date"];
					tags?: OptionInput["video:tag"][];
					series?: OptionInput["video:series"];
				}>;
		  }
		| {
				type: "video.movie";
				params: Prettify<{
					actors?: OptionInput["video:actor"][];
					directors?: OptionInput["video:director"][];
					writers?: OptionInput["video:writer"][];
					duration?: OptionInput["video:duration"];
					release_date?: OptionInput["video:release_date"];
					tags?: OptionInput["video:tag"][];
				}>;
		  }
		| {
				type: "video.other";
				params: Prettify<{
					actors?: OptionInput["video:actor"][];
					directors?: OptionInput["video:director"][];
					writers?: OptionInput["video:writer"][];
					duration?: OptionInput["video:duration"];
					release_date?: OptionInput["video:release_date"];
					tags?: OptionInput["video:tag"][];
				}>;
		  }
		| {
				type: "video.tv_show";
				params: Prettify<{
					actors?: OptionInput["video:actor"][];
					directors?: OptionInput["video:director"][];
					writers?: OptionInput["video:writer"][];
					duration?: OptionInput["video:duration"];
					release_date?: OptionInput["video:release_date"];
					tags?: OptionInput["video:tag"][];
				}>;
		  }
		| { type: "website"; params?: object }) {
		if (type === "article") {
			if (params.authors) {
				params.authors.forEach((content) => this.add("article:author", content));
			}
			if (params.expiration_time) {
				this.add("article:expiration_time", params.expiration_time);
			}
			if (params.modified_time) {
				this.add("article:modified_time", params.modified_time);
			}
			if (params.published_time) {
				this.add("article:published_time", params.published_time);
			}
			if (params.section) {
				this.add("article:section", params.section);
			}
			if (params.tags) {
				params.tags.forEach((tag) => this.add("article:tag", tag));
			}

			return this;
		} else if (type === "book") {
			if (params.authors) {
				params.authors.forEach((content) => this.add("book:author", content));
			}
			if (params.isbn) this.add("book:isbn", params.isbn);
			if (params.release_date) this.add("book:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add("book:tag", content));
			}

			return this;
		} else if (type === "music.song") {
			if (params.duration) this.add("music:duration", params.duration);
			if (params.albums) {
				params.albums.forEach((content) => this.add("music:album", content));
			}
			if (params.musicians) {
				params.musicians.forEach((content) => this.add("music:musician", content));
			}

			return this;
		} else if (type === "music.album") {
			if (params.songs) {
				params.songs.forEach((content) => this.add("music:song", content));
			}
			if (params.musicians) {
				params.musicians.forEach((content) => this.add("music:musician", content));
			}
			if (params.release_date) this.add("music:release_date", params.release_date);

			return this;
		} else if (type === "music.playlist") {
			if (params.songs) {
				params.songs.forEach((content) => this.add("music:song", content));
			}
			if (params.creator) this.add("music:creator", params.creator);

			return this;
		} else if (type === "music.radio_station") {
			if (params.creator) this.add("music:creator", params.creator);

			return this;
		} else if (type === "profile") {
			if (params.first_name) this.add("profile:first_name", params.first_name);
			if (params.last_name) this.add("profile:last_name", params.last_name);
			if (params.username) this.add("profile:username", params.username);
			if (params.gender) this.add("profile:gender", params.gender);

			return this;
		} else if (type === "video.episode") {
			if (params.actors) {
				params.actors.forEach((content) => this.add("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add("video:writer", content));
			}
			if (params.duration) this.add("video:duration", params.duration);
			if (params.release_date) this.add("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add("video:tag", content));
			}
			if (params.series) this.add("video:series", params.series);

			return this;
		} else if (type === "video.movie") {
			if (params.actors) {
				params.actors.forEach((content) => this.add("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add("video:writer", content));
			}
			if (params.duration) this.add("video:duration", params.duration);
			if (params.release_date) this.add("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add("video:tag", content));
			}

			return this;
		} else if (type === "video.other") {
			if (params.actors) {
				params.actors.forEach((content) => this.add("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add("video:writer", content));
			}
			if (params.duration) this.add("video:duration", params.duration);
			if (params.release_date) this.add("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add("video:tag", content));
			}

			return this;
		} else if (type === "video.tv_show") {
			if (params.actors) {
				params.actors.forEach((content) => this.add("video:actor", content));
			}
			if (params.directors) {
				params.directors.forEach((content) => this.add("video:director", content));
			}
			if (params.writers) {
				params.writers.forEach((content) => this.add("video:writer", content));
			}
			if (params.duration) this.add("video:duration", params.duration);
			if (params.release_date) this.add("video:release_date", params.release_date);
			if (params.tags) {
				params.tags.forEach((content) => this.add("video:tag", content));
			}

			return this;
		} else if (type === "website") {
			return this;
		} else {
			throw new Error(`Unknown type: ${type}`);
		}
	}

	toValues(): MetadataValues {
		return this.#raw_values;
	}
	toElements() {
		const meta = values_to_elements(this.#raw_values);

		return meta;
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
