import { executeFastApply } from "@/scripts/indeed/auto-apply-job/execute-fast-apply";
import { launchLocalBrowser } from "@/scripts/indeed/auto-apply-job/launch-browser/launch-local-browser";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

export const runPlaywrightSession = async (headless: Headless, url: string) => {
  const context = await launchLocalBrowser(headless);
  const page = await context.newPage();

  await blockResourcesAndAds(page);
  await page.goto(url);

  console.log("Current page URL:", page.url());

  if (context) {
    await executeFastApply(page);
    // await connection.context.close();
  }
};

export type Headless = boolean;
