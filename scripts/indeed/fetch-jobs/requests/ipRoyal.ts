import axios from "axios";

import { iproyalConfig } from "@/scripts/config";
import {
  fetchingWithMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchPageIPRoyal = async (targetUrl: string): Promise<string> => {
  fetchingWithMessage("Ip Royal");

  const { host, port, username, password } = iproyalConfig;

  if (!host || !port || !username || !password) {
    throw new Error(missingVarMessage);
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
    throw error;
  }
};
