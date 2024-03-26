import axios from "axios";

import { rapidApiConfig } from "@/scripts/config";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const fetchPageDripCrawler = async (
  targetUrl: string,
): Promise<string> => {
  const { key, host } = rapidApiConfig;

  if (!key || !host) {
    throw new Error(missingVarMessage);
  }

  const options = {
    method: "POST",
    url: "https://dripcrawler.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    data: {
      url: targetUrl,
      javascript_rendering: "true",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data.extracted_html;
  } catch (error) {
    throw error;
  }
};
