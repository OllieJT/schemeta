import { ValueMap } from "$src/types/value-map.js";
import { Graph } from "schema-dts";

export function script_to_graph(elements: ValueMap["application/ld+json"]) {
	const things = elements.map((el) => el.content);

	const graph = JSON.stringify({
		"@context": "https://schema.org",
		"@graph": things,
	} satisfies Graph);

	return `<script type="application/ld+json">${graph}</script>`;
}
