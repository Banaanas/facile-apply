import axios from "axios";
import colors from "colors";

import { zenrowsConfig } from "@/scripts/config";

export const fetchPageZenrows = async (targetUrl: string): Promise<string> => {
  console.log(colors.italic("Fetching with Zenrows Provider"));

  if (!zenrowsConfig.apiKey) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  const zenrowsApiUrl = "https://api.zenrows.com/v1/";

  try {
    const response = await axios({
      url: zenrowsApiUrl,
      method: "GET",
      params: {
        url: targetUrl,
        apikey: zenrowsConfig.apiKey,
        js_render: "false",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page: ${error}`);
    throw error;
  }
};
