import * as cheerio from "cheerio";

import { ScrapedIndeedJob } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import { RawIndeedData } from "@/scripts/indeed/fetch-jobs/parsing/extract-job-results";

export const getSearchCountry = (
  htmlPage: string,
): ScrapedIndeedJob["country"] => {
  const $ = cheerio.load(htmlPage);

  const scriptContent = $("#mosaic-data").html();

  if (scriptContent) {
    const jsonDataString = scriptContent.match(
      /window\.mosaic\.initialData = (\{.+?\});/s,
    );

    if (jsonDataString && jsonDataString.length > 1) {
      // Ensure jsonData is treated as JobData, not as any
      const jsonData: RawIndeedData = JSON.parse(
        jsonDataString[1],
      ) as RawIndeedData;

      const country = jsonData.country as ScrapedIndeedJob["country"];

      return country;
    }
  }

  throw new Error(
    "Country information could not be extracted from the HTML page.",
  );
};
