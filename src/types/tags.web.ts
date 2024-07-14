import type { LinkElement, MetaElement } from "./entity.js";

type ColorValue = `#${string}`;

export type Canonical = LinkElement<"canonical">;

export type Description = MetaElement<"name", "description">;
export type ThemeColor = MetaElement<"name", "theme-color", ColorValue>;
export type MsApplicationTileImage = MetaElement<"name", "msapplication-TileImage">;

/*
	<title>Content</title>
*/
