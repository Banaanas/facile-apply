import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";

export const contactInfoHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Contact Info Page");

  // For now, we have to click on the parent because of multiple buttons in one container resulting in an ineffective click

  // await page.click(`text=${continueButtonRegex}`);

  const buttonContainer = await page.$(".ia-BasePage-footer");
  await buttonContainer?.click();
  console.log("Contact Info handled successfully.");
  await handlePageBasedOnUrl(page, indeedJobId);
};
