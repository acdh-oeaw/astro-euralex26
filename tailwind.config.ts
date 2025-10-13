import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
	content: [
		"./keystatic.config.@(ts|tsx)",
		"./content/**/*.@(md|mdx)",
		"./src/@(components|layouts|pages)/**/*.@(astro|css|ts|tsx)",
		"./src/styles/**/*.css",
	],
	corePlugins: {
		container: false,
	},
	darkMode: [
		"variant",
		[
			':where([data-ui-color-scheme="dark"]) &',
			/** Keystatic. */
			":where(.kui-theme.kui-scheme--dark) &",
		],
	],
	plugins: [typographyPlugin],
	theme: {
		extend: {
			colors: {
				neutral: {
					0: "white",
					...colors.neutral,
					1000: "black",
				},
				bg: "color-mix(in sRGB, var(--color-bg) calc(<alpha-value> * 100%), transparent)",
				fg: "color-mix(in sRGB, var(--color-fg) calc(<alpha-value> * 100%), transparent)",
				"focus-ring":
					"color-mix(in sRGB, var(--color-focus-ring) calc(<alpha-value> * 100%), transparent)",
				positive:
					"color-mix(in sRGB, var(--color-positive) calc(<alpha-value> * 100%), transparent)",
				negative:
					"color-mix(in sRGB, var(--color-negative) calc(<alpha-value> * 100%), transparent)",
				periwinkle: {
					"50": "#eff2fe",
					"100": "#e2e7fd",
					"200": "#c2caf9",
					"300": "#abb4f6",
					"400": "#8a8def",
					"500": "#736ee6",
					"600": "#6152d9",
					"700": "#5343bf",
					"800": "#44399a",
					"900": "#3b347b",
					"950": "#231f47",
				},
				"east-bay": {
					"50": "#f4f6fa",
					"100": "#e6ebf3",
					"200": "#d2daeb",
					"300": "#b3c2dd",
					"400": "#8fa3cb",
					"500": "#7488bd",
					"600": "#6171af",
					"700": "#505a94",
					"800": "#4a5083",
					"900": "#3f4569",
					"950": "#2a2c41",
				},
				"rose-bud": {
					"50": "#fef3f2",
					"100": "#ffe4e1",
					"200": "#ffcfc9",
					"300": "#feb1a7",
					"400": "#fb7e6e",
					"500": "#f35540",
					"600": "#e03822",
					"700": "#bd2b18",
					"800": "#9c2718",
					"900": "#81271b",
					"950": "#461009",
				},
				frangipani: {
					"50": "#fff8ed",
					"100": "#ffefd5",
					"200": "#fedeb2",
					"300": "#fdc074",
					"400": "#fb9a3c",
					"500": "#f97d16",
					"600": "#ea620c",
					"700": "#c2490c",
					"800": "#9a3a12",
					"900": "#7c3212",
					"950": "#431707",
				},
			},
			fontFamily: {
				body: "var(--font-body, ui-sans-serif), system-ui, sans-serif",
				heading: "var(--font-heading, var(--font-body, ui-sans-serif)), system-ui, sans-serif",
			},
			typography(_theme: (key: string) => unknown) {
				return {
					DEFAULT: {
						css: {
							maxWidth: "none",
							/** Don't add quotes around `blockquote`. */
							"blockquote p:first-of-type::before": null,
							"blockquote p:last-of-type::after": null,
							/** Don't add backticks around inline `code`. */
							"code::before": null,
							"code::after": null,
						},
					},
				};
			},
		},
		screens: {
			xs: "30rem",
			sm: "40rem",
			md: "48rem",
			lg: "64rem",
			xl: "80rem",
			"2xl": "96rem",
			"3xl": "120rem",
		},
	},
};

export default config;
