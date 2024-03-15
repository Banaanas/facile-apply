import axios from "axios";
import colors from "colors";

import { rapidapiConfig } from "@/scripts/config";

export const fetchPageDripCrawler = async (
  targetUrl: string,
): Promise<string> => {
  console.log(colors.italic("Fetching with DripCrawler Provider"));
  if (!rapidapiConfig.key || !rapidapiConfig.host) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  const options = {
    method: "POST",
    url: "https://dripcrawler.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": rapidapiConfig.key,
      "X-RapidAPI-Host": rapidapiConfig.host,
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
    console.error(colors.red(`Error fetching page with DripCrawler: ${error}`));
    throw error;
  }
};
