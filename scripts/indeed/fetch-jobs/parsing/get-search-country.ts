import * as fs from "node:fs";
import path from "node:path";

import * as cheerio from "cheerio";
import colors from "colors";

import { ScrapedIndeedJob } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import { JobData } from "@/scripts/indeed/fetch-jobs/parsing/extract-job-results";

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

  // Get current date and time
  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/:/g, "-")
    .replace(/\..+/, "")
    .replace("T", "_");

  // Define file path with timestamp
  const debugFilePath = path.join(__dirname, `debugHtmlPage_${timestamp}.html`);

  // Write file
  fs.writeFileSync(debugFilePath, htmlPage);

  console.log(
    colors.red(`Current page HTML saved for debugging: ${debugFilePath}`),
  );
  throw new Error(
    "Country information could not be extracted from the HTML page.",
  );
};
