import colors from "colors";

import { CURRENT_PROVIDER } from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { fetchLinkedinScrapingFish } from "@/scripts/linkedin/fetch-jobs/requests/scrapingFish";
import { fetchLinkedinWithoutProxy } from "@/scripts/linkedin/fetch-jobs/requests/without-proxy";

export const providerFunctions: ProviderFetchFunctions = {
  scrapingFish: fetchLinkedinScrapingFish,
  withoutProxy: fetchLinkedinWithoutProxy,
};

export const fetchResultsWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[CURRENT_PROVIDER];

  if (!fetchFunction) {
    throw new Error(
      colors.red(`Fetch provider ${CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

interface ProviderFetchFunctions {
  scrapingFish: FetchFunction;
  withoutProxy: FetchFunction;
}

type FetchFunction = (searchUrl: string) => Promise<RawLinkedinData>;

export type ProviderName = keyof ProviderFetchFunctions;
