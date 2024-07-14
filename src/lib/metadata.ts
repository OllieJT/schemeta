import { element_to_html } from "$lib/transform.js";
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

	// use_type_article,
	type_article(params: Parameters<typeof use_type_article>[0]) {
		use_type_article(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_type_book,
	type_book(params: Parameters<typeof use_type_book>[0]) {
		use_type_book(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_type_music,
	type_music_song(params: Parameters<typeof use_type_music.song>[0]) {
		use_type_music.song(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_music_album(params: Parameters<typeof use_type_music.album>[0]) {
		use_type_music.album(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_music_playlist(params: Parameters<typeof use_type_music.playlist>[0]) {
		use_type_music.playlist(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_music_radio_station(params: Parameters<typeof use_type_music.radio_station>[0]) {
		use_type_music.radio_station(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_type_profile,
	type_profile(params: Parameters<typeof use_type_profile>[0]) {
		use_type_profile(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_type_video,
	type_video_episode(params: Parameters<typeof use_type_video.episode>[0]) {
		use_type_video.episode(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_video_movie(params: Parameters<typeof use_type_video.movie>[0]) {
		use_type_video.movie(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_video_other(params: Parameters<typeof use_type_video.other>[0]) {
		use_type_video.other(params).forEach((element) => this.#elements.add(element));
		return this;
	}
	type_video_tv_show(params: Parameters<typeof use_type_video.tv_show>[0]) {
		use_type_video.tv_show(params).forEach((element) => this.#elements.add(element));
		return this;
	}

	// use_type_website
	type_website() {
		use_type_website().forEach((element) => this.#elements.add(element));
		return this;
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

