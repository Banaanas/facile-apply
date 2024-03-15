import axios from "axios";
import colors from "colors";

import { iproyalConfig } from "@/scripts/config";

export const fetchPageIPRoyal = async (targetUrl: string): Promise<string> => {
  console.log(colors.italic("Fetching with IP Royal Provider"));

  const { host, port, username, password } = iproyalConfig;

  if (!host || !port || !username || !password) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(targetUrl, {
      proxy: {
        protocol: "http",
        host,
        port,
        auth: {
          username,
          password,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page through IPRoyal proxy: ${error}`);
    throw error;
  }
};
