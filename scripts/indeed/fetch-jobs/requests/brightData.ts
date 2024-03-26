import axios from "axios";
import https from "https";

import { brightDataConfig } from "@/scripts/config";
import { missingVarMessage } from "@/scripts/utils/console/console-messages";

export const fetchPageBrightData = async (url: string): Promise<string> => {
  const { host, port, user, pass } = brightDataConfig;

  // Check if all required environment variables are defined
  if (!host || !port || !user || !pass) {
    throw new Error(missingVarMessage);
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
    throw error;
  }
};
