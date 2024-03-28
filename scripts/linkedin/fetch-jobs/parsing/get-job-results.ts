import { TransformedScrapedLinkedinJob } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";
import {
  RawLinkedinData,
  transformLinkedinJobResults,
} from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import { linkedinSearchMessage } from "@/scripts/utils/console/console-messages";

export const getJobResults = async (
  linkedinSearch: string,
): Promise<Array<TransformedScrapedLinkedinJob>> => {
  let start = 0;
  let totalJobsCount = 0;
  const allJobs = []; // Array to accumulate all jobs
  let isFirstRequest = true; // Flag to indicate if it's the first request

  while (isFirstRequest || allJobs.length < totalJobsCount) {
    const urlWithPagination = linkedinSearch.replace(
      /&start=\d+/,
      `&start=${start}`,
    );

    const rawData = (await fetchResultsWithProvider(
      urlWithPagination,
    )) as RawLinkedinData;

    if (isFirstRequest && rawData.paging) {
      totalJobsCount = rawData.paging.total; // Get the total count from the first request
      isFirstRequest = false; // No longer the first request
    }

    if (rawData && rawData.elements && rawData.elements.length > 0) {
      const jobs = transformLinkedinJobResults(rawData);
      allJobs.push(...jobs); // Accumulate jobs

      // Log search details on the first page
      if (start === 0 && rawData.metadata) {
        linkedinSearchMessage(rawData.metadata);
      }

      start += jobs.length; // Prepare for fetching the next page
      if (allJobs.length >= totalJobsCount) {
        break; // Exit the loop if we have fetched all jobs
      }
    } else {
      break; // No more data to fetch or an empty page was returned
    }
  }

  return allJobs; // Return the accumulated list of jobs
};
