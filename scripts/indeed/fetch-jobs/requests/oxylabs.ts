import axios from "axios";

import { oxylabsConfig } from "@/scripts/config";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const fetchPageOxylabs = async (url: string): Promise<string> => {
  const { endpoint, username, password } = oxylabsConfig;

  if (!endpoint || !username || !password) {
    throw new Error(missingVarMessage);
  }

  const body = {
    source: "universal",
    url,
    geo_location: "United States",
    render: "html",
  };

  try {
    const response = await axios.post(endpoint, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`,
      },
    });

    return response.data.results[0].content;
  } catch (error) {
    throw error;
  }
};
