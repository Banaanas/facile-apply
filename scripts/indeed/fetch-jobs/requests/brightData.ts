import axios from "axios";
import colors from "colors";
import https from "https";

import { brightDataConfig } from "@/scripts/config";

export const fetchPageBrightData = async (url: string): Promise<string> => {
  console.log(colors.italic("Fetching with Bright Data Provider"));

  const { host, port, user, pass } = brightDataConfig;

  // Check if all required environment variables are defined
  if (!host || !port || !user || !pass) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(url, {
      proxy: {
        host,
        port: parseInt(port, 10),
        auth: {
          username: user,
          password: pass,
        },
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page: ${error}`);
    throw error;
  }
};
