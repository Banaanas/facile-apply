import * as console from "node:console";

import { firefox } from "playwright";

import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";
import { countryUrls } from "@/scripts/fetch-jobs/data/urls/country-urls";
import { Country } from "@/scripts/fetch-jobs/fetch-jobs.types";
import { getJobResults } from "@/scripts/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/fetch-jobs/parsing/transform-job-results";
import { fetchPageScrapFly } from "@/scripts/fetch-jobs/requests/scrapFly";
import { buildSearchUrl } from "@/scripts/fetch-jobs/utils/url-builder";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

// Number of days back from the current date to search
const SEARCH_DATE_RANGE_DAYS = 100;

const main = async () => {
  const browser = await firefox.launch();

  // Iterate over each country URL
  for (const [country, details] of Object.entries(countryUrls)) {
    // Now iterate over each search query within the country
    for (const [searchKey, searchQuery] of Object.entries(details.searches)) {
      // console log with search key, country and number of day
      console.log(
        `Searching ${searchKey} in ${country} for the past ${SEARCH_DATE_RANGE_DAYS} days...`,
      );

      const context = await browser.newContext();
      const page = await context.newPage();

      await blockResourcesAndAds(page);

      const indeedSearchUrl = buildSearchUrl(
        country as Country,
        searchQuery.query,
        SEARCH_DATE_RANGE_DAYS,
      );

      const initialSearchHTML = await fetchPageScrapFly(indeedSearchUrl);
      const jobResults = await getJobResults(indeedSearchUrl);
      const searchCountry = getSearchCountry(initialSearchHTML);
      const transformedJobResults = transformJobResults(
        jobResults,
        searchCountry,
      );

      await registerTransformedJobResultsInDB(
        transformedJobResults,
        indeedSearchUrl,
      );

      await context.close();
    }
  }

  console.log("ALL SEARCHES HAVE BEEN COMPLETED");
  await browser.close();
};

main().catch(console.error);
