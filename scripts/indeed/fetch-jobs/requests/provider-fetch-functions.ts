import colors from "colors";

import { INDEED_CURRENT_PROVIDER } from "@/scripts/indeed/fetch-jobs/data/search-params";
import { fetchPageScrapingFish } from "@/scripts/indeed/fetch-jobs/requests/scrapingFish";

export const providerFunctions: ProviderFetchFunctions = {
  scrapingFish: fetchPageScrapingFish,
};

export const fetchPageWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[INDEED_CURRENT_PROVIDER];

  if (!fetchFunction) {
    throw new Error(
      colors.red(`Fetch provider ${INDEED_CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

interface ProviderFetchFunctions {
  scrapingFish: FetchFunction;
}

type FetchFunction = (searchUrl: string) => Promise<string>;

export type ProviderName = keyof ProviderFetchFunctions;
