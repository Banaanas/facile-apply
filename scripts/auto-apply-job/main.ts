import { Page } from "playwright";

export const handlePageBasedOnUrl = async (page: Page) => {
  // Use try-catch to handle any potential errors in navigation or URL fetching
  try {
    console.log("handler");
    // Optionally, wait for the network to be idle to ensure all redirects have processed
    // await page.waitForNavigation({ waitUntil: "networkidle" });
    await page.waitForTimeout(4000);

    const finalUrl = page.url();
    console.log("Final URL after redirects:", finalUrl);

    const handler = getHandlerForUrl(finalUrl);
    if (!handler) {
      console.log("No handler found for this URL:", finalUrl);
      return; // Exit if no handler is found
    }

    await handler(page); // Execute the found handler

    // After handling, optionally call handlePageBasedOnUrl again if expecting further navigations
    // This creates a loop that allows the script to dynamically adapt to subsequent pages
    // await handlePageBasedOnUrl(page); // Uncomment if continuous handling is desired
  } catch (error) {
    console.error("Error during page handling:", error);
  }
};

interface UrlHandlers {
  [key: string]: (page: Page) => Promise<void>;
}

// Define a mapping of URL patterns to handler functions
const urlHandlers: UrlHandlers = {
  "https://smartapply.indeed.com/beta/indeedapply/form/contact-info": async (
    page,
  ) => {
    console.log("Handling Contact Info Page");
    await page.click('button:has-text("Continuer")');
    console.log("Contact Info handled successfully.");
    await handlePageBasedOnUrl(page);
  },
  "https://smartapply.indeed.com/beta/indeedapply/form/resume": async (
    page,
  ) => {
    console.log("Handling Resume Page");
    await page.click('button:has-text("Continuer")');
    console.log("Resume handled successfully.");

    await handlePageBasedOnUrl(page);
  },
  "https://smartapply.indeed.com/beta/indeedapply/form/review": async (
    page,
  ) => {
    console.log("Handling Review Page");
    await page.click('button:has-text("Déposer ma candidature")');
    console.log("Review handled successfully.");

    await handlePageBasedOnUrl(page);
  },

  "https://smartapply.indeed.com/beta/indeedapply/form/ooc-question": async (
    page,
  ) => {
    console.log("Handling OOC  Page");
    await page.click("input#yes");
    await page.click('button:has-text("Continuer")');
    console.log("OOC handled successfully.");

    await handlePageBasedOnUrl(page);
  },

  "/indeedapply/postresumeapply": async (page) => {
    console.log("Handling Indeed Apply Page");
    // Specific logic for this URL
    console.log("Indeed Apply Page handled.");
    // The recursive call to handlePageBasedOnUrl will handle the next page after navigation
  },
  // Add more URL patterns and their corresponding handler functions here
};

const getHandlerForUrl = (
  url: string,
): ((page: Page) => Promise<void>) | null => {
  for (const [pattern, handler] of Object.entries(urlHandlers)) {
    if (url.includes(pattern)) {
      return handler;
    }
  }

  // No handler found for the URL
  return null;
};
