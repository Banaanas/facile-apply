import axios from "axios";

import { scrapingFishConfig } from "@/scripts/config";
import {
  fetchingWithMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchPageScrapingFish = async (
  targetUrl: string,
): Promise<string> => {
  fetchingWithMessage("Scraping Fish");

  const { apiKey, apiUrl } = scrapingFishConfig;

  const payload = {
    api_key: apiKey,
    url: targetUrl,
  };

  if (!apiKey) {
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
