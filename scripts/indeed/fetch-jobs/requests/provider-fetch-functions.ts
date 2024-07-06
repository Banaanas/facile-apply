import chalk from "chalk";

import { INDEED_CURRENT_PROVIDER } from "@/scripts/indeed/fetch-jobs/data/search-params";
import { fetchPageScrapingFish } from "@/scripts/indeed/fetch-jobs/requests/scrapingFish";
import { fetchIndeedVPN } from "@/scripts/indeed/fetch-jobs/requests/withVPN";

export const providerFunctions: ProviderFetchFunctions = {
  scrapingFish: fetchPageScrapingFish,
  withVPN: fetchIndeedVPN,
};

export const fetchPageWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[INDEED_CURRENT_PROVIDER];

  if (!fetchFunction) {
    throw new Error(
      chalk.red(`Fetch provider ${INDEED_CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

interface ProviderFetchFunctions {
  scrapingFish: FetchFunction;
  withVPN: FetchFunction;
}

type FetchFunction = (searchUrl: string) => Promise<string>;

export type ProviderName = keyof ProviderFetchFunctions;
