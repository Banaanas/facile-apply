import axios from "axios";
import colors from "colors";
import * as fs from "fs";

import { linkedInConfig } from "@/scripts/config";
import {
  linkedInRequestErrorMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchLinkedInWithoutProxy = async (
  targetUrl: string,
): Promise<string> => {
  const { jsessionId, liAt } = linkedInConfig;

  if (!jsessionId || !liAt) {
    throw new Error(missingVarMessage);
  }

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
    Cookie: `JSESSIONID=${jsessionId}; li_at=${liAt};`,
    "csrf-token": `${jsessionId}`,
  };

  try {
    const { data } = await axios.get(targetUrl, { headers });
    fs.writeFileSync("response.json", JSON.stringify(data), "utf8");
    console.log(data);
  } catch (error) {
    console.log(colors.red(linkedInRequestErrorMessage));
    throw error;
  }
};
