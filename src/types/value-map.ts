import { StupidType, Thing } from "schema-dts";

type HexCode = `#${string}`;

// Microsoft Utility Types
type MsBoolean = "true" | "false";
type MsFrequency = 30 | 60 | 360 | 720 | 1440;
type MsCycle = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
type MsWindow = { width: number; height: number };
type MsTask = {
	name: string;
	"action-uri": string;
	"icon-uri": string;
	"window-type": "tab" | "self" | "window";
};
type MsNotification = {
	frequency?: MsFrequency;
	cycle?: MsCycle;
	"polling-uri": string;
	"polling-uri2"?: string;
	"polling-uri3"?: string;
	"polling-uri4"?: string;
	"polling-uri5"?: string;
};
type MsBadge = { frequency?: MsFrequency; "polling-uri": string };

// Twitter Utility Types
type TwitterCard = "summary" | "summary_large_image" | "app" | "player";
type TwitterUsername = `@${string}`;
type TwitterImage = { src: string; alt?: string };

// OpenGraph Utility Types
type OgImage = {
	src: string;
	alt?: string;
	width?: number;
	height?: number;
	type?: string;
	secure_url?: string;
};

export type ValueMap = {
	"application-name": { content: string };
	title: Record<string, unknown>;
	description: { content: string };
	canonical: { href: URL };
	"theme-color": { content: `#${string}` };

	// Microsoft
	"msapplication-allowDomainApiCalls": { content: MsBoolean };
	"msapplication-allowDomainMetaTags": { content: MsBoolean };
	"msapplication-badge": { content: MsBadge };
	"msapplication-config": { content: string };
	"msapplication-navbutton-color": { content: HexCode };
	"msapplication-notification": { content: MsNotification };
	"msapplication-square150x150logo": { content: string };
	"msapplication-square310x310logo": { content: string };
	"msapplication-square70x70logo": { content: string };
	"msapplication-starturl": { href: URL };
	"msapplication-task-separator": { content: string };
	"msapplication-task": { content: MsTask }[];
	"msapplication-TileColor": { content: HexCode };
	"msapplication-TileImage": { content: string };
	"msapplication-tooltip": { content: string };
	"msapplication-wide310x150logo": { content: string };
	"msapplication-window": { content: MsWindow };

	// Twitter
	"twitter:card": { content: TwitterCard };
	"twitter:creator": { content: TwitterUsername };
	"twitter:description": { content: string };
	"twitter:image": { content: TwitterImage }[];
	"twitter:site": { content: TwitterUsername };
	"twitter:title": { content: string };
	"twitter:url": { content: URL };

	// OpenGraph
	"og:site_name": { content: string };
	"og:determiner": { content: string };
	"og:title": { content: string };
	"og:description": { content: string };
	"og:image": { content: OgImage }[];
	"og:locale": { content: string };
	"og:locale:alternate": { content: string }[];
	"og:url": { content: URL };

	"og:audio": { content: URL };
	"og:video": { content: URL };

	"og:type": {
		content:
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
	};

	// type=music
	"og:music:duration": { content: number };
	"og:music:album": { content: URL; disc: number; track: number }[];
	"og:music:musician": { content: URL }[];
	"og:music:song": { content: URL; disc: number; track: number }[];
	"og:music:release_date": { content: Date };
	"og:music:creator": { content: URL };

	// type=video
	"og:video:actor": { content: URL; role: string }[];
	"og:video:director": { content: URL }[];
	"og:video:duration": { content: number };
	"og:video:release_date": { content: Date };
	"og:video:tag": { content: string }[];
	"og:video:series": { content: URL };
	"og:video:writer": { content: URL }[];

	// type=article
	"og:article:author": { content: URL }[];
	"og:article:expiration_time": { content: Date };
	"og:article:modified_time": { content: Date };
	"og:article:published_time": { content: Date };
	"og:article:section": { content: string };
	"og:article:tag": { content: string }[];

	// type=book
	"og:book:author": { content: URL }[];
	"og:book:isbn": { content: string };
	"og:book:release_date": { content: Date };
	"og:book:tag": { content: string }[];

	// type=profile
	"og:profile:first_name": { content: string };
	"og:profile:gender": { content: string };
	"og:profile:last_name": { content: string };
	"og:profile:username": { content: string };

	"application/ld+json": { content: Exclude<Thing, string | StupidType> }[];
};
