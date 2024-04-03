import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/continue-button";
import { IndeedJob } from "@prisma/client";

export const profileLocationHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Profile Location Page");
  await page.click(`text=${continueButtonRegex}`);
  console.log("Profile Location handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};
