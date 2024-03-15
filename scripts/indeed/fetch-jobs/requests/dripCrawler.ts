import axios from "axios";
import colors from "colors";

import { rapidApiConfig } from "@/scripts/config";

export const fetchPageDripCrawler = async (
  targetUrl: string,
): Promise<string> => {
  console.log(colors.italic("Fetching with DripCrawler Provider"));

  const { key, host } = rapidApiConfig;

  if (!key || !host) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
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
    console.error(colors.red(`Error fetching page: ${error}`));
    throw error;
  }
};
