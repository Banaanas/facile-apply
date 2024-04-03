import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { IndeedJob } from "@prisma/client";

export const reviewHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Review Page");
  await page.click(
    "text=/^(Déposer ma candidature|Submit your application)$/i",
  );
  console.log("Review handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};
