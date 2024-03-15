import { IndeedJob } from "@prisma/client";

import {
  ScrapedIndeedJob,
  TransformedScrapedIndeedJob,
} from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

const extractJobDetails = (
  searchResult: ScrapedIndeedJob,
  searchCountry: ScrapedIndeedJob["country"],
): TransformedScrapedIndeedJob => {
  const {
    company,
    createDate,
    indeedApplyEnabled,
    jobkey,
    thirdPartyApplyUrl,
    title,
  } = searchResult;

  // Convert createDate from BigInt to Date
  const createDateAsDate = new Date(Number(createDate));

  // Create defaults status
  const status: IndeedJob["status"] = "NotReviewed";

  return {
    company,
    country: searchCountry,
    createDate: createDateAsDate,
    indeedApplyEnabled,
    jobkey,
    link: thirdPartyApplyUrl,
    status,
    title,
  };
};

export const transformJobResults = (
  searchResults: Array<ScrapedIndeedJob>,
  searchCountry: ScrapedIndeedJob["country"],
): Array<TransformedScrapedIndeedJob> => {
  return searchResults.map((searchResult) =>
    extractJobDetails(searchResult, searchCountry),
  );
};
