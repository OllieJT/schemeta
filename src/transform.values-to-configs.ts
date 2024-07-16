import { ValueMap } from "$src/types/value-map.js";

type BaseConfig = {
	element: string;
	type: "name" | "property" | "rel" | "type";
};

const base = {
	msapplication: { element: "meta", type: "name" },
	og: { element: "meta", type: "property" },
	twitter: { element: "meta", type: "name" },
} satisfies Record<string, BaseConfig>;

const base_config = {
	"application-name": base.og,
	canonical: { element: "link", type: "rel" },
	description: { element: "meta", type: "name" },
	"theme-color": { element: "meta", type: "name" },
	title: { element: "title", type: "name" },

	"msapplication-allowDomainApiCalls": base.msapplication,
	"msapplication-allowDomainMetaTags": base.msapplication,
	"msapplication-badge": base.msapplication,
	"msapplication-config": base.msapplication,
	"msapplication-navbutton-color": base.msapplication,
	"msapplication-notification": base.msapplication,
	"msapplication-square150x150logo": base.msapplication,
	"msapplication-square310x310logo": base.msapplication,
	"msapplication-square70x70logo": base.msapplication,
	"msapplication-starturl": base.msapplication,
	"msapplication-task-separator": base.msapplication,
	"msapplication-task": base.msapplication,
	"msapplication-TileColor": base.msapplication,
	"msapplication-TileImage": base.msapplication,
	"msapplication-tooltip": base.msapplication,
	"msapplication-wide310x150logo": base.msapplication,
	"msapplication-window": base.msapplication,

	"twitter:card": base.twitter,
	"twitter:creator": base.twitter,
	"twitter:description": base.twitter,
	"twitter:image": base.twitter,
	"twitter:site": base.twitter,
	"twitter:title": base.twitter,
	"twitter:url": base.twitter,

	"og:article:author": base.og,
	"og:article:expiration_time": base.og,
	"og:article:modified_time": base.og,
	"og:article:published_time": base.og,
	"og:article:section": base.og,
	"og:article:tag": base.og,
	"og:audio": base.og,
	"og:book:author": base.og,
	"og:book:isbn": base.og,
	"og:book:release_date": base.og,
	"og:book:tag": base.og,
	"og:description": base.og,
	"og:determiner": base.og,
	"og:image": base.og,
	"og:locale:alternate": base.og,
	"og:locale": base.og,
	"og:music:album": base.og,
	"og:music:creator": base.og,
	"og:music:duration": base.og,
	"og:music:musician": base.og,
	"og:music:release_date": base.og,
	"og:music:song": base.og,
	"og:profile:first_name": base.og,
	"og:profile:gender": base.og,
	"og:profile:last_name": base.og,
	"og:profile:username": base.og,
	"og:site_name": base.og,
	"og:title": base.og,
	"og:type": base.og,
	"og:url": base.og,
	"og:video:actor": base.og,
	"og:video:director": base.og,
	"og:video:duration": base.og,
	"og:video:release_date": base.og,
	"og:video:series": base.og,
	"og:video:tag": base.og,
	"og:video:writer": base.og,
	"og:video": base.og,
	"application/ld+json": { element: "script", type: "type" },
} satisfies {
	[Key in keyof ValueMap]: BaseConfig;
};

export type ConfigMap = {
	[Key in keyof ValueMap]: {
		element: (typeof base_config)[Key]["element"];
		type: (typeof base_config)[Key]["type"];
		attributes?: ValueMap[Key] extends object[] ? ValueMap[Key][number] : ValueMap[Key];
		children?: object;
	};
};

export function values_to_configs(values: Partial<ValueMap>) {
	let config_map: Partial<ConfigMap> = {};

	const keys = Object.keys(values) as (keyof ValueMap)[];

	keys.forEach((key) => {
		const base = base_config[key];
		const value = values[key];
		if (!value) return;

		if (Array.isArray(value)) {
			value.forEach((v) => {
				config_map = {
					...config_map,
					[key]: {
						element: base.element,
						type: base.type,
						attributes: v,
					},
				};
			});
		} else {
			config_map = {
				...config_map,
				[key]: {
					element: base.element,
					type: base.type,
					attributes: value,
				},
			};
		}
	});

	return config_map;
}
