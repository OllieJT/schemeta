import { z } from "zod";

const status_bar_style = z.union([
	z.literal("default"),
	z.literal("black"),
	z.literal("black-translucent"),
]);

const touch_icon = z.object({ href: z.string().url(), sizes: z.string() });

export const apple = {
	status_bar_style,
	touch_icon,
};
