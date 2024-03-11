import { ScrapedIndeedJob } from "@/scripts/fetch-jobs/fetch-jobs.types";
import { extractJobResults } from "@/scripts/fetch-jobs/parsing/extract-job-results";
import { fetchPageZenrows } from "@/scripts/fetch-jobs/requests/zenrows";

import { getNextPageUrl } from "./get-next-page-url";

export const getJobResults = async (
  initialSearchResultsUrl: string,
): Promise<Array<ScrapedIndeedJob>> => {
  const getAllLinksRecursively = async (
    currentPageUrl: string,
    allJobLinks: Array<ScrapedIndeedJob> = [],
  ): Promise<Array<ScrapedIndeedJob>> => {
    const urlObject = new URL(currentPageUrl);
    const domain = urlObject.origin;

    const currentPageHtml = await fetchPageZenrows(currentPageUrl);
    const jobResults = extractJobResults(currentPageHtml);
    const nextJobResults = [...allJobLinks, ...jobResults];

    const nextPageUrl = getNextPageUrl(currentPageHtml, domain);
    if (!nextPageUrl) {
      return nextJobResults;
    }

    return getAllLinksRecursively(nextPageUrl, nextJobResults);
  };

  return getAllLinksRecursively(initialSearchResultsUrl);
};
