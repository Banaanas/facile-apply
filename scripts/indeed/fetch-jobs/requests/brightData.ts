import axios from "axios";
import colors from "colors";
import https from "https";

import { brightDataConfig } from "@/scripts/config";

export const fetchPageBrightData = async (url: string): Promise<string> => {
  console.log(colors.italic("Fetching with Bright Data Provider"));

  // Check if all required environment variables are defined
  if (
    !brightDataConfig.host ||
    !brightDataConfig.port ||
    !brightDataConfig.user ||
    !brightDataConfig.pass
  ) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(url, {
      proxy: {
        host: brightDataConfig.host,
        port: parseInt(brightDataConfig.port, 10),
        auth: {
          username: brightDataConfig.user,
          password: brightDataConfig.pass,
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
