import { StupidType, Thing } from "schema-dts";
import { z } from "zod";

type LinkedData = Exclude<Thing, string | StupidType>;

export const ld_json = z.custom<LinkedData>(
	(data) => {
		if (typeof data !== "object") return false;
		else if ("@type"! in data && typeof data["@type"] !== "string") return false;
		else if (typeof data["@type"] !== "string") return false;
		else return true;
	},
	{
		fatal: true,
		message: "Invalid JSON Linked Data object. Expected an object containing @type property.",
	},
);
z.custom<LinkedData>(
	(data) => {
		if (!data) return false;
		else if (typeof data !== "object") return false;
		else if (Array.isArray(data)) return false;
		else return true;
	},
	{ fatal: true, message: "Expected an object representing a JSON-LD Thing." },
);
