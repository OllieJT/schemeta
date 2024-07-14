import { element_to_html } from "$src/transform.js";
import type { MetadataElement } from "./types/tags.js";
import {
	use_canonical,
	use_description,
	use_image,
	use_site,
	use_title,
	use_twitter,
	use_type_article,
	use_type_book,
	use_type_music,
	use_type_profile,
	use_type_video,
	use_type_website,
} from "./use.js";

export class Metadata {
	#elements = new Set<MetadataElement>([]);

	constructor(initialElements?: MetadataElement[]) {
		this.#elements = new Set(initialElements ?? []);
	}

	// use_title
	title(params: Parameters<typeof use_title>[0]) {
		use_title(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_canonical,
	canonical(params: Parameters<typeof use_canonical>[0]) {
		use_canonical(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_description,
	description(params: Parameters<typeof use_description>[0]) {
		use_description(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_image,
	image(params: Parameters<typeof use_image>[0]) {
		use_image(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_site,
	site(params: Parameters<typeof use_site>[0]) {
		use_site(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_twitter,
	twitter(params: Parameters<typeof use_twitter>[0]) {
		use_twitter(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	type({
		type,
		params,
	}:
		| { type: "article"; params: Parameters<typeof use_type_article>[0] }
		| { type: "book"; params: Parameters<typeof use_type_book>[0] }
		| { type: "music.song"; params: Parameters<typeof use_type_music.song>[0] }
		| { type: "music.album"; params: Parameters<typeof use_type_music.album>[0] }
		| { type: "music.playlist"; params: Parameters<typeof use_type_music.playlist>[0] }
		| { type: "music.radio_station"; params: Parameters<typeof use_type_music.radio_station>[0] }
		| { type: "profile"; params: Parameters<typeof use_type_profile>[0] }
		| { type: "video.episode"; params: Parameters<typeof use_type_video.episode>[0] }
		| { type: "video.movie"; params: Parameters<typeof use_type_video.movie>[0] }
		| { type: "video.other"; params: Parameters<typeof use_type_video.other>[0] }
		| { type: "video.tv_show"; params: Parameters<typeof use_type_video.tv_show>[0] }
		| { type: "website"; params?: never }) {
		if (type === "article") {
			use_type_article(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "book") {
			use_type_book(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "music.song") {
			use_type_music.song(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "music.album") {
			use_type_music.album(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "music.playlist") {
			use_type_music.playlist(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "music.radio_station") {
			use_type_music.radio_station(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "profile") {
			use_type_profile(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "video.episode") {
			use_type_video.episode(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "video.movie") {
			use_type_video.movie(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "video.other") {
			use_type_video.other(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "video.tv_show") {
			use_type_video.tv_show(params).forEach((element) => this.#elements.add(element));
			return this;
		} else if (type === "website") {
			use_type_website().forEach((element) => this.#elements.add(element));
			return this;
		} else {
			throw new Error(`Unknown type: ${type}`);
		}
	}

	add(element: MetadataElement) {
		this.#elements.add(element);
		return this;
	}

	get() {
		return Array.from(this.#elements);
	}

	toString() {
		return JSON.stringify(Array.from(this.#elements), null, 2);
	}

	toHTML() {
		return Array.from(this.#elements)
			.map((el) => element_to_html(el))
			.join("\n");
	}
}

const meta = new Metadata();

meta.title("123").type({ type: "website" }).description("456");
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
