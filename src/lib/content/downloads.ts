import { fields, singleton } from "@keystatic/core";

export const downloads = singleton({
	label: "Download files",
	path: "content/downloads/index",
	format: { data: "json" },
	entryLayout: "form",
	schema: {
		files: fields.array(
			fields.object({
				title: fields.slug({
					name: {
						label: "Title",
						validation: { isRequired: true },
					},
				}),
				file: fields.file({
					label: "File",
					validation: { isRequired: true },
					directory: "./public/downloads",
					publicPath: "/downloads",
				}),
				note: fields.text({
					label: "Note",
					description: "Optional editor note. This is not shown on the website.",
					multiline: true,
					validation: { isRequired: false },
				}),
			}),
			{
				label: "Files",
				slugField: "title",
				itemLabel(props) {
					return props.fields.title.value.name;
				},
			},
		),
	},
});
