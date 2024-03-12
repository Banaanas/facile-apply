import { Page } from "playwright";

// Playwright - Block resources and ads to reduce bandwidth
export const blockResourcesAndAds = async (page: Page) => {
  // Define a list of common ad network patterns
  const adNetworkPatterns = [
    "**/*doubleclick.net/**",
    "**/*googleadservices.com/**",
    "**/*googlesyndication.com/**",
    // Add more patterns as needed
  ];

  // Use route() to intercept and block certain types of resources and ad network requests
  await page.route("**/*", (route) => {
    const requestUrl = route.request().url();
    const resourceType = route.request().resourceType();

    // Check if the request is for an ad network
    const isAdRequest = adNetworkPatterns.some((pattern) =>
      requestUrl.match(pattern),
    );

    if (["image", "stylesheet", "font"].includes(resourceType) || isAdRequest) {
      route.abort();
    } else {
      route.continue();
    }
  });
};
