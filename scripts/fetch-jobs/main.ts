import { Browser, firefox } from "playwright";

import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";
import { countryUrls } from "@/scripts/fetch-jobs/data/urls/country-urls";
import { getJobResults } from "@/scripts/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/fetch-jobs/parsing/transform-job-results";
import { fetchPageZenrows } from "@/scripts/fetch-jobs/requests/zenrows";
import { buildSearchUrl } from "@/scripts/fetch-jobs/utils/url-builder";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";

const main = async () => {
  const browser: Browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Block unwanted resources and ad network requests to limit bandwidth
  await blockResourcesAndAds(page);

  const indeedSearchUrl = buildSearchUrl(
    "FR",
    countryUrls.FR.searches["next-js"].query,
    7,
  );

  const initialSearchHTML = await fetchPageZenrows(indeedSearchUrl);
  const jobResults = await getJobResults(indeedSearchUrl);
  const searchCountry = getSearchCountry(initialSearchHTML);
  const transformedJobResults = transformJobResults(jobResults, searchCountry);

  await registerTransformedJobResultsInDB(transformedJobResults);

  await browser.close();
};

main().catch(console.error);
