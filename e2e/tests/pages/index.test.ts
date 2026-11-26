import { locales } from "@/config/i18n.config";
import { expect, test } from "~/e2e/lib/test";

test.describe("index page", () => {
	test("keeps the desktop hero spacing and content width", async ({ createIndexPage, page }) => {
		await page.setViewportSize({ width: 1440, height: 960 });
		const { indexPage } = await createIndexPage("en");
		await indexPage.goto();

		const sections = page.locator("main > section");
		await expect(sections.first()).toHaveCSS("padding-top", "128px");
		await expect(sections.nth(1)).toHaveCSS("max-width", "1024px");
	});

	test("should have document title", async ({ createIndexPage }) => {
		for (const locale of locales) {
			const { i18n, indexPage } = await createIndexPage(locale);
			await indexPage.goto();

			await expect(indexPage.page).toHaveTitle(
				[i18n.t("IndexPage.meta.title"), i18n.t("metadata.title")].join(" | "),
			);
		}
	});

	test("should not have any automatically detectable accessibility issues", async ({
		createAccessibilityScanner,
		createIndexPage,
	}) => {
		for (const locale of locales) {
			const { indexPage } = await createIndexPage(locale);
			await indexPage.goto();

			const { getViolations } = await createAccessibilityScanner();
			expect(await getViolations()).toEqual([]);
		}
	});

	test.skip("should not have visible changes", async ({ createIndexPage }) => {
		for (const locale of locales) {
			const { indexPage } = await createIndexPage(locale);
			await indexPage.goto();

			await expect(indexPage.page).toHaveScreenshot();
		}
	});
});
