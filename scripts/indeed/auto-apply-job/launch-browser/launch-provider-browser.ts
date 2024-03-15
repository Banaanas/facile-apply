import { Browser, chromium, Page } from "playwright";

import { brightDataConfig } from "@/scripts/config";

// Connect with Provider's proxy
export const launchProviderBrowser = async (): Promise<Browser> => {
  console.log("Connecting to Scraping Browser via Provider Proxy.");

  const { scrapingBrowserCDP } = brightDataConfig;

  if (!scrapingBrowserCDP) {
    // Handle the missing environment variables case
    throw new Error("SCRAPING_BROWSER_CDP variable is not defined.");
  }

  try {
    const browser = await chromium.connectOverCDP(scrapingBrowserCDP);
    return browser;
  } catch (error) {
    console.error("Error connecting with Provider Proxy:", error);
    throw new Error("Failed to connect with Provider Proxy.");
  }
};

// Function to initiate a CDP session and log the DevTools inspection URL
export const openBrightDataDevTools = async (page: Page) => {
  // Create a new CDP session for the page
  const client = await page.context().newCDPSession(page);

  // Retrieve the main frame's information
  const {
    frameTree: { frame },
  } = await client.send("Page.getFrameTree");

  // Use the main frame's ID to request the DevTools inspection URL
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { url: inspectUrl } = await client.send("Page.inspect", {
    frameId: frame.id,
  });
  // Log the inspection URL for manual use
  console.log(`Inspect session at ${inspectUrl}`);
};
