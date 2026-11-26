/* @jsxImportSource react */

import { config } from "@keystatic/core";

import { Logo } from "@/components/content/logo";
import { locales } from "@/config/i18n.config";
import { collections } from "@/lib/content/collections";
import { downloads } from "@/lib/content/downloads";
import { i18n, withI18nPrefix } from "@/lib/content/i18n";
import { singletons } from "@/lib/content/singletons";

export default config({
	collections: i18n(collections),
	singletons: {
		...i18n(singletons),
		downloads,
	},
	storage: { kind: "local" },
	ui: {
		brand: {
			mark() {
				return <Logo />;
			},
			name: "Website",
		},
		navigation: {
			data: ["downloads"],
			pages: [
				...locales.map((locale) => withI18nPrefix(locale, "indexPage")),
				"---",
				...locales.map((locale) => withI18nPrefix(locale, "pages")),
				...locales.map((locale) => withI18nPrefix(locale, "keynotes")),
				...locales.map((locale) => withI18nPrefix(locale, "days")),
			],
			settings: [
				...locales.map((locale) => withI18nPrefix(locale, "metadata")),
				"---",
				...locales.map((locale) => withI18nPrefix(locale, "navigation")),
			],
		},
	},
});
