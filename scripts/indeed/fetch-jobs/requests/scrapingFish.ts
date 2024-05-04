import axios from "axios";

import { scrapingFishConfig } from "@/scripts/config";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const fetchPageScrapingFish = async (
  targetUrl: string,
): Promise<string> => {
  const { apiKey, apiUrl } = scrapingFishConfig;

  const payload = {
    api_key: apiKey,
    url: targetUrl,
  };

  if (!apiKey || !apiUrl) {
    throw new Error(missingVarMessage);
  }

  try {
    const response = await axios.get(apiUrl, {
      params: payload,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
