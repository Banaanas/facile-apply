import { Page } from "playwright";

export const blockResourcesAndAds = async (page: Page): Promise<void> => {
  try {
    const adNetworkPatterns = [
      "doubleclick.net",
      "googleadservices.com",
      "googlesyndication.com",
    ];

    await page.route("**/*", (route) => {
      const requestUrl = route.request().url();
      const resourceType = route.request().resourceType();

      const isAdRequest = adNetworkPatterns.some((pattern) =>
        requestUrl.includes(pattern),
      );

      if (
        ["image", "font" /* , "stylesheet" */].includes(resourceType) ||
        isAdRequest
      ) {
        route.abort();
      } else {
        route.continue();
      }
    });
  } catch (error) {
    console.error(`Failed to block resources and ads: ${error.message}`);
  }
};
