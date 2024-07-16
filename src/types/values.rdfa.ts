import { PickArrayLike } from "$src/types/utility.js";

// OpenGraph Utility Types
type OgImage = {
	content: URL;
	alt?: string;
	width?: number;
	height?: number;
	type?: string;
	secure_url?: string;
};

type OgMusicSong = { content: URL; disc?: number; track?: number };
type OgMusicAlbum = { content: URL; disc?: number; track?: number };
type OgVideoActor = { content: URL; role?: string };
type OgType =
	| "article"
	| "book"
	| "music.song"
	| "music.album"
	| "music.playlist"
	| "music.radio_station"
	| "profile"
	| "video.episode"
	| "video.movie"
	| "video.other"
	| "video.tv_show"
	| "website";

export type Attributes = {
	// OpenGraph
	"og:site_name": { content: string };
	"og:determiner": { content: string };
	"og:title": { content: string };
	"og:description": { content: string };
	"og:image": { content: OgImage };
	"og:locale": { content: string };
	"og:locale:alternate": { content: string };
	"og:url": { content: URL };
	"og:audio": { content: URL };
	"og:video": { content: URL };

	// OpenGraph Types
	"og:type": { content: OgType };
	// type=music
	"music:duration": { content: number };
	"music:album": OgMusicAlbum;
	"music:musician": { content: URL };
	"music:song": OgMusicSong;
	"music:release_date": { content: Date };
	"music:creator": { content: URL };
	// type=video
	"video:actor": OgVideoActor;
	"video:director": { content: URL };
	"video:duration": { content: number };
	"video:release_date": { content: Date };
	"video:tag": { content: string };
	"video:series": { content: URL };
	"video:writer": { content: URL };
	// type=article
	"article:author": { content: URL };
	"article:expiration_time": { content: Date };
	"article:modified_time": { content: Date };
	"article:published_time": { content: Date };
	"article:section": { content: string };
	"article:tag": { content: string };
	// type=book
	"book:author": { content: URL };
	"book:isbn": { content: string };
	"book:release_date": { content: Date };
	"book:tag": { content: string };
	// type=profile
	"profile:first_name": { content: string };
	"profile:gender": { content: string };
	"profile:last_name": { content: string };
	"profile:username": { content: string };
};

export type ValueMap = PickArrayLike<
	Attributes,
	| "og:image"
	| "og:locale:alternate"
	| "music:album"
	| "music:musician"
	| "music:song"
	| "video:actor"
	| "video:director"
	| "video:tag"
	| "video:writer"
	| "article:author"
	| "article:tag"
	| "book:author"
	| "book:tag"
>;

export type Properties<Property extends string = string, Content extends string = string> = {
	property: Property;
	content: Content;
	about?: string;
	rel?: string;
	src?: string;
	href?: string;
	resource?: string;
	dataType?: string;
	typeof?: string;
};

export type Elements = Properties[];
