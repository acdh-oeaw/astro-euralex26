import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import type { AstroIntegration } from "astro";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import type { Writable } from "type-fest";

import { defaultLocale, locales } from "./src/config/i18n.config";
import { loadEnvFiles } from "./src/lib/load-env-files";

const mode = import.meta.env.MODE;
loadEnvFiles([`.env.${mode}.local`, `.env.${mode}`, ".env.local", ".env"]);
const env = process.env;

const localCms: AstroIntegration = {
	name: "local-keystatic",
	hooks: {
		"astro:config:setup": ({ command, injectRoute, updateConfig }) => {
			if (command !== "dev") return;

			updateConfig({
				security: {
					allowedDomains: [
						{ hostname: "localhost", protocol: "http" },
						{ hostname: "127.0.0.1", protocol: "http" },
					],
				},
				redirects: {
					"/admin": {
						destination: `${env.PUBLIC_APP_BASE_PATH?.replace(/\/$/, "") ?? ""}/keystatic`,
						status: 307,
					},
				},
			});

			injectRoute({
				pattern: "/keystatic/[...params]",
				entrypoint: "./src/lib/keystatic/editor.astro",
				prerender: false,
			});
			injectRoute({
				pattern: "/api/keystatic/[...params]",
				entrypoint: "./src/lib/keystatic/handler.ts",
				prerender: false,
			});
		},
	},
};

export default defineConfig({
	base: env.PUBLIC_APP_BASE_PATH?.trim() === "" ? undefined : env.PUBLIC_APP_BASE_PATH,
	compressHTML: "jsx",
	i18n: {
		defaultLocale,
		locales: locales as Writable<typeof locales>,
		routing: "manual",
	},
	integrations: [
		localCms,
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: [
					"chevron-down",
					"menu",
					"message-circle",
					"search",
					"square-arrow-left",
					"mail",
					"facebook",
				],
				simpleIcons: ["x", "bluesky"],
			},
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
		mdx(),
		react({
			include: ["**/content/**", "**/keystatic/**"],
		}),
		sitemap({
			i18n: {
				defaultLocale,
				locales: Object.fromEntries(
					locales.map((locale) => {
						return [locale, locale];
					}),
				),
			},
		}),
	],
	markdown: { syntaxHighlight: false },
	output: "static",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	scopedStyleStrategy: "where",
	security: {
		checkOrigin: true,
	},
	server: {
		/** Required by keystatic. */
		host: "127.0.0.1",
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
	vite: { plugins: [tailwindcss()] },
});
