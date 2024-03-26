import colors from "colors";

import { LINKEDIN_CURRENT_PROVIDER } from "@/scripts/linkedin/common/data/linkedin-current-provider";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { fetchLinkedinScrapingFish } from "@/scripts/linkedin/fetch-jobs/requests/scrapingFish";
import { fetchLinkedinWithoutProxy } from "@/scripts/linkedin/fetch-jobs/requests/without-proxy";
import { RawLinkedinPostData } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import { RawLinkedinJobData } from "@/scripts/linkedin/fetch-job/parsing/get-linkedin-job-state";

export const providerFunctions: ProviderFetchFunctions = {
  scrapingFish: fetchLinkedinScrapingFish,
  withoutProxy: fetchLinkedinWithoutProxy,
};

export const fetchResultsWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[LINKEDIN_CURRENT_PROVIDER];

  if (!fetchFunction) {
    throw new Error(
      colors.red(`Fetch provider ${LINKEDIN_CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

interface ProviderFetchFunctions {
  scrapingFish: FetchFunction;
  withoutProxy: FetchFunction;
}

type FetchFunction = (
  searchUrl: string,
) => Promise<RawLinkedinData | RawLinkedinPostData | RawLinkedinJobData>;

export type ProviderName = keyof ProviderFetchFunctions;
