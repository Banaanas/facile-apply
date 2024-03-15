import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from "node-fetch";

import { oxylabsConfig } from "@/scripts/config";
import { fetchPageScrapingFish } from "@/scripts/indeed/fetch-jobs/requests/scrapingFish";

const fetchViaProxy = async () => {

  fetchPageScrapingFish()

  const { username, password, endpoint } = oxylabsConfig;

  const agent = new HttpsProxyAgent(
    `http://${username}:${password}@unblock.oxylabs.io:60000`,
  );

  // Adjusting the environment variable setting for development purposes
  // Note: It's better to handle certificates properly rather than disabling TLS checks
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const headers = {
    "x-oxylabs-force-headers": "1",
    "Your-Custom-Header": "interesting header content",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36",
    "Accept-Language": "en-US",
  };

  try {
    const response = await fetch("https://lemonde.fr", {
      method: "get",
      headers,
      agent,
    });

    console.log("HOLA");
    console.log(await response.text());
  } catch (error) {
    console.error(`Error fetching data through proxy: ${error}`);
  }
};

fetchViaProxy();
