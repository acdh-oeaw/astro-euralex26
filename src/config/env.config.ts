import { log } from "@acdh-oeaw/lib";
import { createEnv } from "@acdh-oeaw/validate-env/astro";
import * as v from "valibot";

const environment = import.meta.env.SSR
	? Object.assign({}, process.env, import.meta.env)
	: { ...import.meta.env };

export const env = createEnv({
	environment,
	schemas: {
		public(input) {
			const Schema = v.object({
				PUBLIC_APP_BASE_PATH: v.optional(v.pipe(v.string(), v.nonEmpty())),
				PUBLIC_APP_BASE_URL: v.pipe(v.string(), v.url()),
				PUBLIC_BOTS: v.optional(v.picklist(["disabled", "enabled"]), "disabled"),
				PUBLIC_GOOGLE_SITE_VERIFICATION: v.optional(v.string()),
				PUBLIC_MATOMO_BASE_URL: v.optional(v.pipe(v.string(), v.url())),
				PUBLIC_MATOMO_ID: v.optional(
					v.pipe(v.string(), v.transform(Number), v.number(), v.integer(), v.minValue(1)),
				),
				PUBLIC_REDMINE_ID: v.pipe(
					v.string(),
					v.transform(Number),
					v.number(),
					v.integer(),
					v.minValue(1),
				),
			});
			const result = v.safeParse(Schema, input);
			if (!result.success) {
				log.error("Invalid environment variables", v.flatten<typeof Schema>(result.issues).nested);
				throw new Error("Invalid environment variables");
			}
			return result.output;
		},
	},
	validation: v.parse(
		v.optional(v.picklist(["disabled", "enabled", "public"]), "enabled"),
		environment.ENV_VALIDATION,
	),
});
