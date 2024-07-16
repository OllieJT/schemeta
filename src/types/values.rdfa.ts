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
	"og:music:duration": number;
	"og:music:album": OgMusicAlbum;
	"og:music:musician": URL;
	"og:music:song": OgMusicSong;
	"og:music:release_date": Date;
	"og:music:creator": URL;
	// type=video
	"og:video:actor": OgVideoActor;
	"og:video:director": URL;
	"og:video:duration": number;
	"og:video:release_date": Date;
	"og:video:tag": string;
	"og:video:series": URL;
	"og:video:writer": URL;
	// type=article
	"og:article:author": URL;
	"og:article:expiration_time": Date;
	"og:article:modified_time": Date;
	"og:article:published_time": Date;
	"og:article:section": string;
	"og:article:tag": string;
	// type=book
	"og:book:author": URL;
	"og:book:isbn": string;
	"og:book:release_date": Date;
	"og:book:tag": string;
	// type=profile
	"og:profile:first_name": string;
	"og:profile:gender": string;
	"og:profile:last_name": string;
	"og:profile:username": string;
};

export type ValueMap = PickArrayLike<
	Values,
	| "og:image"
	| "og:locale:alternate"
	| "og:music:album"
	| "og:music:musician"
	| "og:music:song"
	| "og:video:actor"
	| "og:video:director"
	| "og:video:tag"
	| "og:video:writer"
	| "og:article:author"
	| "og:article:tag"
	| "og:book:author"
	| "og:book:tag"
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
