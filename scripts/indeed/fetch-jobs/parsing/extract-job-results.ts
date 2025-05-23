import * as cheerio from "cheerio";

import { ScrapedIndeedJob } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const extractJobResults = (
  htmlPage: string,
): Array<ScrapedIndeedJob> => {
  const $ = cheerio.load(htmlPage);
  const scriptContent = $("#mosaic-data").html();

  let jobResults: Array<ScrapedIndeedJob> = [];

  if (scriptContent) {
    const jsonDataString = scriptContent.match(
      /window\.mosaic\.providerData\["mosaic-provider-jobcards"]=(\{.*?});/s,
    );

    if (jsonDataString && jsonDataString.length > 1) {
      const jsonData: RawIndeedData = JSON.parse(jsonDataString[1]);
      jobResults = jsonData.metaData.mosaicProviderJobCardsModel.results;
    }
  }

  if (!jobResults) {
    console.log("This search gave no result");
  }

  // If jobResults json is undefined, return an empty array
  return jobResults || [];
};

export interface RawIndeedData {
  metaData: PublicMetadata;
  country: string;
}

interface PublicMetadata {
  mosaicProviderJobCardsModel: MosaicProviderJobCardsModel;
}

interface MosaicProviderJobCardsModel {
  results: Array<ScrapedIndeedJob>;
  proctorContext: ProctorContext;
}

interface ProctorContext {
  country: string;
}
