import colors from "colors";

import { fetchPageWithProvider } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";

// Fetch again if Indeed's anti-bot protection is active
export const fetchWithRetry = async (indeedSearchUrl: string) => {
  let htmlContent = await fetchPageWithProvider(indeedSearchUrl);

  // Retry until the fetched page is not a challenge page
  while (isChallengePage(htmlContent)) {
    console.log(
      colors.grey(
        "Retrying fetch... Indeed's anti-bot protection seems to be active.",
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
    htmlContent.includes("Just a moment...")
  );
};
