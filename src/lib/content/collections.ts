import { collection, fields } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createCollection } from "@/lib/content/create-collection";
import { createComponents, headingLevels } from "@/lib/content/create-components";
import { createCollectionPaths } from "@/lib/content/create-paths";
// import { createPreviewUrl } from "@/lib/content/create-preview-url";

const pages = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/pages/", locale);

	return collection({
		label: `Pages (${locale})`,
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				validation: { isRequired: true },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

const keynotes = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/keynotes/", locale);

	return collection({
		label: `Keynotes (${locale})`,
		path: contentPath,
		slugField: "title",
		format: { contentField: "abstract" },
		// previewUrl: createPreviewUrl("/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			subtitle: fields.text({
				label: "Subtitle",
				validation: { isRequired: true },
				multiline: true,
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			date: fields.datetime({
				label: "Date",
				validation: { isRequired: true },
				defaultValue: { kind: "now" },
			}),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetPaths(assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			speaker: fields.text({
				label: "Speaker",
				validation: { isRequired: true },
				multiline: true,
			}),
			speakerBio: fields.text({
				label: "Short Biography",
				validation: { isRequired: false },
				multiline: true,
			}),
			streamUrl: fields.url({
				label: "Stream URL",
				validation: { isRequired: false },
			}),
			abstract: fields.mdx({
				label: "Abstract",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

const days = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/programme/", locale);

	return collection({
		label: `Days (${locale})`,
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			date: fields.date({
				label: "Date",
				validation: { isRequired: true },
			}),
			image: fields.object(
				{
					src: fields.image({
						label: "Image",
						validation: { isRequired: false },
						...createAssetPaths(assetPath),
					}),
					caption: fields.text({
						label: "Image caption",
						validation: { isRequired: false },
					}),
				},
				{
					label: "Image",
				},
			),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const collections = {
	pages,
	keynotes,
	days,
} as const;

export type Collections = keyof typeof collections;
