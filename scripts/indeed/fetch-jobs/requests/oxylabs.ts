import axios from "axios";

import { oxylabsConfig } from "@/scripts/config";

export const fetchPageOxylabs = async (url: string): Promise<string> => {
  console.log("Fetching with Oxylabs Provider");

  const { endpoint, username, password } = oxylabsConfig;

  if (!endpoint || !username || !password) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
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
    console.error(`Error fetching page with Oxylabs: ${error}`);
    throw error;
  }
};
