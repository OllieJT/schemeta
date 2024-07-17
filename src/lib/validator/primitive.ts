import { z } from "zod";

export const hex_color = z.custom<`#${string}`>(
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

export const true_or_false = z.union([z.literal("true"), z.literal("false")]);

export const yes_or_no = z.union([z.literal("yes"), z.literal("no")]);

export const num_str = z.number().transform(String);

export const date_iso = z.date().transform((date) => date.toISOString());

export const color_scheme = z.union([z.literal("light"), z.literal("dark")]);
