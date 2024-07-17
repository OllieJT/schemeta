import { z } from "zod";

function stringify_options(data: Record<string, string | number>) {
	return Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join(";");
}

const frequency = z.union([
	z.literal(30),
	z.literal(60),
	z.literal(360),
	z.literal(720),
	z.literal(1440),
]);

const badge = z
	.object({
		frequency: frequency.optional(),
		"polling-uri": z.string(),
	})
	.transform(stringify_options);

const notification = z
	.object({
		frequency: frequency.optional(),
		cycle: z.number().min(0).max(7).optional(),
		"polling-uri": z.string().url(),
		"polling-uri2": z.string().url().optional(),
		"polling-uri3": z.string().url().optional(),
		"polling-uri4": z.string().url().optional(),
		"polling-uri5": z.string().url().optional(),
	})
	.transform(stringify_options);

const task = z
	.object({
		name: z.string(),
		"action-uri": z.string().url(),
		"icon-uri": z.string().url(),
		"window-type": z.union([z.literal("tab"), z.literal("self"), z.literal("window")]),
	})
	.transform(stringify_options);

const window = z.object({ width: z.number(), height: z.number() }).transform(stringify_options);

export const msapplication = {
	badge,
	notification,
	task,
	window,
};
