import colors from "colors";

import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";

// Page Requests

export const fetchingWithMessage = (providerName: string) => {
  console.log(
    colors.green.italic(`Fetching with ${providerName} Data Provider`),
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
