import axios from "axios";
import colors from "colors";
import { SocksProxyAgent } from "socks-proxy-agent";

import { ipRoyalConfig, linkedinConfig } from "@/scripts/config";
import { verifyProxyUsage } from "@/scripts/indeed/fetch-jobs/requests/verify-proxy-usage";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { linkedinRequestErrorMessage, missingVarMessage } from "@/scripts/utils/console/console-messages";

/**
 * This function fetches LinkedIn data using the IPRoyal SOCKS5 proxy.
 * We use SOCKS5 because LinkedIn requires an SSL connection, and normal HTTP did not work.
 * Our SOCKS5 configuration was previously working but is CURRENTLY NOT WORKING correctly.
 */

export const fetchLinkedinIpRoyal = async (
  targetUrl: string,
): Promise<RawLinkedinData> => {
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

  const socks5ProxyUrl = `socks5://${username}:${password}@${host}:${port}`;
  const agent = new SocksProxyAgent(socks5ProxyUrl);
  const axiosConfig = {
    httpAgent: agent,
    httpsAgent: agent,
    headers,
  };

  // Check that we are NOT using local IP
  await verifyProxyUsage(axiosConfig);

  try {
    const { data } = await axios.get(targetUrl, axiosConfig);

    return data;
  } catch (error) {
    console.log(colors.red(linkedinRequestErrorMessage));
    throw error;
  }
};
