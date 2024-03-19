import axios from "axios";
import colors from "colors";

import { linkedinConfig, scrapingFishConfig } from "@/scripts/config";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import {
  linkedinRequestErrorMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchLinkedinScrapingFish = async (
  targetUrl: string,
): Promise<RawLinkedinData> => {
  const { apiKey, apiUrl } = scrapingFishConfig;
  const { jsessionId, liAt } = linkedinConfig;

  if (!apiKey) {
    throw new Error(missingVarMessage);
  }

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
    "csrf-token": `${jsessionId}`,
  };

  const cookies = [
    {
      name: "JSESSIONID",
      value: jsessionId,
    },
    {
      name: "li_at",
      value: liAt,
    },
  ];

  const payload = {
    api_key: apiKey,
    url: targetUrl,
    headers: JSON.stringify(headers),
    cookies: JSON.stringify(cookies),
  };

  try {
    const response = await axios.get(apiUrl as string, {
      params: payload,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(colors.red(linkedinRequestErrorMessage));
    throw error;
  }
};
