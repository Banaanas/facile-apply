import path from "node:path";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../../.env.local") });

const rapidApiKey = process.env.RAPIDAPI_KEY;
const rapidApiHost = process.env.RAPIDAPI_HOST;

export const fetchPageDripCrawler = async (
  targetUrl: string,
): Promise<string> => {
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

    return response.data;
  } catch (error) {
    console.error(`Error fetching page with DripCrawler: ${error}`);
    throw error;
  }
};
