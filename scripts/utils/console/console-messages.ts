import chalk from "chalk";

import { ProviderName as IndeedProviderName } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";
import { ProviderName as LinkedinProviderName } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import { SEARCH_HOURS_ELAPSED_THRESHOLD } from "@/scripts/searches/utils/search-elapsed-time-threshold";

// Page Requests
export const fetchingWithMessage = (
  providerName: IndeedProviderName | LinkedinProviderName,
) => {
  if (providerName !== "withVPN") {
    console.log(
      chalk.magenta.italic(`Fetching with ${providerName} Proxy Provider`),
    );
  }

  if (providerName === "withVPN") {
    console.log(chalk.italic("Fetching with VPN Provider"));
  }
};

export const missingVarMessage =
  "One or more required environment variables are not defined.";

// Linkedin
export const linkedinRequestErrorMessage =
  "An error occurred. This might be due to incorrect or expired session tokens. Please verify your session tokens (JSESSIONID, li_at) are correct by using them in a logged-in browser session.";

export const skipSearchMessage = (query: string) => {
  console.log(
    chalk.italic(
      `Skipping search for keywords: "${query}". Search was performed within the last ${SEARCH_HOURS_ELAPSED_THRESHOLD} hours.`,
    ),
  );
};
