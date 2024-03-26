import axios from "axios";

import { zenrowsConfig } from "@/scripts/config";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const fetchPageZenrows = async (targetUrl: string): Promise<string> => {
  const { apiKey, apiUrl } = zenrowsConfig;

  if (!apiKey) {
    throw new Error(missingVarMessage);
  }

  try {
    const response = await axios({
      url: apiUrl,
      method: "GET",
      params: {
        url: targetUrl,
        apikey: apiKey,
        js_render: "false",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
