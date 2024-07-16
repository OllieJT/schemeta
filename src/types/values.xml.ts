import { PickArrayLike } from "$src/types/utility.js";
import { StupidType, Thing } from "schema-dts";

// JSON-LD Utility Types
type LinkedData = Exclude<Thing, string | StupidType>;

export type Attributes = {
	title: string;
	schema: LinkedData;
};

export type ValueMap = PickArrayLike<Attributes, "schema">;

export type Properties = {
	type: null | `application/ld+json`;
};

export type Elements = Properties[];
