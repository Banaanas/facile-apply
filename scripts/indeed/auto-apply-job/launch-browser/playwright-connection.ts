import { IndeedJob } from "@prisma/client";

import {
  checkAndUpdateIfJobIsObsolete,
  checkIfAlreadyApplied,
} from "@/scripts/indeed/auto-apply-job/announce-check";
import { executeFastApply } from "@/scripts/indeed/auto-apply-job/execute-fast-apply";
import { launchLocalBrowser } from "@/scripts/indeed/auto-apply-job/launch-browser/launch-local-browser";
import { checkDatabaseConnection } from "@/scripts/utils/check-ip-vp/check-running-database";
import { verifyNoVPNUsage } from "@/scripts/utils/check-ip-vp/verify-no-VPN";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

export const runIndeedPlaywrightSession = async (
  headless: Headless,
  url: string,
  indeedJobId: IndeedJob["id"],
): Promise<void> => {
  const context = await launchLocalBrowser(headless);
  const page = await context.newPage();

  await checkDatabaseConnection();
  await verifyNoVPNUsage();
  await blockResourcesAndAds(page);
  await page.goto(url);
  await page.waitForTimeout(2000);

  console.log("Current page URL:", page.url());

  // First, check if the job posting is obsolete
  const hasAlreadyApplied = await checkIfAlreadyApplied(page, indeedJobId);
  const isObsolete = await checkAndUpdateIfJobIsObsolete(page, indeedJobId);

  // If the job is found to be obsolete, stop the process and return false
  if (isObsolete || hasAlreadyApplied) {
    await context.close();
    return;
  }

  if (context) {
    await executeFastApply(page, indeedJobId);
    await context.close();
  }
};

export type Headless = boolean;
