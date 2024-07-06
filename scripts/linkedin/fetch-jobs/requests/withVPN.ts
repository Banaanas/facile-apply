import axios from "axios";
import colors from "colors";

import { ipRoyalConfig, linkedinConfig } from "@/scripts/config";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { verifyVPNUsage } from "@/scripts/utils/check-ip-vp/check-vpn";
import {
  linkedinRequestErrorMessage,
  missingVarMessage,
} from "@/scripts/utils/console/console-messages";

export const fetchLinkedinVPN = async (
  targetUrl: string,
): Promise<RawLinkedinData> => {
  await verifyVPNUsage();

  const { jsessionId, liAt } = linkedinConfig;
  const { host, port, username, password } = ipRoyalConfig;

  if (!jsessionId || !liAt || !host || !port || !username || !password) {
    throw new Error(missingVarMessage);
  }

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
    Cookie: `JSESSIONID=${jsessionId}; li_at=${liAt};`,
    "csrf-token": `${jsessionId}`,
  };

  const axiosConfig = {
    headers,
  };

  // Check that we are NOT using local IP
  // await verifyProxyUsage(axiosConfig);

  try {
    const { data } = await axios.get(targetUrl, axiosConfig);

    return data;
  } catch (error) {
    console.log(colors.red(linkedinRequestErrorMessage));
    throw error;
  }
};
