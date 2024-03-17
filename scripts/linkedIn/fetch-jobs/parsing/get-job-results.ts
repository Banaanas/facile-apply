import { TransformedScrapedLinkedInJob } from "@/scripts/linkedIn/fetch-jobs/fetch-jobs.types";
import { transformLinkedInJobResults } from "@/scripts/linkedIn/fetch-jobs/parsing/transform-job-results";
import { fetchResultsWithProvider } from "@/scripts/linkedIn/fetch-jobs/requests/provider-fetch-functions";
import { linkedInSearchMessage } from "@/scripts/utils/console-messages";
import { waitForRandomDelay } from "@/scripts/utils/wait-random-delay";

export const getJobResults = async (
  linkedInSearch: string,
  withRandomDelay: boolean,
): Promise<Array<TransformedScrapedLinkedInJob>> => {
  let start = 0;
  let totalJobsCount = 0;
  const allJobs = []; // Array to accumulate all jobs
  let isFirstRequest = true; // Flag to indicate if it's the first request

  while (isFirstRequest || allJobs.length < totalJobsCount) {
    const urlWithPagination = linkedInSearch.replace(
      /&start=\d+/,
      `&start=${start}`,
    );

    // Each time we fetch, we wait for a delay - AVOIDING SERVER DETECTION
    if (withRandomDelay) {
      await waitForRandomDelay(1000, 3000);
    }

    const rawData = await fetchResultsWithProvider(urlWithPagination);

    if (isFirstRequest && rawData.paging) {
      totalJobsCount = rawData.paging.total; // Get the total count from the first request
      isFirstRequest = false; // No longer the first request
    }

    if (rawData && rawData.elements && rawData.elements.length > 0) {
      const jobs = transformLinkedInJobResults(rawData);
      allJobs.push(...jobs); // Accumulate jobs

      // Log search details on the first page
      if (start === 0 && rawData.metadata) {
        linkedInSearchMessage(rawData.metadata);
      }

      console.log(`Fetched ${jobs.length} jobs on this page.`);

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
