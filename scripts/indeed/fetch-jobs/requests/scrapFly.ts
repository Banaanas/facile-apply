import colors from "colors";
import { ScrapeConfig, ScrapflyClient } from "scrapfly-sdk";

import { scrapflyConfig } from "@/scripts/config";

const client = new ScrapflyClient({ key: scrapflyConfig.apiKey });

export const fetchPageScrapFly = async (targetUrl: string): Promise<string> => {
  console.log(colors.italic("Fetching with ScrapFly Provider"));

  const { apiKey } = scrapflyConfig;

  if (!apiKey) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
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
    console.error(`Error fetching page: ${error}`);
    throw error;
  }
};
