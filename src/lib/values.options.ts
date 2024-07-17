import {
	apple,
	color_scheme,
	date_iso,
	hex_color,
	msapplication,
	num_str,
	opengraph,
	true_or_false,
	twitter,
	yes_or_no,
} from "$src/lib/validator/index.js";
import { ValueElement } from "$src/lib/values.types.js";
import { StupidType, Thing } from "schema-dts";
import { z } from "zod";

type LinkedData = Exclude<Thing, string | StupidType>;

export const value_option = {
	title: z.string().transform(
		(children) =>
			({
				element: "title",
				attributes: {},
				children,
			}) satisfies ValueElement,
	),
	bookmark: z.string().transform(
		(content) =>
			({
				element: "link",
				attributes: { rel: "bookmark", href: content },
			}) satisfies ValueElement,
	),
	"application/ld+json": z
		.custom<LinkedData>(
			(data) => {
				if (!data) return false;
				else if (typeof data !== "object") return false;
				else if (Array.isArray(data)) return false;
				else if ("@type"! in data && typeof data["@type"] !== "string") return false;
				else if (typeof data["@type"] !== "string") return false;
				else return true;
			},
			{ fatal: true, message: "Expected an object representing a JSON-LD Thing." },
		)
		.transform(
			(children) =>
				({
					element: "script",
					attributes: {},
					children: `\n\t${JSON.stringify(children)}\n`,
				}) satisfies ValueElement,
		),
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
	"theme-color": hex_color.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "theme-color", content },
			}) satisfies ValueElement,
	),
	"color-scheme": color_scheme.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "color-scheme", content },
			}) satisfies ValueElement,
	),
	"format-detection": z.literal("telephone=no").transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "format-detection", content },
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
	"msapplication-badge": msapplication.badge.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-badge", content },
			}) satisfies ValueElement,
	),
	"msapplication-config": z.string().transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-config", content },
			}) satisfies ValueElement,
	),
	"msapplication-navbutton-color": hex_color.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-navbutton-color", content },
			}) satisfies ValueElement,
	),
	"msapplication-notification": msapplication.notification.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-notification", content },
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
	"msapplication-task": msapplication.task.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-task", content: content },
			}) satisfies ValueElement,
	),
	"msapplication-TileColor": hex_color.transform(
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
	"msapplication-window": msapplication.window.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "msapplication-window", content },
			}) satisfies ValueElement,
	),

	// Twitter - twitter:*
	"twitter:card": twitter.card.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "twitter:card", content },
			}) satisfies ValueElement,
	),
	"twitter:creator": twitter.username.transform(
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
	"twitter:image": twitter.image.transform(
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
	"twitter:site": twitter.username.transform(
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

	// Apple - apple-*
	"apple-mobile-web-app-capable": yes_or_no.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "apple-mobile-web-app-capable", content },
			}) satisfies ValueElement,
	),
	"apple-mobile-web-app-status-bar-style": apple.status_bar_style.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "apple-mobile-web-app-status-bar-style", content },
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
	"apple-touch-icon": apple.touch_icon.transform(
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
	"apple-touch-fullscreen": yes_or_no.transform(
		(content) =>
			({
				element: "meta",
				attributes: { name: "apple-touch-fullscreen", content },
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
	"og:image": opengraph.image.transform(
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
	"og:type": opengraph.type.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "og:type", content },
			}) satisfies ValueElement,
	),

	// OpenGraph type=music - music:*
	"music:duration": num_str.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "music:duration", content },
			}) satisfies ValueElement,
	),
	"music:album": opengraph.music_album.transform(
		(content) =>
			[
				{
					element: "meta",
					attributes: { property: "music:album", content: content.album },
				},
				content.disc && {
					element: "meta",
					attributes: { property: "music:album:disc", content: content.disc },
				},
				content.track && {
					element: "meta",
					attributes: { property: "music:album:track", content: content.track },
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
	"music:song": opengraph.music_song.transform(
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

	"music:release_date": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "music:release_date", content },
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
	"video:actor": opengraph.video_actor.transform(
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
	"video:duration": num_str.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "video:duration", content },
			}) satisfies ValueElement,
	),
	"video:release_date": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "video:release_date", content },
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
	"article:expiration_time": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:expiration_time", content },
			}) satisfies ValueElement,
	),
	"article:modified_time": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:modified_time", content },
			}) satisfies ValueElement,
	),
	"article:published_time": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "article:published_time", content },
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
	"book:release_date": date_iso.transform(
		(content) =>
			({
				element: "meta",
				attributes: { property: "book:release_date", content },
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
	[key in keyof typeof value_option]: z.input<(typeof value_option)[key]>;
};
export type OptionOutput = {
	[key in keyof typeof value_option]: z.output<(typeof value_option)[key]>;
};
