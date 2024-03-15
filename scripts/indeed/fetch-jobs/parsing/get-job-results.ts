import { ScrapedIndeedJob } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import { extractJobResults } from "@/scripts/indeed/fetch-jobs/parsing/extract-job-results";
import { fetchPageWithProvider } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";

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

    const currentPageHtml = await fetchPageWithProvider(currentPageUrl);
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
