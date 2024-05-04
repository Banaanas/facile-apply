import { IndeedJob } from "@prisma/client";
import colors from "colors";
import { Page } from "playwright";

import { updateIndeedJobStatus } from "@/actions";
import { questionsHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/questions-handler";
import {
  BASE_URL,
  HandlerFunction,
  urlHandlers,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/url-handlers";

export const handlePageBasedOnUrl = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  try {
    await page.waitForTimeout(2000);
    const finalUrl = page.url();
    console.log(colors.blue(finalUrl));

    // Directly handle the post-apply scenario
    if (finalUrl.includes("post-apply")) {
      await updateIndeedJobStatus(indeedJobId, "Applied");
      console.log(
        colors.green(
          "Process has ben achieved and Job as been updated as Applied.",
        ),
      );
      return;
    }

    const handler = getHandlerForUrl(finalUrl);
    if (!handler) {
      await page.screenshot({ path: "./screenshots/myScreenshot.png" });
      return; // Exit if no handler is found
    }
    await handler(page, indeedJobId); // Execute the found handler
  } catch (error) {
    console.error("Error during page handling:", error);
  }
};

// Extend your urlHandlers to include a regex pattern for question URLs
const regexUrlHandlers: {
  pattern: RegExp;
  handler: HandlerFunction; // Use the updated HandlerFunction type
}[] = [
  ...Object.entries(urlHandlers).map(([pattern, handler]) => ({
    pattern: new RegExp(pattern.replace(BASE_URL, "").replace(/\//g, "\\/")),
    handler,
  })),
  { pattern: /\/questions\/\d+$/, handler: questionsHandler },
  {
    pattern: /\/beta\/indeedapply\/form\/demographic-questions\/\d+/,
    handler: questionsHandler,
  },
];

const getHandlerForUrl = (url: string): HandlerFunction | null => {
  for (const { pattern, handler } of regexUrlHandlers) {
    if (url.match(pattern)) {
      return handler;
    }
  }
  return null;
};
