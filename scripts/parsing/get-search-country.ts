import * as cheerio from "cheerio";

import { ScrapedIndeedJob } from "@/scripts/scripts.types";
import { JobData } from "@/scripts/parsing/extract-job-results";

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
      const jsonData: JobData = JSON.parse(jsonDataString[1]) as JobData;

      const country = jsonData.country as ScrapedIndeedJob["country"];

      return country;
    }
  }

  // Handle the case where country cannot be extracted
  throw new Error(
    "Country information could not be extracted from the HTML page.",
  );
};
