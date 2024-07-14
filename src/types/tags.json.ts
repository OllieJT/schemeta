import { ScriptElement } from "$src/types/entity.js";
import { StupidType, Thing } from "schema-dts";

export type LinkedDataValue = Exclude<Thing, string | StupidType>;

export type LD = ScriptElement<"application/ld+json", LinkedDataValue>;
