import path from "node:path";

import axios from "axios";
import colors from "colors";
import dotenv from "dotenv";
import https from "https";

dotenv.config({ path: path.join(__dirname, "../../../.env.local") });

const proxyHost = process.env.BRIGHT_DATA_PROXY_HOST;
const proxyPort = process.env.BRIGHT_DATA_PROXY_PORT;
const proxyUser = process.env.BRIGHT_DATA_PROXY_USER;
const proxyPass = process.env.BRIGHT_DATA_PROXY_PASS;

export const fetchPageBrightData = async (url: string): Promise<string> => {
  console.log(colors.italic("Fetching with Bright Data Provider"));

  // Check if all required environment variables are defined
  if (!proxyHost || !proxyPort || !proxyUser || !proxyPass) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(url, {
      proxy: {
        host: proxyHost,
        port: parseInt(proxyPort, 10),
        auth: {
          username: proxyUser,
          password: proxyPass,
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
