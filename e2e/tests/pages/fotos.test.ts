import { expect, test } from "@playwright/test";

const translations = {
	de: { next: "Nächstes Bild", slide: "Bild" },
	en: { next: "Next slide", slide: "Slide" },
};

for (const locale of ["en", "de"] as const) {
	test(`photo sliders initialize after Astro navigation (${locale})`, async ({ page }) => {
		await page.route("https://www.youtube-nocookie.com/**", (route) => route.abort());

		const photos = `/${locale}/fotos/`;
		const publications = `/${locale}/publications/`;
		const labels = translations[locale];
		await page.goto(photos);

		const sliders = page.locator("[data-image-slider]");
		const firstSlider = sliders.first();
		const next = firstSlider.getByRole("button", { name: labels.next });
		const counter = firstSlider.locator("[data-image-slider-counter]");
		const slideCount = await firstSlider.locator("[data-image-slide]").count();

		await expect(counter).toHaveText(`${labels.slide} 1 / ${String(slideCount)}`);
		await next.click();
		await expect(counter).toHaveText(`${labels.slide} 2 / ${String(slideCount)}`);

		await page.evaluate(() => {
			Object.defineProperty(window, "photoSliderNavigationMarker", { value: true });
		});

		for (const destination of [publications, photos]) {
			await page
				.locator(`a[href="${destination}"]`)
				.first()
				.evaluate((link) => {
					if (link instanceof HTMLAnchorElement) link.click();
				});
			await expect(page).toHaveURL(destination);
		}

		expect(await page.evaluate(() => Object.hasOwn(window, "photoSliderNavigationMarker"))).toBe(
			true,
		);
		await expect(counter).toHaveText(`${labels.slide} 1 / ${String(slideCount)}`);
		for (const slider of await sliders.all()) {
			const slides = slider.locator("[data-image-slide]");
			await expect(slider.locator("[data-image-slide]:visible")).toHaveCount(1);
			await expect(slider.locator("[data-image-slider-indicators] button")).toHaveCount(
				await slides.count(),
			);
		}
		await next.click();
		await expect(counter).toHaveText(`${labels.slide} 2 / ${String(slideCount)}`);
	});
}
