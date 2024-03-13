import * as console from "node:console";

import colors from "colors";
import { firefox } from "playwright";

import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";
import { SEARCH_DATE_RANGE_DAYS } from "@/scripts/fetch-jobs/data/search-params";
import { countryUrls } from "@/scripts/fetch-jobs/data/urls/country-urls";
import { Country } from "@/scripts/fetch-jobs/fetch-jobs.types";
import { getJobResults } from "@/scripts/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/fetch-jobs/parsing/transform-job-results";
import { fetchPageWithProvider } from "@/scripts/fetch-jobs/requests/provider-fetch-functions";
import { buildSearchUrl } from "@/scripts/fetch-jobs/utils/url-builder";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

const main = async () => {
  const browser = await firefox.launch();

  // Iterate over each country URL
  for (const [country, details] of Object.entries(countryUrls)) {
    // Now iterate over each search query within the country
    for (const [searchKey, searchQuery] of Object.entries(details.searches)) {
      console.log(
        colors.cyan(
          `Searching ${searchKey} in ${country} for the past ${SEARCH_DATE_RANGE_DAYS} days...`,
        ),
      );

      const context = await browser.newContext();
      const page = await context.newPage();

      await blockResourcesAndAds(page);

      const indeedSearchUrl = buildSearchUrl(
        country as Country,
        searchQuery.query,
        SEARCH_DATE_RANGE_DAYS,
      );

      const initialSearchHTML = await fetchPageWithProvider(indeedSearchUrl);
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

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
  await browser.close();
};

main().catch(console.error);
