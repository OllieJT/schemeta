import { PickArrayLike } from "$src/types/utility.js";
import { StupidType, Thing } from "schema-dts";

// JSON-LD Utility Types
type LinkedData = Exclude<Thing, string | StupidType>;

export type Values = {
	title: string;
	schema: LinkedData;
};

export type ValueMap = PickArrayLike<Values, "schema">;

export type Properties = {
	type: null | `application/ld+json`;
};

export type Elements = Properties[];
