<p align="center">
 <img src="https://github.com/OllieJT/schemeta/blob/main/static/banner.png?raw=true" width="676" height="288" alt="sche/ma in a pixelated monospaced font, on a blue-green glowing background">
</p>

<h1 align="center">
 	Schemeta
</h1>

<p align="center">
  Schemeta streamlines & simplifies the creation of web metadata,<br />
  making it easier to leverage standards such as <a href="https://ogp.me">OpenGraph</a>, and <a href="https://json-ld.org">JSON-LD</a>.
</p>

<div align="center">

[![NPM Version][npm-version-img]][npm-url] [![Downloads][npm-downloads-img]][npm-url] [![GitHub Stars][github-stars-img]][github-url]

</div>

- [Why does this exist?](#why-does-this-exist)
- [Features](#features)
- [Supported Metadata](#supported-metadata)
- [Overview](#overview)
  - [Define Data](#define-data)
  - [Render meta-tags on the server (optional)](#render-meta-tags-on-the-server-optional)
    - [Server](#server)
    - [Option 1: Render HTML on the client](#option-1-render-html-on-the-client)
    - [Option 2: Initialize Metadata on the client](#option-2-initialize-metadata-on-the-client)
- [Setup](#setup)
  - [Installation](#installation)
- [API](#api)
  - [`Metadata` Instance](#metadata-instance)
    - [Add values](#add-values)
    - [Render elements](#render-elements)
  - [Undocumented](#undocumented)
- [Examples](#examples)
  - [Vanilla Example](#vanilla-example)
  - [SvelteKit Example](#sveltekit-example)
  - [React Example](#react-example)

## Why does this exist?

You might be thinking, why does this exist? You're not crazy. Metadata is simple, repeatable, and boring. It's exactly this kind of boilerplate that I want to avoid in my work, and the kind of task that is easily overlooked while prioritising more unique tasks.

Schemeta was created to codify the building of metadata for a page, or site. Much like how frameworks impose a concise and repeatable structure to rabidly scaffold the common needs of projects - Schemeta provides a universal type-safe solution for making the most out of tags.

Finally, there are many metadata specifications, and values that are overlooked or skipped; like JSON-LD, or Apple Web-App tags. With type-safe methods, I hope it will be easier for consumers of this package to disover new ways to express their data to support their users, or promote their content.

## Features

- 🥫 Open Source
- 💠 Framework Agnostic
- ✅ Works in server & on the client
- 🙅‍♂️ No runtime dependensies
- 🟦 Typescript Support
- ⛓️ Convenient optional-chaining API

## Supported Metadata

> [!NOTE]
> Are we missing any? [file an issue](https://github.com/OllieJT/schemeta/issues) to let us know.

| Source    | Type                                                                       | Details                                                                                                                                                                                                                                                                                                                             |
| --------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenGraph | [RDFa](https://en.wikipedia.org/wiki/RDFa)                                 | [The Open Graph protocol](https://ogp.me)                                                                                                                                                                                                                                                                                           |
| SchemaOrg | [JSON-LD](https://json-ld.org)                                             | [Schema.Org](https://schema.org/docs/schemas.html)                                                                                                                                                                                                                                                                                  |
| Microsoft | [Metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) | [Windows Pinned Sites](<https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn255024(v=vs.85)>)                                                                                                                                                                                |
| Twitter   | [Metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) | [Twitter Cards](https://developer.x.com/en/docs/twitter-for-websites/cards/guides/getting-started)                                                                                                                                                                                                                                  |
| Apple     | [Metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) | [Safari MetaTags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html) + [Apple Web Apps](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) |
| Pinterest | [Metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) | [developers.pinterest.com](https://developers.pinterest.com/docs/web-features/rich-pins-overview/)                                                                                                                                                                                                                                  |

## Overview

### Define Data

At it's core, schemeta exposes a class that can be used to define the metadata for a page. Schemeta will automatically handle overriding values that are only expected once (like the page title) or appending values that can appear several times (like images).

```js
import { Metadata } from "schemeta";

// Create an instance of Metadata
const metadata = new Metadata();

// Apply your data
metadata
	.title("Ollie's Profile")
	.description("Get to know the developer behind this project.")
	.type({
		type: "profile",
		params: { first_name: "Ollie", last_name: "Taylor", username: "OllieJT" },
	});

// Easily append values
if (page.profile.photo) {
	metadata.image({ src: page.profile.photo, alt: page.profile.photo_alt });
}
if (page.profile.avatar) {
	metadata.image({ src: page.profile.avatar, alt: page.profile.avatar_alt });
}
```

### Render meta-tags on the server (optional)

The metadata can be defined on the server before transforming the data into a useable format.

The way you render meta-tags will likely vary based on your framework. We'll use a simple vanilla-js example, but you can find more [examples](#examples) below.

#### Server

```js
import { Metadata } from "schemeta";

const metadata = new Metadata()
	.title("My Server-Rendered App")
	.url("https://github.com/olliejt/schemeta");

// Option 1: Send HTML code to the client
const html = metadata.toString();

// Option 2: Send values to initialize Metadata on the client
const values = metadata.toValues();

res.send({ html, values });
```

#### Option 1: Render HTML on the client

```js
import { Metadata } from "schemeta";

// Recieve values from the server
const { html } = get_server_data();

/**
 * This example inserts HTML meta tags before the closing </head> tag.
 *
 * @param {string} html - The HTML string containing meta tags.
 */
function render_meta_tags(html) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");
	const tags = doc.head.childNodes;

	tags.forEach((tag) => {
		document.head.appendChild(tag);
	});
}

render_meta_tags(metadata_html);
```

#### Option 2: Initialize Metadata on the client

```js
import { Metadata } from "schemeta";

// Recieve values from the server
const { values } = get_server_data();

// Option 2: Initialize wih metadata from the server
const metadata = new Metadata(values).title("My Client-Rendered App");

// Render your html with one of the outputs (.toString() | .toHTML() | .toElements())
render_meta_tags(metadata.toString());
```

## Setup

### Installation

```sh
# npm
npm install schemeta@latest

# pnpm
pnpm install schemeta@latest

# yarn
yarn add schemeta@latest
```

Usually you will use schemeta on each page. However, there are some meta-tags you will want to define globally for all pages.

Here is an example I would use in a global layout template.

```js
import { Metadata } from "schemeta";

const metadata = new Metadata();

metadata
	.add({ key: "og:site_name", value: "DesignThen" })
	.title("The tech stack behind our projects in 2024")
	.description(
		"Curious about DesignThen's approach? Gain insights into our design & development philosophy, and the tools shaping our work.",
	)
	.type({
		type: "article",
		params: {
			authors: ["Ollie Taylor"],
			published_time: new Date("2024-02-03T16:00:00Z"),
			section: "Web Development",
		},
	})
	.add({
		key: "application/ld+json",
		value: {
			"@type": "Article",
			author: { "@type": "Person", name: "Ollie Taylor" },
			headline: "The tech stack behind our projects in 2024",
			datePublished: "2024-02-03T16:00:00Z",
		},
	});
```

## API

### `Metadata` Instance

`new Metadata(initial?: MetadataInitialValues)`

#### Add values

| method                         | Purpose                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------- |
| core: `.add(key, value)`       | Add individual [supported values](#supported-metadata) like OpenGraph, or JSON-LD |
| helper: `.title(string)`       | Adds several title values like `og:title` & `twitter:title`                       |
| helper: `.description(string)` | Adds several description values like `og:description` & `twitter:description`     |
| helper: `.url(string)`         | Adds several page url values like `og:url` & `canonical`                          |
| helper: `.image(params)`       | Adds one image with optional properties like `og:alt` & `og:width`                |
| helper: `.site_name(string)`   | Adds several site name values like `og:site_name` & `apple-mobile-web-app-title`  |
| helper: `.type(type, params)`  | Adds `og:type` and optional related OpenGraph values                              |

> [!NOTE]
> Got an idea for a common helper method? [file an issue](https://github.com/OllieJT/schemeta/issues) to let us know, or better yet submit a PR!

#### Render elements

| method          | output                                                                          | usecase                                       |
| --------------- | ------------------------------------------------------------------------------- | --------------------------------------------- |
| `.toValues()`   | `MetadataValues`                                                                | Values needed to initialize `Metadata`.       |
| `.toElements()` | `{ element: string; attributes: Record<string, string>; children?: string; }[]` | Enables you to manually render html elements. |
| `.toHTML()`     | `string[]`                                                                      | Allows you to render each html element.       |
| `.toString()`   | `string`                                                                        | Allows you to render all html elements.       |

### Undocumented

Most helper functions and types are exposed, however we won't be documenting them here until the library has matured more and implementation details have been validated.

## Examples

### Vanilla Example

TODO

### SvelteKit Example

**SSR Metadata for every route (Optional)**

If you want to consistently pass metadata from server to client, you can enforce this with PageData types in `app.d.ts`

```ts
// /src/app.d.ts
declare global {
	namespace App {
		interface PageData {
			metadata: import("schemeta").MetadataValues;
		}
	}
}
```

**Render Metadata Tags**

You can create a component to handle the rendering of your metadata elements.

```svelte
<!-- RenderMetadata.svelte -->
<script lang="ts">
	import type { ValueElement } from "schemeta";

	// Svelte 5 Syntax
	const { elements = [] }: { elements: ValueElement[] } = $props();

	// Svelte 3 + 4 Syntax
	export let elements: ValueElement[] = []
</script>

<svelte:head>
	{#each elements as { element, attributes, children }}
		{#if children}
			<svelte:element this={element} {...attributes}>
				{String(children)}
			</svelte:element>
		{:else}
			<svelte:element this={element} {...attributes} />
		{/if}
	{/each}
</svelte:head>
```

```svelte
<!-- /src/routes/+page.svelte -->
<script lang="ts">
	import { Metadata } from "schemeta";
	import RenderMetadata from "$components/RenderMetadata.svelte";

	let { data } = $props();

	const metadata = new Metadata(data.metadata);
</script>

<RenderMetadata elements={metadata.toElements()} />
```

### React Example

TODO

[npm-url]: https://www.npmjs.com/package/schemeta
[npm-downloads-img]: https://img.shields.io/npm/dm/schemeta?color=364fc7&logoColor=364fc7
[npm-version-img]: https://img.shields.io/npm/v/schemeta?color=0b7285&logoColor=0b7285
[github-url]: https://github.com/OllieJT/schemeta/stargazers
[github-stars-img]: https://img.shields.io/github/stars/olliejt/schemeta
