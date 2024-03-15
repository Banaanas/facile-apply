import axios from "axios";
import colors from "colors";

import { iproyalConfig } from "@/scripts/config";

export const fetchPageIPRoyal = async (targetUrl: string): Promise<string> => {
  console.log(colors.italic("Fetching with IP Royal Provider"));

  if (
    !iproyalConfig.host ||
    !iproyalConfig.port ||
    !iproyalConfig.username ||
    !iproyalConfig.password
  ) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  try {
    const response = await axios.get(targetUrl, {
      proxy: {
        protocol: "http",
        host: iproyalConfig.host,
        port: iproyalConfig.port,
        auth: {
          username: iproyalConfig.username,
          password: iproyalConfig.password,
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching page through IPRoyal proxy: ${error}`);
    throw error;
  }
};
