import path from "node:path";

import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../../.env.local") });

export const fetchPageIPRoyal = async (targetUrl: string): Promise<string> => {
  const proxyHost = process.env.IPROYAL_HOST;
  const proxyPort = process.env.IPROYAL_PORT;
  const proxyUsername = process.env.IPROYAL_USERNAME;
  const proxyPassword = process.env.IPROYAL_PASSWORD;

  if (!proxyHost || !proxyPort || !proxyUsername || !proxyPassword) {
    throw new Error(
      "One or more required environment variables (IPROYAL_HOST, IPROYAL_PORT, IPROYAL_USERNAME, IPROYAL_PASSWORD) are not defined.",
    );
  }

  try {
    const response = await axios.get(targetUrl, {
      proxy: {
        protocol: "http",
        host: proxyHost,
        port: proxyPort,
        auth: {
          username: proxyUsername,
          password: proxyPassword,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page through IPRoyal proxy: ${error}`);
    throw error;
  }
};
