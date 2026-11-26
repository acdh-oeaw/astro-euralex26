import { readFile } from "node:fs/promises";
import { join } from "node:path";

import type { IntlMessages, Locale } from "@/config/i18n.config";

export async function getIntlMessages(locale: Locale): Promise<IntlMessages> {
	const [messages, metadata] = await Promise.all([
		readFile(join("src", "messages", `${locale}.json`), "utf8"),
		readFile(join("content", locale, "metadata", "index.json"), "utf8"),
	]);

	return {
		...(JSON.parse(messages) as Omit<IntlMessages, "metadata">),
		metadata: JSON.parse(metadata) as IntlMessages["metadata"],
	};
}
