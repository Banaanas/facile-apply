import path from "node:path";

import axios from "axios";
import colors from "colors";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../../.env.local") });

const rapidApiKey = process.env.RAPIDAPI_KEY;
const rapidApiHost = process.env.RAPIDAPI_HOST;

export const fetchPageDripCrawler = async (
  targetUrl: string,
): Promise<string> => {
  console.log(colors.italic("Fetching with DripCrawler Provider"));
  if (!rapidApiKey || !rapidApiHost) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  const options = {
    method: "POST",
    url: "https://dripcrawler.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
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
