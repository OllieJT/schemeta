import type { MetadataElement } from "$lib/types/entity.js";
import type { OpenGraph } from "$lib/types/tags.js";

type Song = {
	duration?: number;
	album?: {
		url: string;
		disc?: number;
		track?: number;
	};
	musician?: { url: string }[];
};
type Album = {
	song?: {
		url: string;
		disc?: number;
		track?: number;
	}[];
	musician?: { url: string };
	release_date?: Date;
};
type Playlist = {
	song?: {
		url: string;
		disc?: number;
		track?: number;
	}[];
	creator?: { url: string };
};

type RadioStation = {
	creator?: { url: string };
};

// Metadata

function song(data: Song): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "music.song" },
		} satisfies OpenGraph.Type,
	];

	if (data.duration) {
		elements.push({
			element: "meta",
			attributes: { property: "music:duration", content: data.duration },
		} satisfies OpenGraph.MusicDuration);
	}

	if (data.album) {
		elements.push({
			element: "meta",
			attributes: { property: "music:album", content: data.album.url },
		} satisfies OpenGraph.MusicAlbum);
		if (data.album.disc) {
			elements.push({
				element: "meta",
				attributes: { property: "music:album:disc", content: data.album.disc },
			} satisfies OpenGraph.MusicAlbumDisc);
		}
		if (data.album.track) {
			elements.push({
				element: "meta",
				attributes: { property: "music:album:track", content: data.album.track },
			} satisfies OpenGraph.MusicAlbumTrack);
		}
	}

	if (data.musician) {
		data.musician.forEach((musician) => {
			elements.push({
				element: "meta",
				attributes: { property: "music:musician", content: musician.url },
			} satisfies OpenGraph.MusicMusician);
		});
	}

	return elements;
}

function album(data: Album): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "music.album" },
		} satisfies OpenGraph.Type,
	];

	if (data.song) {
		data.song.forEach((song) => {
			elements.push({
				element: "meta",
				attributes: { property: "music:song", content: song.url },
			} satisfies OpenGraph.MusicSong);
			if (song.disc) {
				elements.push({
					element: "meta",
					attributes: { property: "music:song:disc", content: song.disc },
				} satisfies OpenGraph.MusicSongDisc);
			}
			if (song.track) {
				elements.push({
					element: "meta",
					attributes: { property: "music:song:track", content: song.track },
				} satisfies OpenGraph.MusicSongTrack);
			}
		});
	}

	if (data.musician) {
		elements.push({
			element: "meta",
			attributes: { property: "music:musician", content: data.musician.url },
		} satisfies OpenGraph.MusicMusician);
	}

	if (data.release_date) {
		elements.push({
			element: "meta",
			attributes: { property: "music:release_date", content: data.release_date.toISOString() },
		} satisfies OpenGraph.MusicReleaseDate);
	}

	return elements;
}

function playlist(data: Playlist): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "music.playlist" },
		} satisfies OpenGraph.Type,
	];

	if (data.song) {
		data.song.forEach((song) => {
			elements.push({
				element: "meta",
				attributes: { property: "music:song", content: song.url },
			} satisfies OpenGraph.MusicSong);
			if (song.disc) {
				elements.push({
					element: "meta",
					attributes: { property: "music:song:disc", content: song.disc },
				} satisfies OpenGraph.MusicSongDisc);
			}
			if (song.track) {
				elements.push({
					element: "meta",
					attributes: { property: "music:song:track", content: song.track },
				} satisfies OpenGraph.MusicSongTrack);
			}
		});
	}

	if (data.creator) {
		elements.push({
			element: "meta",
			attributes: { property: "music:creator", content: data.creator.url },
		} satisfies OpenGraph.MusicCreator);
	}

	return elements;
}

function radio_station(data: RadioStation): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "music.radio_station" },
		} satisfies OpenGraph.Type,
	];

	if (data.creator) {
		elements.push({
			element: "meta",
			attributes: { property: "music:creator", content: data.creator.url },
		} satisfies OpenGraph.MusicCreator);
	}

	return elements;
}

export const use_type_music = {
	song,
	album,
	playlist,
	radio_station,
};
