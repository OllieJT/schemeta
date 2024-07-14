import type { MetadataElement } from "$src/types/entity.js";
import type { OpenGraph } from "$src/types/tags.js";

type Episode = {
	actor?: { url: string; role?: string }[];
	director?: { url: string };
	writer?: { url: string };
	duration?: number;
	release_date?: Date;
	tags?: string[];
	series?: { url: string };
};

type Movie = {
	actor?: { url: string; role?: string }[];
	director?: { url: string };
	duration?: number;
	release_date?: Date;
	tags?: string[];
	series?: string;
	writer?: { url: string };
};

// Metadata

function episode(data: Episode): MetadataElement[] {
	const elements: MetadataElement[] = [
		{
			element: "meta",
			attributes: { property: "og:type", content: "video.episode" },
		} satisfies OpenGraph.Type,
	];

	if (data.actor) {
		data.actor.forEach((actor) => {
			elements.push({
				element: "meta",
				attributes: { property: "video:actor", content: actor.url },
			} satisfies OpenGraph.VideoActor);
			if (actor.role) {
				elements.push({
					element: "meta",
					attributes: { property: "video:actor:role", content: actor.role },
				} satisfies OpenGraph.VideoActorRole);
			}
		});
	}

	if (data.director) {
		elements.push({
			element: "meta",
			attributes: { property: "video:director", content: data.director.url },
		} satisfies OpenGraph.VideoDirector);
	}

	if (data.writer) {
		elements.push({
			element: "meta",
			attributes: { property: "video:writer", content: data.writer.url },
		} satisfies OpenGraph.VideoWriter);
	}

	if (data.duration) {
		elements.push({
			element: "meta",
			attributes: { property: "video:duration", content: data.duration },
		} satisfies OpenGraph.VideoDuration);
	}

	if (data.release_date) {
		elements.push({
			element: "meta",
			attributes: { property: "video:release_date", content: data.release_date.toISOString() },
		} satisfies OpenGraph.VideoReleaseDate);
	}

	if (data.tags) {
		data.tags.forEach((tag) => {
			elements.push({
				element: "meta",
				attributes: { property: "video:tag", content: tag },
			} satisfies OpenGraph.VideoTag);
		});
	}

	if (data.series) {
		elements.push({
			element: "meta",
			attributes: { property: "video:series", content: data.series.url },
		} satisfies OpenGraph.VideoSeries);
	}

	return elements;
}

function video(data: Movie): MetadataElement[] {
	const elements: MetadataElement[] = [];

	if (data.actor) {
		data.actor.forEach((actor) => {
			elements.push({
				element: "meta",
				attributes: { property: "video:actor", content: actor.url },
			} satisfies OpenGraph.VideoActor);
			if (actor.role) {
				elements.push({
					element: "meta",
					attributes: { property: "video:actor:role", content: actor.role },
				} satisfies OpenGraph.VideoActorRole);
			}
		});
	}

	if (data.director) {
		elements.push({
			element: "meta",
			attributes: { property: "video:director", content: data.director.url },
		} satisfies OpenGraph.VideoDirector);
	}

	if (data.writer) {
		elements.push({
			element: "meta",
			attributes: { property: "video:writer", content: data.writer.url },
		} satisfies OpenGraph.VideoWriter);
	}

	if (data.duration) {
		elements.push({
			element: "meta",
			attributes: { property: "video:duration", content: data.duration },
		} satisfies OpenGraph.VideoDuration);
	}

	if (data.release_date) {
		elements.push({
			element: "meta",
			attributes: { property: "video:release_date", content: data.release_date.toISOString() },
		} satisfies OpenGraph.VideoReleaseDate);
	}

	if (data.tags) {
		data.tags.forEach((tag) => {
			elements.push({
				element: "meta",
				attributes: { property: "video:tag", content: tag },
			} satisfies OpenGraph.VideoTag);
		});
	}

	if (data.series) {
		elements.push({
			element: "meta",
			attributes: { property: "video:series", content: data.series },
		} satisfies OpenGraph.VideoSeries);
	}

	return elements;
}

function movie(data: Movie): MetadataElement[] {
	const elements: MetadataElement[] = video(data);

	elements.push({
		element: "meta",
		attributes: { property: "og:type", content: "video.movie" },
	} satisfies OpenGraph.Type);

	return elements;
}

function other(data: Movie): MetadataElement[] {
	const elements: MetadataElement[] = video(data);

	elements.push({
		element: "meta",
		attributes: { property: "og:type", content: "video.other" },
	} satisfies OpenGraph.Type);

	return elements;
}

function tv_show(data: Movie): MetadataElement[] {
	const elements: MetadataElement[] = video(data);

	elements.push({
		element: "meta",
		attributes: { property: "og:type", content: "video.tv_show" },
	} satisfies OpenGraph.Type);

	return elements;
}

export const use_type_video = {
	episode,
	movie,
	other,
	tv_show,
};
