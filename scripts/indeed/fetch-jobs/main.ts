import * as console from "node:console";

import colors from "colors";
import { firefox } from "playwright";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-indeed";
import { updateLastSearchDate } from "@/scripts/database/update-search-date";
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
import { fetchingWithMessage } from "@/scripts/utils/console/console-messages";
import { logCommonIndeedJobSearchParams } from "@/scripts/utils/console/console-messages-indeed-launch";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

const main = async () => {
  const browser = await firefox.launch();
  // If Database is not already running, STOP the process - Avoiding costs of fetching pages that won't be registered in the database after
  await checkDatabaseConnection();
  // Fetch the search range days
  const searchRangeDays = await calculateDaysRange();

  fetchingWithMessage(INDEED_CURRENT_PROVIDER);
  await logCommonIndeedJobSearchParams();

  // Iterate over each country URL
  for (const [country, details] of Object.entries(countryUrls)) {
    // Now iterate over each search query within the country
    for (const [searchKey, searchQuery] of Object.entries(details.searches)) {
      console.log(
        colors.cyan(
          `Searching ${searchKey} in ${country} for the past ${
            searchRangeDays === 1 ? "1 day" : `${searchRangeDays} days`
          }...`,
        ),
      );

      // Used in case of using Playwright session after (for auto-apply bot purpose)
      const context = await browser.newContext();
      const page = await context.newPage();
      await blockResourcesAndAds(page);

      const indeedSearchUrl = buildSearchUrl(
        country as Country,
        searchQuery.query,
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
      await context.close();
    }
  }

  await updateLastSearchDate("Indeed");

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
  await browser.close();
};

main().catch(console.error);
