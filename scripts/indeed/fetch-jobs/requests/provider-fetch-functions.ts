import colors from "colors";

import { INDEED_CURRENT_PROVIDER } from "@/scripts/indeed/fetch-jobs/data/search-params";
import { fetchPageBrightData } from "@/scripts/indeed/fetch-jobs/requests/brightData";
import { fetchPageDripCrawler } from "@/scripts/indeed/fetch-jobs/requests/dripCrawler";
import { fetchPageIPRoyal } from "@/scripts/indeed/fetch-jobs/requests/ipRoyal";
import { fetchPageOxylabs } from "@/scripts/indeed/fetch-jobs/requests/oxylabs";
import { fetchPageScrapFly } from "@/scripts/indeed/fetch-jobs/requests/scrapFly";
import { fetchPageScrapingFish } from "@/scripts/indeed/fetch-jobs/requests/scrapingFish";
import { fetchPageZenrows } from "@/scripts/indeed/fetch-jobs/requests/zenrows";

export const providerFunctions: ProviderFetchFunctions = {
  brightData: fetchPageBrightData,
  dripCrawler: fetchPageDripCrawler,
  ipRoyal: fetchPageIPRoyal,
  oxylabs: fetchPageOxylabs,
  scrapFly: fetchPageScrapFly,
  scrapingFish: fetchPageScrapingFish,
  zenrows: fetchPageZenrows,
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
  brightData: FetchFunction;
  dripCrawler: FetchFunction;
  ipRoyal: FetchFunction;
  oxylabs: FetchFunction;
  scrapFly: FetchFunction;
  scrapingFish: FetchFunction;
  zenrows: FetchFunction;
}

type FetchFunction = (searchUrl: string) => Promise<string>;

export type ProviderName = keyof ProviderFetchFunctions;
