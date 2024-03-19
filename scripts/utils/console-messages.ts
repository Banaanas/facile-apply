import colors from "colors";

import { ProviderName as IndeedProviderName } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { ProviderName as LinkedinProviderName } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";

// Page Requests
export const fetchingWithMessage = (
  providerName: IndeedProviderName | LinkedinProviderName,
) => {
  if (providerName === "withoutProxy") {
    console.log(colors.magenta.italic(`Fetching with WITHOUT PROXY Provider`));
  }

  console.log(
    colors.magenta.italic(`Fetching with ${providerName} Proxy Provider`),
  );
};

export const missingVarMessage =
  "One or more required environment variables are not defined.";

// Linkedin
export const linkedinRequestErrorMessage =
  "An error occurred. This might be due to incorrect or expired session tokens. Please verify your session tokens (JSESSIONID, li_at) are correct by using them in a logged-in browser session.";

export const linkedinSearchMessage = (
  metadata: RawLinkedinData["metadata"],
) => {
  const { keywords } = metadata;
  const localization = metadata.geo.fullLocalizedName;

  console.log(colors.magenta.italic(`Search Keywords: ${keywords}`));
  console.log(colors.magenta(`Localization: ${localization}`));
};
