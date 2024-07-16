import { PickArrayLike } from "$src/lib/types.js";
import { ValueElement } from "$src/lib/values.types.js";
import { z } from "zod";

const hex_code = z.custom<`#${string}`>(
	(data) => {
		if (!data) return false;
		else if (typeof data !== "string") return false;
		else if (!data.startsWith("#")) return false;
		else if (data.length > 7) return false;
		else return true;
	},
	{
		fatal: true,
		message: "Invalid color value. Expected a HEX code like #000000 or #fff",
	},
);
const twitter_username = z.custom<`@${string}`>(
	(data) => {
		if (!data) return false;
		else if (typeof data !== "string") return false;
		else if (!data.startsWith("@")) return false;
		else if (data.length < 4) return false;
		else return true;
	},
	{
		fatal: true,
		message: "Invalid Twitter username. Expected a value like @username",
	},
);
const true_or_false = z.union([z.literal("true"), z.literal("false")]);
const msapplication_frequency = z.union([
	z.literal(30),
	z.literal(60),
	z.literal(360),
	z.literal(720),
	z.literal(1440),
]);

function msapplication_stringify(data: Record<string, string | number>) {
	return Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join(";");
}

export const option = {
	"application-name": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "application-name", content },
			}) satisfies ValueElement,
	),
	description: z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "description", content },
			}) satisfies ValueElement,
	),
	canonical: z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "link",
					attributes: { rel: "canonical", href: content },
				}) satisfies ValueElement,
		),
	"theme-color": hex_code.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "theme-color", content },
			}) satisfies ValueElement,
	),

	// Microsoft - msapplication:*
	"msapplication-allowDomainApiCalls": true_or_false.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-allowDomainApiCalls", content },
			}) satisfies ValueElement,
	),
	"msapplication-allowDomainMetaTags": true_or_false.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-allowDomainMetaTags", content },
			}) satisfies ValueElement,
	),
	"msapplication-badge": z
		.object({
			frequency: msapplication_frequency.optional(),
			"polling-uri": z.string(),
		})
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "msapplication-badge", content: msapplication_stringify(content) },
				}) satisfies ValueElement,
		),
	"msapplication-config": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-config", content },
			}) satisfies ValueElement,
	),
	"msapplication-navbutton-color": hex_code.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-navbutton-color", content },
			}) satisfies ValueElement,
	),
	"msapplication-notification": z
		.object({
			frequency: msapplication_frequency.optional(),
			cycle: z.number().min(0).max(7).optional(),
			"polling-uri": z.string().url(),
			"polling-uri2": z.string().url().optional(),
			"polling-uri3": z.string().url().optional(),
			"polling-uri4": z.string().url().optional(),
			"polling-uri5": z.string().url().optional(),
		})
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: {
						name: "msapplication-notification",
						content: msapplication_stringify(content),
					},
				}) satisfies ValueElement,
		),
	"msapplication-square150x150logo": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-square150x150logo", content },
			}) satisfies ValueElement,
	),
	"msapplication-square310x310logo": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-square310x310logo", content },
			}) satisfies ValueElement,
	),
	"msapplication-square70x70logo": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-square70x70logo", content },
			}) satisfies ValueElement,
	),
	"msapplication-starturl": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "msapplication-starturl", content },
				}) satisfies ValueElement,
		),
	"msapplication-task-separator": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-task-separator", content },
			}) satisfies ValueElement,
	),
	"msapplication-task": z
		.object({
			name: z.string(),
			"action-uri": z.string().url(),
			"icon-uri": z.string().url(),
			"window-type": z.union([z.literal("tab"), z.literal("self"), z.literal("window")]),
		})
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "msapplication-task", content: msapplication_stringify(content) },
				}) satisfies ValueElement,
		),
	"msapplication-TileColor": hex_code.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-TileColor", content },
			}) satisfies ValueElement,
	),
	"msapplication-TileImage": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-TileImage", content },
			}) satisfies ValueElement,
	),
	"msapplication-tooltip": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-tooltip", content },
			}) satisfies ValueElement,
	),
	"msapplication-wide310x150logo": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-wide310x150logo", content },
			}) satisfies ValueElement,
	),
	"msapplication-window": z.object({ width: z.number(), height: z.number() }).transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-window", content: msapplication_stringify(content) },
			}) satisfies ValueElement,
	),

	// Twitter - twitter:*
	"twitter:card": z
		.union([
			z.literal("summary"),
			z.literal("summary_large_image"),
			z.literal("app"),
			z.literal("player"),
		])
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "twitter:card", content },
				}) satisfies ValueElement,
		),
	"twitter:creator": twitter_username.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "twitter:creator", content },
			}) satisfies ValueElement,
	),
	"twitter:description": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "twitter:description", content },
			}) satisfies ValueElement,
	),
	"twitter:image": z
		.object({
			src: z.string().url(),
			alt: z.string().optional(),
		})
		.transform(
			(content) =>
				[
					{
						element: "meta",
						attributes: { name: "twitter:image", content: content.src },
					},
					content.alt && {
						element: "meta",
						attributes: { name: "twitter:image:alt", content: content.alt },
					},
				].filter(Boolean) as ValueElement[],
		),
	"twitter:site": twitter_username.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "twitter:site", content },
			}) satisfies ValueElement,
	),
	"twitter:title": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "twitter:title", content },
			}) satisfies ValueElement,
	),
	"twitter:url": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "twitter:url", content },
				}) satisfies ValueElement,
		),

	// Pinterest - pinterest:*
	pinterest: z.union([z.literal("nopin"), z.literal("nohover")]).transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "pinterest", content },
			}) satisfies ValueElement,
	),
	"pinterest-rich-pin": true_or_false.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "pinterest-rich-pin", content },
			}) satisfies ValueElement,
	),

	// Apple - apple-* | format-detection
	"apple-mobile-web-app-capable": z.union([z.literal("yes"), z.literal("no")]).transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "apple-mobile-web-app-capable", content },
			}) satisfies ValueElement,
	),
	"apple-mobile-web-app-status-bar-style": z
		.union([z.literal("default"), z.literal("black"), z.literal("black-translucent")])
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { name: "apple-mobile-web-app-status-bar-style", content },
				}) satisfies ValueElement,
		),
	"format-detection": z.literal("telephone=no").transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "format-detection", content },
			}) satisfies ValueElement,
	),
	"apple-touch-startup-image": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "link",
					attributes: { rel: "apple-touch-startup-image", href: content },
				}) satisfies ValueElement,
		),
	"apple-touch-icon": z.object({ href: z.string().url(), sizes: z.string() }).transform(
		(content) =>
			({
				element: "link",
				attributes: { rel: "apple-touch-icon", href: content.href, sizes: content.sizes },
			}) satisfies ValueElement,
	),
	"apple-mobile-web-app-title": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "apple-mobile-web-app-title", content },
			}) satisfies ValueElement,
	),

	// OpenGraph - og:*
	"og:site_name": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:site_name", content },
			}) satisfies ValueElement,
	),
	"og:determiner": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:determiner", content },
			}) satisfies ValueElement,
	),
	"og:title": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:title", content },
			}) satisfies ValueElement,
	),
	"og:description": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:description", content },
			}) satisfies ValueElement,
	),
	"og:image": z
		.object({
			src: z.string().url(),
			alt: z.string().optional(),
			width: z.number().optional(),
			height: z.number().optional(),
			secure_url: z.string().url().optional(),
			type: z.string().optional(),
		})
		.transform(
			(content) =>
				[
					{
						element: "meta",
						attributes: { property: "og:image", content: content.src },
					},
					content.alt && {
						element: "meta",
						attributes: { property: "og:image:alt", content: content.alt },
					},
					content.width && {
						element: "meta",
						attributes: { property: "og:image:width", content: content.width.toString() },
					},
					content.height && {
						element: "meta",
						attributes: { property: "og:image:height", content: content.height.toString() },
					},
					content.secure_url && {
						element: "meta",
						attributes: { property: "og:image:secure_url", content: content.secure_url },
					},
					content.type && {
						element: "meta",
						attributes: { property: "og:image:type", content: content.type },
					},
				].filter(Boolean) as ValueElement[],
		),
	"og:locale": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:locale", content },
			}) satisfies ValueElement,
	),
	"og:locale:alternate": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:locale:alternate", content },
			}) satisfies ValueElement,
	),
	"og:url": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "og:url", content },
				}) satisfies ValueElement,
		),
	"og:audio": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "og:audio", content },
				}) satisfies ValueElement,
		),
	"og:video": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "og:video", content },
				}) satisfies ValueElement,
		),
	"og:type": z
		.union([
			z.literal("article"),
			z.literal("book"),
			z.literal("music.song"),
			z.literal("music.album"),
			z.literal("music.playlist"),
			z.literal("music.radio_station"),
			z.literal("profile"),
			z.literal("video.episode"),
			z.literal("video.movie"),
			z.literal("video.other"),
			z.literal("video.tv_show"),
			z.literal("website"),
		])
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "og:type", content },
				}) satisfies ValueElement,
		),

	// OpenGraph type=music - music:*
	"music:duration": z
		.number()
		.transform(String)
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "music:duration", content },
				}) satisfies ValueElement,
		),
	"music:album": z
		.object({
			album: z.string().url(),
			album_disc: z.number().optional(),
			album_track: z.number().optional(),
		})
		.transform(
			(content) =>
				[
					{
						element: "meta",
						attributes: { property: "music:album", content: content.album },
					},
					content.album_disc && {
						element: "meta",
						attributes: { property: "music:album:disc", content: content.album_disc.toString() },
					},
					content.album_track && {
						element: "meta",
						attributes: { property: "music:album:track", content: content.album_track.toString() },
					},
				].filter(Boolean) as ValueElement[],
		),
	"music:musician": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "music:musician", content },
				}) satisfies ValueElement,
		),
	"music:song": z
		.object({
			song: z.string().url(),
			disc: z.number().optional(),
			track: z.number().optional(),
		})
		.transform(
			(content) =>
				[
					{
						element: "meta",
						attributes: { property: "music:song", content: content.song },
					},
					content.disc && {
						element: "meta",
						attributes: { property: "music:song:disc", content: content.disc.toString() },
					},
					content.track && {
						element: "meta",
						attributes: { property: "music:song:track", content: content.track.toString() },
					},
				].filter(Boolean) as ValueElement[],
		),

	"music:release_date": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "music:release_date", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"music:creator": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "music:creator", content },
				}) satisfies ValueElement,
		),

	// OpenGraph type=video - video:*
	"video:actor": z
		.object({
			actor: z.string().url(),
			role: z.string().optional(),
		})
		.transform(
			(content) =>
				[
					{
						element: "meta",
						attributes: { property: "video:actor", content: content.actor },
					},
					content.role && {
						element: "meta",
						attributes: { property: "video:actor:role", content: content.role },
					},
				].filter(Boolean) as ValueElement[],
		),
	"video:director": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "video:director", content },
				}) satisfies ValueElement,
		),
	"video:duration": z.object({ content: z.number().transform(String) }).transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "video:duration", content: content.content },
			}) satisfies ValueElement,
	),
	"video:release_date": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "video:release_date", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"video:tag": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "video:tag", content },
			}) satisfies ValueElement,
	),
	"video:series": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "video:series", content },
				}) satisfies ValueElement,
		),
	"video:writer": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "video:writer", content },
				}) satisfies ValueElement,
		),

	// OpenGraph type=article - article:*
	"article:author": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "article:author", content },
				}) satisfies ValueElement,
		),
	"article:expiration_time": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:expiration_time", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"article:modified_time": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:modified_time", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"article:published_time": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:published_time", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"article:section": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:section", content },
			}) satisfies ValueElement,
	),
	"article:tag": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:tag", content },
			}) satisfies ValueElement,
	),

	// OpenGraph type=book - book:*
	"book:author": z
		.string()
		.url()
		.transform(
			(content) =>
				({
					element: "meta",
					attributes: { property: "book:author", content },
				}) satisfies ValueElement,
		),
	"book:isbn": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "book:isbn", content },
			}) satisfies ValueElement,
	),
	"book:release_date": z.date().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "book:release_date", content: content.toISOString() },
			}) satisfies ValueElement,
	),
	"book:tag": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "book:tag", content },
			}) satisfies ValueElement,
	),

	// OpenGraph type=profile - profile
	"profile:first_name": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "profile:first_name", content },
			}) satisfies ValueElement,
	),
	"profile:gender": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "profile:gender", content },
			}) satisfies ValueElement,
	),
	"profile:last_name": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "profile:last_name", content },
			}) satisfies ValueElement,
	),
	"profile:username": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "profile:username", content },
			}) satisfies ValueElement,
	),
};

export type OptionInput = {
	[key in keyof typeof option]: z.input<(typeof option)[key]>;
};
export type OptionOutput = {
	[key in keyof typeof option]: z.output<(typeof option)[key]>;
};

export type Values = PickArrayLike<
	OptionOutput,
	| "msapplication-task"
	| "twitter:image"
	| "apple-touch-icon"
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
