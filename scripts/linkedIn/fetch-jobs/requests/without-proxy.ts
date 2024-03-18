import axios from "axios";
import colors from "colors";
import * as fs from "fs";

import { linkedinConfig } from "@/scripts/config";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import {
  fetchingWithMessage,
  linkedinRequestErrorMessage,
  missingVarMessage,
} from "@/scripts/utils/console-messages";

export const fetchLinkedinWithoutProxy = async (
  targetUrl: string,
): Promise<RawLinkedinData> => {
  fetchingWithMessage("NO PROXY");

  const { jsessionId, liAt } = linkedinConfig;

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

    return data;
  } catch (error) {
    console.log(colors.red(linkedinRequestErrorMessage));
    throw error;
  }
};
