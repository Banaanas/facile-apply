import { Browser, firefox } from "playwright";

import { countryUrls } from "@/scripts/data/urls/country-urls";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";

import { buildSearchUrl } from "@/scripts/utils/url-builder";
import { fetchPageZenrows } from "@/scripts/fetch-jobs/requests/zenrows";
import { getJobResults } from "@/scripts/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/fetch-jobs/parsing/transform-job-results";

const main = async () => {
  const browser: Browser = await firefox.launch();

  const indeedSearchUrl = buildSearchUrl(
    "CH",
    countryUrls.CH.searches.react.query,
    100,
  );

  console.log(indeedSearchUrl);

  const initialSearchHTML = await fetchPageZenrows(indeedSearchUrl);
  const jobResults = await getJobResults(indeedSearchUrl);
  const searchCountry = getSearchCountry(initialSearchHTML);
  const transformedJobResults = transformJobResults(jobResults, searchCountry);

  await registerTransformedJobResultsInDB(transformedJobResults);
  await browser.close();
};

main().catch(console.error);
