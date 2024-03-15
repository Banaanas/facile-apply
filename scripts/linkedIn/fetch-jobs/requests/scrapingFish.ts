import axios from "axios";
import colors from "colors";

import { scrapingFishConfig } from "@/scripts/config";

export const fetchPageScrapingFish = async (
  targetUrl: string,
): Promise<string> => {
  console.log(colors.italic("Fetching with ScrapingFish Provider"));

  const { apiKey, apiUrl } = scrapingFishConfig;

  const payload = {
    api_key: apiKey,
    url: targetUrl,
    render_js: "false", // NO JAVASCRIPT
  };

  if (!apiKey) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(apiUrl, {
      params: payload,
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page with ScrapingFish: ${error}`);
    throw error;
  }
};
