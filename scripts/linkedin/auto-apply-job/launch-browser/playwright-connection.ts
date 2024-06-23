import { LinkedinJob } from "@prisma/client";

import { executeFastApply } from "@/scripts/linkedin/auto-apply-job/execute-fast-apply";
import { launchLocalBrowser } from "@/scripts/linkedin/auto-apply-job/launch-browser/launch-local-browser";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

export const runLinkedinPlaywrightSession = async (
  headless: Headless,
  url: string,
  linkedinJobId: LinkedinJob["id"],
): Promise<void> => {
  const context = await launchLocalBrowser(headless);
  const page = await context.newPage();

  await blockResourcesAndAds(page);
  await page.goto(url);
  await page.waitForTimeout(2000);

  console.log("Current page URL:", page.url());

  // First, check if the job posting is obsolete
  // const hasAlreadyApplied = await checkIfAlreadyApplied(page, linkedinJobId);
  // const isObsolete = await checkAndUpdateIfJobIsObsolete(page, linkedinJobId);

  /* // If the job is found to be obsolete, stop the process and return false
  if (isObsolete || hasAlreadyApplied) {
    await context.close();
    return;
  } */

  if (context) {
    await executeFastApply(page, linkedinJobId);
    await context.close();
  }
};

export type Headless = boolean;
