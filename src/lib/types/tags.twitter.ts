import type { MetaElement } from "./entity.js";

export type CardValue = "summary" | "summary_large_image" | "app" | "player";
export type UsernameValue = `@${string}`;

export type Site = MetaElement<"name", "twitter:site", UsernameValue>;
export type Title = MetaElement<"name", "twitter:title">;
export type Description = MetaElement<"name", "twitter:description">;
export type Image = MetaElement<"name", "twitter:image">;
export type ImageAlt = MetaElement<"name", "twitter:image:alt">;
export type Card = MetaElement<"name", "twitter:card", CardValue>;
export type Creator = MetaElement<"name", "twitter:creator", UsernameValue>;
export type Url = MetaElement<"name", "twitter:url">;
