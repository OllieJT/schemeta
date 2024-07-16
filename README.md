<p align="center">
 <img src="https://github.com/OllieJT/schemeta/blob/main/static/banner.png?raw=true" width="600" height="288" alt="sche/ma in a pixelated monospaced font, on a blue-green glowing background">
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

- [Features](#features)
- [Supported Metadata](#supported-metadata)
- [Overview](#overview)
	- [Define Data](#define-data)
	- [Render meta-tags](#render-meta-tags)
- [Setup](#setup)
	- [Installation](#installation)
- [API](#api)
	- [`new Metadata()`](#new-metadata)
		- [Define](#define)
		- [Render](#render)
	- [Undocumented](#undocumented)
- [Examples](#examples)
	- [Vanilla Example](#vanilla-example)
	- [Svelte Example](#svelte-example)
	- [React Example](#react-example)

## Features

- 🥫 Open Source
- 💠 Framework Agnostic
- ✅ Works in server & on the client
- 🙅‍♂️ No runtime dependensies
- 🟦 Typescript Support
- ⛓️ Convenient optional-chaining API

## Supported Metadata

Are we missing any? [file an issue](https://github.com/OllieJT/schemeta/issues) to let us know.

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

At it's core, schemeta exposes a class that can be used to define the metadata for a page.

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
```

### Render meta-tags

The metadata can be defined on the server, or the client before transforming the data into a useable format.

The way you render meta-tags will likely vary based on your framework. We'll use a simple vanilla-js example, but you can find more [examples](#examples) below.

```js
import { Metadata } from "schemeta";

// Optionally initialize wih metadata from the server
const metadata = new Metadata(JSON.parse(data.metadata));

// Apply your data
metadata.title("Ollie's Profile");

//Transform your metadata into HTML
const metadata_html = metadata.toHTML().join("\n");

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
	.site({
		site_name: "DesignThen",
		theme_color: "#000000",
	})
	.linked_data([
		{
			"@type": "WebSite",
			url: "https://designthen.dev",
			name: "DesignThen",
			about: "We solve unique business challenges with bespoke web experiences.",
			// ...
		},
	])
	.twitter({ site_handle: "@designthen" });
```

## API

### `new Metadata()`

#### Define

| method                        | tags                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| `.title(string)`              | `og:title`, `twitter:title`                                                                         |
| `.description(string)`        | `og:description`, `twitter:description`                                                             |
| `.canonical(string)`          | `og:url`, `twitter:url`, `canonical`                                                                |
| `.locale(UseLocale)`          | `og:locale`, `og:locale:alternate[]`                                                                |
| `.site(UseSite)`              | `og:site_name`, `og:determiner`, `theme-color`                                                      |
| `.twitter(UseTwitter)`        | `twitter:card`, `twitter:site`, `twitter:creator`                                                   |
| `.type(UseType)`              | `og:type`, `og:music:*`, `og:video:*`, `og:article:*`, `og:book:*`, `og:profile :*`, `og:website:*` |
| `.linked_data(UseLinkedData)` | `script` [JSON Linked-Data](https://json-ld.org)                                                    |

#### Render

| method        | output                                               | usecase                                                                                        |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `.get()`      | `MetadataElement[]` Raw data                         | Escape-hatch for rendering meta-tags yourself.                                                 |
| `.toString()` | `string` Raw data as a JSON string.                  | Useful if you want to build your metadata on the server, and hydrate `Metadata` on the client. |
| `.toHTML()`   | `string[]` returns the output metadata as html tags. | Recommended method of rendering your meta-tags.                                                |

### Undocumented

Most helper functions and types are exposed, however we won't be documenting them here until the library has matured more and implementation details have been validated.

## Examples

### Vanilla Example

TODO

### Svelte Example

TODO

### React Example

TODO

[npm-url]: https://www.npmjs.com/package/schemeta
[npm-downloads-img]: https://img.shields.io/npm/dm/schemeta?color=364fc7&logoColor=364fc7
[npm-version-img]: https://img.shields.io/npm/v/schemeta?color=0b7285&logoColor=0b7285
[github-url]: https://github.com/OllieJT/schemeta/stargazers
[github-stars-img]: https://img.shields.io/github/stars/olliejt/schemeta
