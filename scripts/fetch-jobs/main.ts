import { Browser, firefox } from "playwright";

import { countryUrls } from "@/scripts/data/urls/country-urls";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";
import { getJobResults } from "@/scripts/fetch-jobs/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/fetch-jobs/parsing/get-search-country";
import { transformJobResults } from "@/scripts/fetch-jobs/parsing/transform-job-results";
import { fetchPageZenrows } from "@/scripts/fetch-jobs/requests/zenrows";
import { buildSearchUrl } from "@/scripts/utils/url-builder";

const main = async () => {
  const browser: Browser = await firefox.launch();

  const indeedSearchUrl = buildSearchUrl(
    "CH",
    countryUrls.CH.searches.react.query,
    100,
  );
  console.log(`Indeed search URL: ${indeedSearchUrl}`);

  const initialSearchHTML = await fetchPageZenrows(indeedSearchUrl);
  const jobResults = await getJobResults(indeedSearchUrl);
  const searchCountry = getSearchCountry(initialSearchHTML);
  const transformedJobResults = transformJobResults(jobResults, searchCountry);

  await registerTransformedJobResultsInDB(transformedJobResults);

  console.log(
    `Registered ${transformedJobResults.length} jobs in the database.`,
  );

  await browser.close();
};

main().catch(console.error);
