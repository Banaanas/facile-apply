import axios from "axios";

import { zenrowsConfig } from "@/scripts/config";
import {
  fetchingWithMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchPageZenrows = async (targetUrl: string): Promise<string> => {
  fetchingWithMessage("Zenrows");

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
