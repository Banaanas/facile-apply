import colors from "colors";

// Page Requests

export const fetchingWithMessage = (providerName: string) => {
  console.log(colors.italic(`Fetching with ${providerName} Data Provider`));
};

export const missingVarMessage =
  "One or more required environment variables are not defined.";

// LinkedIn
export const linkedInRequestErrorMessage =
  "An error occurred. This might be due to incorrect or expired session tokens. Please verify your session tokens (JSESSIONID, li_at) are correct by using them in a logged-in browser session.";
