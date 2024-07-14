import type { MetaElement } from "./entity.js";

export type OpenGraphTypeValue =
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

export type Title = MetaElement<"property", "og:title">;
export type Description = MetaElement<"property", "og:description">;
export type Type = MetaElement<"property", "og:type", OpenGraphTypeValue>;
export type Url = MetaElement<"property", "og:url">;
export type Audio = MetaElement<"property", "og:audio">;
export type Determiner = MetaElement<"property", "og:determiner">;
export type Locale = MetaElement<"property", "og:locale">;
export type LocaleAlternate = MetaElement<"property", "og:locale:alternate">;
export type SiteName = MetaElement<"property", "og:site_name">;
export type Video = MetaElement<"property", "og:video">;

// image
export type Image = MetaElement<"property", "og:image">;
export type ImageAlt = MetaElement<"property", "og:image:alt">;
export type ImageWidth = MetaElement<"property", "og:image:width">;
export type ImageHeight = MetaElement<"property", "og:image:height">;
export type ImageType = MetaElement<"property", "og:image:type">;
export type ImageSecureUrl = MetaElement<"property", "og:image:secure_url">;

// music
export type MusicDuration = MetaElement<"property", "music:duration", number>;
export type MusicAlbum = MetaElement<"property", "music:album">;
export type MusicAlbumDisc = MetaElement<"property", "music:album:disc", number>;
export type MusicAlbumTrack = MetaElement<"property", "music:album:track", number>;
export type MusicMusician = MetaElement<"property", "music:musician">;
export type MusicSong = MetaElement<"property", "music:song">;
export type MusicSongDisc = MetaElement<"property", "music:song:disc", number>;
export type MusicSongTrack = MetaElement<"property", "music:song:track", number>;
export type MusicReleaseDate = MetaElement<"property", "music:release_date">;
export type MusicCreator = MetaElement<"property", "music:creator">;

// video
export type VideoActor = MetaElement<"property", "video:actor">;
export type VideoActorRole = MetaElement<"property", "video:actor:role">;
export type VideoDirector = MetaElement<"property", "video:director">;
export type VideoDuration = MetaElement<"property", "video:duration", number>;
export type VideoReleaseDate = MetaElement<"property", "video:release_date">;
export type VideoTag = MetaElement<"property", "video:tag">;
export type VideoSeries = MetaElement<"property", "video:series">;
export type VideoWriter = MetaElement<"property", "video:writer">;

// article
export type ArticleAuthor = MetaElement<"property", "article:author">;
export type ArticleExpirationTime = MetaElement<"property", "article:expiration_time">;
export type ArticleModifiedTime = MetaElement<"property", "article:modified_time">;
export type ArticlePublishedTime = MetaElement<"property", "article:published_time">;
export type ArticleSection = MetaElement<"property", "article:section">;
export type ArticleTag = MetaElement<"property", "article:tag">;

// book
export type BookAuthor = MetaElement<"property", "book:author">;
export type BookIsbn = MetaElement<"property", "book:isbn">;
export type BookReleaseDate = MetaElement<"property", "book:release_date">;
export type BookTag = MetaElement<"property", "book:tag">;

// profile
export type ProfileFirstName = MetaElement<"property", "profile:first_name">;
export type ProfileGender = MetaElement<"property", "profile:gender">;
export type ProfileLastName = MetaElement<"property", "profile:last_name">;
export type ProfileUsername = MetaElement<"property", "profile:username">;
