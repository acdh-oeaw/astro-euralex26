import { createUrl, createUrlSearchParams } from "@acdh-oeaw/lib";

export const videoProviders = [
	{ label: "YouTube", value: "youtube" },
	{ label: "Vimeo", value: "vimeo" },
] as const;

export const vimeoContentTypes = [
	{ label: "Video", value: "video" },
	{ label: "Live event", value: "event" },
] as const;

interface VideoDetails {
	id: string;
	startTime?: number | null;
}

export type VideoSource =
	| {
			discriminant: "vimeo";
			value: {
				content:
					| { discriminant: "event"; value: { id: string } }
					| { discriminant: "video"; value: VideoDetails };
			};
	  }
	| { discriminant: "youtube"; value: VideoDetails };

export function createVideoEmbedUrl(source: VideoSource): URL {
	if (source.discriminant === "youtube") {
		const { id, startTime } = source.value;

		return createUrl({
			baseUrl: "https://www.youtube-nocookie.com",
			pathname: `/embed/${id}`,
			searchParams: startTime ? createUrlSearchParams({ t: startTime }) : undefined,
		});
	}

	const { content } = source.value;

	if (content.discriminant === "event") {
		return createUrl({
			baseUrl: "https://vimeo.com",
			pathname: `/event/${content.value.id}/embed`,
		});
	}

	const { id, startTime } = content.value;

	return createUrl({
		baseUrl: "https://player.vimeo.com",
		pathname: `/video/${id}`,
		hash: startTime ? `t=${String(startTime)}s` : undefined,
	});
}
