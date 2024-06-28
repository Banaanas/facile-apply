import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";

export const oocQuestionHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling OOC Page");
  await page.click("input#yes");
  await page.click("text=/^(Continuer|Continue)$/i");
  console.log("OOC handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};
