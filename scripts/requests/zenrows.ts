import path from "node:path";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

export const fetchPageZenrows = async (targetUrl: string): Promise<string> => {
  const zenrowsApiKey = process.env.ZENROWS_API_KEY;
  if (!zenrowsApiKey) {
    throw new Error("The ZENROWS_API_KEY environment variable is not defined.");
  }

  const zenrowsApiUrl = "https://api.zenrows.com/v1/";

  try {
    const response = await axios({
      url: zenrowsApiUrl,
      method: "GET",
      params: {
        url: targetUrl,
        apikey: zenrowsApiKey,
        js_render: "false",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page: ${error}`);
    throw error;
  }
};
