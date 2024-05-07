import * as console from "node:console";
import colors from "colors";
import { firefox } from "playwright";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-indeed";
import { updateLastSearchDateIndeed } from "@/scripts/database/update-search-date";
import { calculateDaysRange } from "@/scripts/indeed/fetch-jobs/data/calculate-days-range";
import { INDEED_CURRENT_PROVIDER } from "@/scripts/indeed/fetch-jobs/data/search-params";
import { countryUrls } from "@/scripts/indeed/fetch-jobs/data/urls/country-urls";
import { Country } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import { filterIndeedJobResults } from "@/scripts/indeed/fetch-jobs/parsing/filter-indeed-job";
import { getJobResults } from "@/scripts/indeed/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/indeed/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/indeed/fetch-jobs/parsing/transform-job-results";
import { fetchPageWithProvider } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";
import { buildSearchUrl } from "@/scripts/indeed/fetch-jobs/utils/url-builder";
import { buildSearchIdentifier } from "@/scripts/searches/utils/build-search-identifier";
import {
  fetchingWithMessage,
  skipSearchMessage,
} from "@/scripts/utils/console/console-messages";
import { logIndeedJobSearchParams } from "@/scripts/utils/console/console-messages-indeed-launch";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";
import { hasSearchBeenPerformedWithinThreshold } from "@/scripts/searches/utils/search-elapsed-time-threshold";

const main = async () => {
  const browser = await firefox.launch();
  await checkDatabaseConnection();
  fetchingWithMessage(INDEED_CURRENT_PROVIDER);

  // Iterate over each country URL
  for (const [country, details] of Object.entries(countryUrls)) {
    const { domain } = details; // Extract the domain once per country

    // Now iterate over each search query within the country
    for (const [searchKey, search] of Object.entries(details.searches)) {
      const queryIdentifier = buildSearchIdentifier(
        details.domain,
        search.query,
      );
      const searchRangeDays = await calculateDaysRange(queryIdentifier);

      await logIndeedJobSearchParams(
        searchKey,
        country,
        searchRangeDays,
        queryIdentifier,
      );

      // Check if the search has already been performed within the last 24 hours
      const searchAlreadyPerformed =
        await hasSearchBeenPerformedWithinThreshold(
          "indeedJobSearchMeta",
          queryIdentifier,
        );

      if (searchAlreadyPerformed) {
        skipSearchMessage(search.query);
      }

      // Only execute the following block if the search has NOT been performed in the last 24 hours
      if (!searchAlreadyPerformed) {
        const context = await browser.newContext();
        const page = await context.newPage();
        await blockResourcesAndAds(page);
        const indeedSearchUrl = buildSearchUrl(
          country as Country,
          search.query,
          searchRangeDays,
        );

        const initialSearchHTML = await fetchPageWithProvider(indeedSearchUrl);
        const jobResults = await getJobResults(indeedSearchUrl);
        const searchCountry = getSearchCountry(initialSearchHTML);
        const transformedJobResults = transformJobResults(
          jobResults,
          searchCountry,
        );
        const filteredTransformedJobResults = filterIndeedJobResults(
          transformedJobResults,
        );

        await registerTransformedJobResultsInDB(
          filteredTransformedJobResults,
          indeedSearchUrl,
        );

        // Update the last search date for this specific query
        await updateLastSearchDateIndeed(queryIdentifier, domain, search.query);

        await context.close();
      }
    }
  }

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
  await browser.close();
};

main().catch(console.error);
