import { z } from "zod";

const username = z.custom<`@${string}`>(
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

const card = z.union([
	z.literal("summary"),
	z.literal("summary_large_image"),
	z.literal("app"),
	z.literal("player"),
]);

const image = z.object({
	src: z.string().url(),
	alt: z.string().optional(),
});

export const twitter = { username, card, image };
