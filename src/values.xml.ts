import { PickArrayLike } from "$src/types/utility.js";
import { ValueElement } from "$src/values.types.js";
import { StupidType, Thing } from "schema-dts";
import { z } from "zod";

type LinkedData = Exclude<Thing, string | StupidType>;

export const option = {
	title: z.string().transform(
		(children) =>
			({
				element: "title",
				attributes: {},
				children,
			}) satisfies ValueElement,
	),
	"application/ld+json": z
		.custom<LinkedData>(
			(data) => {
				if (!data) return false;
				else if (typeof data !== "object") return false;
				else if (Array.isArray(data)) return false;
				else return true;
			},
			{ fatal: true, message: "Expected an object representing a JSON-LD Thing." },
		)
		.transform(
			(children) =>
				({
					element: "script",
					attributes: {},
					children: JSON.stringify(children),
				}) satisfies ValueElement,
		),
};

export type OptionInput = {
	[key in keyof typeof option]: z.input<(typeof option)[key]>;
};
export type OptionOutput = {
	[key in keyof typeof option]: z.output<(typeof option)[key]>;
};

export type Values = PickArrayLike<OptionOutput, "application/ld+json">;
