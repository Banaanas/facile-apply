import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";

export const executeFastApply = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  await page.click("#indeedApplyButton");
  await handlePageBasedOnUrl(page, indeedJobId);
};
