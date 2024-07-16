import { PickArrayLike } from "$src/types/utility.js";

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

export type Values = {
	"application-name": string;
	title: string;
	description: string;
	canonical: URL;
	"theme-color": HexCode;

	// Microsoft
	"msapplication-allowDomainApiCalls": MsBoolean;
	"msapplication-allowDomainMetaTags": MsBoolean;
	"msapplication-badge": MsBadge;
	"msapplication-config": string;
	"msapplication-navbutton-color": HexCode;
	"msapplication-notification": MsNotification;
	"msapplication-square150x150logo": string;
	"msapplication-square310x310logo": string;
	"msapplication-square70x70logo": string;
	"msapplication-starturl": URL;
	"msapplication-task-separator": string;
	"msapplication-task": MsTask;
	"msapplication-TileColor": HexCode;
	"msapplication-TileImage": string;
	"msapplication-tooltip": string;
	"msapplication-wide310x150logo": string;
	"msapplication-window": MsWindow;

	// Twitter
	"twitter:card": TwitterCard;
	"twitter:creator": TwitterUsername;
	"twitter:description": string;
	"twitter:image": TwitterImage;
	"twitter:site": TwitterUsername;
	"twitter:title": string;
	"twitter:url": URL;
};

export type ValueMap = PickArrayLike<Values, "msapplication-task" | "twitter:image">;

export type Properties<
	Name extends string | undefined = string | undefined,
	Content extends string = string,
> = {
	charset?: "utf-8";
} & (Name extends string
	? {
			name: string;
			"http-equiv"?: never;
			content: Content;
		}
	: {
			name?: never;
			"http-equiv":
				| "content-security-policy"
				| "content-type"
				| "default-style"
				| "x-ua-compatible"
				| "refresh";
			content: string;
		});

export type Elements = Properties[];
