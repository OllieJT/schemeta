import { PickArrayLike } from "$src/types/utility.js";

// OpenGraph Utility Types
type OgImage = {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
	type?: string;
	secure_url?: string;
};

type OgMusicSong = { href: URL; disc: number; track: number };
type OgMusicAlbum = { href: URL; disc: number; track: number };
type OgVideoActor = { href: URL; role: string };

export type Values = {
	// OpenGraph
	"og:site_name": string;
	"og:determiner": string;
	"og:title": string;
	"og:description": string;
	"og:image": OgImage;
	"og:locale": string;
	"og:locale:alternate": string;
	"og:url": URL;
	"og:audio": URL;
	"og:video": URL;
	// OpenGraph Types
	"og:type":
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

	// type=music
	"music:duration": number;
	"music:album": OgMusicAlbum;
	"music:musician": URL;
	"music:song": OgMusicSong;
	"music:release_date": Date;
	"music:creator": URL;
	// type=video
	"video:actor": OgVideoActor;
	"video:director": URL;
	"video:duration": number;
	"video:release_date": Date;
	"video:tag": string;
	"video:series": URL;
	"video:writer": URL;
	// type=article
	"article:author": URL;
	"article:expiration_time": Date;
	"article:modified_time": Date;
	"article:published_time": Date;
	"article:section": string;
	"article:tag": string;
	// type=book
	"book:author": URL;
	"book:isbn": string;
	"book:release_date": Date;
	"book:tag": string;
	// type=profile
	"profile:first_name": string;
	"profile:gender": string;
	"profile:last_name": string;
	"profile:username": string;
};

export type ValueMap = PickArrayLike<
	Values,
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
