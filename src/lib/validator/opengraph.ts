import { z } from "zod";

const image = z.object({
	src: z.string().url(),
	alt: z.string().optional(),
	width: z.number().optional(),
	height: z.number().optional(),
	secure_url: z.string().url().optional(),
	type: z.string().optional(),
});

const type = z.union([
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
]);

const music_album = z.object({
	album: z.string().url(),
	disc: z.number().transform(String).optional(),
	track: z.number().transform(String).optional(),
});

const music_song = z.object({
	song: z.string().url(),
	disc: z.number().optional(),
	track: z.number().optional(),
});

const video_actor = z.object({
	actor: z.string().url(),
	role: z.string().optional(),
});

export const opengraph = {
	image,
	type,
	music_album,
	music_song,
	video_actor,
};
