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
  } catch (error: unknown) {
    // Explicitly marking the error as unknown is optional but clarifies the intent
    // Check if the error is an instance of Error and has a message
    if (error instanceof Error) {
      console.error(`Failed to block resources and ads: ${error.message}`);
    } else {
      // If it's not an Error instance, handle or log it appropriately
      console.error(
        "Failed to block resources and ads due to an unexpected error:",
        error,
      );
    }
  }
};
