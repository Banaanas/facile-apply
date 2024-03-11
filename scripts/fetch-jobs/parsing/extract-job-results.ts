import * as cheerio from "cheerio";

import { ScrapedIndeedJob } from "@/scripts/scripts.types";

export const extractJobResults = (
  htmlPage: string,
): Array<ScrapedIndeedJob> => {
  const $ = cheerio.load(htmlPage);
  const scriptContent = $("#mosaic-data").html();

  let jobResults: Array<ScrapedIndeedJob> = [];

  if (scriptContent) {
    const jsonDataString = scriptContent.match(
      /window\.mosaic\.initialData = (\{.+?\});/s,
    );
    if (jsonDataString && jsonDataString.length > 1) {
      const jsonData: JobData = JSON.parse(jsonDataString[1]);
      jobResults = jsonData.publicMetadata.mosaicProviderJobCardsModel.results;
    }
  }

  return jobResults;
};

export interface JobData {
  publicMetadata: PublicMetadata;
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
