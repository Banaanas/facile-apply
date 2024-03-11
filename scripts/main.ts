import { Browser, firefox } from "playwright";

import { countryUrls } from "@/scripts/data/urls/country-urls";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database";
import { getJobResults } from "@/scripts/parsing/get-job-results";
import { getSearchCountry } from "@/scripts/parsing/get-search-country";
import { transformJobResults } from "@/scripts/parsing/transform-job-results";
import { fetchPageZenrows } from "@/scripts/requests/zenrows";
import { buildSearchUrl } from "@/scripts/utils/url-builder";

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
