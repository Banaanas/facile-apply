import { ScrapeConfig, ScrapflyClient } from "scrapfly-sdk";

import { scrapflyConfig } from "@/scripts/config";
import {
  fetchingWithMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

const client = new ScrapflyClient({ key: scrapflyConfig.apiKey });

export const fetchPageScrapFly = async (targetUrl: string): Promise<string> => {
  fetchingWithMessage("Scrapfly");

  const { apiKey } = scrapflyConfig;

  if (!apiKey) {
    throw new Error(missingVarMessage);
  }

  try {
    const apiResponse = await client.scrape(
      new ScrapeConfig({
        url: targetUrl,
        asp: true,
        render_js: false,
      }),
    );

    return apiResponse?.result.content;
  } catch (error) {
    throw error;
  }
};
