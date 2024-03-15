import { Browser, BrowserContext, Page } from "playwright";

import { executeFastApply } from "@/scripts/auto-apply-job/execute-fast-apply";
import { launchLocalBrowser } from "@/scripts/auto-apply-job/launch-browser/launch-local-browser";
import {
  launchProviderBrowser,
  openBrightDataDevTools,
} from "@/scripts/auto-apply-job/launch-browser/launch-provider-browser";

export const runPlaywrightSession = async (
  connectionMode: ConnectionMode,
  headless: Headless,
  url: string,
) => {
  const connection = await connectToPlaywright(connectionMode, headless);

  const page = await getPageFromConnection(connection);
  await page.goto(url);

  console.log("Current page URL:", page.url());

  // Execute openBrightDataDevTools if in provider mode and not headless
  if (connectionMode === "provider" && !headless && page) {
    await openBrightDataDevTools(page);
  }

  // If Local Browser
  if (connection.context) {
    await executeFastApply(page);
    // await connection.context.close();
  }

  // If Provider Browser
  if (connection.browser) {
    await executeFastApply(page);
    await connection.browser.close();
  }
};

export const connectToPlaywright = async (
  connectionMode: "provider" | "local",
  headless: Headless,
): Promise<PlaywrightConnection> => {
  // If Provider Browser
  if (connectionMode === "provider") {
    const browser = await launchProviderBrowser();
    return { browser };
  }

  // If Local Browser
  const context = await launchLocalBrowser(headless);
  return { context };
};

// We would use context if Provider Browser and browser if Local Browser
const getPageFromConnection = async (
  connection: PlaywrightConnection,
): Promise<Page> => {
  // If Local Browser
  if (connection.context) {
    return connection.context.newPage();
  }
  if (connection.browser) {
    return connection.browser.newPage();
  }
  throw new Error("No context or browser available");
};

type PlaywrightConnection = {
  browser?: Browser;
  context?: BrowserContext;
};

export type Headless = boolean;
export type ConnectionMode = "local" | "provider";
