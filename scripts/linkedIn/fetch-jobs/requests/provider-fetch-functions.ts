import colors from "colors";

import { CURRENT_PROVIDER } from "@/scripts/linkedIn/fetch-jobs/data/search-params";
import { RawLinkedInData } from "@/scripts/linkedIn/fetch-jobs/parsing/transform-job-results";
import { fetchLinkedInScrapingFish } from "@/scripts/linkedIn/fetch-jobs/requests/scrapingFish";
import { fetchLinkedInWithoutProxy } from "@/scripts/linkedIn/fetch-jobs/requests/without-proxy";

export const providerFunctions: ProviderFetchFunctions = {
  scrapingFish: fetchLinkedInScrapingFish,
  withoutProxy: fetchLinkedInWithoutProxy,
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

type FetchFunction = (searchUrl: string) => Promise<RawLinkedInData>;

export type ProviderName = keyof ProviderFetchFunctions;
