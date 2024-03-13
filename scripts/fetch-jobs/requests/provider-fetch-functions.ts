import colors from "colors";

import { fetchPageBrightData } from "@/scripts/fetch-jobs/requests/bright-data";
import { fetchPageDripCrawler } from "@/scripts/fetch-jobs/requests/dripCrawler";
import { fetchPageIPRoyal } from "@/scripts/fetch-jobs/requests/ipRoyal";
import { fetchPageScrapFly } from "@/scripts/fetch-jobs/requests/scrapFly";
import { fetchPageZenrows } from "@/scripts/fetch-jobs/requests/zenrows";
import { CURRENT_PROVIDER } from "@/scripts/fetch-jobs/data/search-params";

export const providerFunctions = {
  fetchPageBrightData,
  fetchPageDripCrawler,
  fetchPageIPRoyal,
  fetchPageScrapFly,
  fetchPageZenrows,
};

export const fetchPageWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[CURRENT_PROVIDER];
  if (!fetchFunction) {
    throw new Error(
      colors.red(`Fetch provider ${CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

type ProviderFunctionsType = typeof providerFunctions;
export type ProviderKey = keyof ProviderFunctionsType;
