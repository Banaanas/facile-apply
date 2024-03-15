import { Page } from "playwright";
import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";


export const executeFastApply = async (page: Page) => {
  await page.waitForTimeout(4000);

  await page.click("#indeedApplyButton");
  await handlePageBasedOnUrl(page);
};
