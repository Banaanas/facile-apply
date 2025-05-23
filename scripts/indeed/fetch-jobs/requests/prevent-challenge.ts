import chalk from "chalk";

import { fetchPageWithProvider } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";

// Fetch again if Indeed's anti-bot protection is active
export const fetchWithRetry = async (indeedSearchUrl: string) => {
  let htmlContent = await fetchPageWithProvider(indeedSearchUrl);

  // Retry until the fetched page is not a challenge page
  while (isChallengePage(htmlContent)) {
    console.log(
      chalk.grey(
        "Indeed's anti-bot protection seems to be active. Retrying fetch... ",
      ),
    );
    console.log(
      chalk.bgRed(
        "If this persist and you are using a VPN, please change the IP you're fetching with. ",
      ),
    );
    // Wait for a certain period before re-fetch
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    // Fetch the page again
    htmlContent = await fetchPageWithProvider(indeedSearchUrl);
  }

  return htmlContent;
};

const isChallengePage = (htmlContent: string) => {
  return (
    htmlContent.includes("Enable JavaScript and cookies to continue") ||
    htmlContent.includes("Just a moment...") ||
    htmlContent.includes("Verification Required")
  );
};
