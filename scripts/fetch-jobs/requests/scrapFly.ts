import path from "node:path";

import dotenv from "dotenv";
import { ScrapeConfig, ScrapflyClient } from "scrapfly-sdk";

dotenv.config({ path: path.join(__dirname, "../../../.env.local") });

const scrapFlyIpKey = process.env.SCRAPFLY_API_KEY;

const client = new ScrapflyClient({ key: scrapFlyIpKey });

export const fetchPageScrapFly = async (targetUrl: string): Promise<string> => {
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
    console.error(`Error fetching page with ScrapFly: ${error}`);
    throw error;
  }
};
