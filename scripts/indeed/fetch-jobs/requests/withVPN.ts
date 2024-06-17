import { chromium } from "playwright";

import { verifyVPNUsage } from "@/scripts/utils/check-ip/check-vpn";

const headers = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
};

export const fetchIndeedVPN = async (targetUrl: string): Promise<string> => {
  await verifyVPNUsage();

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      userAgent: headers["user-agent"],
    });
    const page = await context.newPage();
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
    const content = await page.content();
    await browser.close();

    // Return HTML
    return content;
  } catch (error) {
    throw error;
  }
};
