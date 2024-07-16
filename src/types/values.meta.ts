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

export type Attributes = {
	"application-name": { content: string };
	title: { content: string };
	description: { content: string };
	canonical: { content: URL };
	"theme-color": { content: HexCode };

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
	"msapplication-starturl": { content: URL };
	"msapplication-task-separator": { content: string };
	"msapplication-task": { content: MsTask };
	"msapplication-TileColor": { content: HexCode };
	"msapplication-TileImage": { content: string };
	"msapplication-tooltip": { content: string };
	"msapplication-wide310x150logo": { content: string };
	"msapplication-window": { content: MsWindow };

	// Twitter
	"twitter:card": { content: TwitterCard };
	"twitter:creator": { content: TwitterUsername };
	"twitter:description": { content: string };
	"twitter:image": { content: TwitterImage };
	"twitter:site": { content: TwitterUsername };
	"twitter:title": { content: string };
	"twitter:url": { content: URL };

	// Pinterest
	pinterest: { content: "nopin" | "nohover"; description: "nopin" };
	"pinterest-rich-pin": "true" | "false";

	// Apple
	"apple-mobile-web-app-capable": "yes" | "no";
	"apple-mobile-web-app-status-bar-style": "default" | "black" | "black-translucent";
	"format-detection": "telephone=no";
	"apple-touch-startup-image": { href: string };
	"apple-touch-icon": { href: string; sizes: string }; // TODO: Link
	"apple-mobile-web-app-title": { content: string };
};

export type ValueMap = PickArrayLike<
	Attributes,
	"msapplication-task" | "twitter:image" | "apple-touch-icon"
>;

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
			description?: string;
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
			description?: string;
		});

export type Elements = Properties[];
