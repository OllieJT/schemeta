import { from_meta } from "./to-elements.from-meta.js";
import { from_rdfa } from "./to-elements.from-rdfa.js";
import { from_xml } from "./to-elements.from-xml.js";

export * from "./to-elements.types.js";

export const to_elements = { from_meta, from_xml, from_rdfa };
