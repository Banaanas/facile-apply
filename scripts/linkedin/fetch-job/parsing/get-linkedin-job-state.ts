import { linkedinJobRequestBuilder } from "@/scripts/linkedin/fetch-job/requests/linkedin-job-request-builder";
import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import { waitForRandomDelay } from "@/scripts/utils/wait-random-delay";

export const getLinkedinJobState = async (
  fullJobUrn: string,
  withRandomDelay: boolean,
): Promise<string | null> => {
  const url = linkedinJobRequestBuilder(fullJobUrn);

  // Each time we fetch, we wait for a delay - AVOIDING SERVER DETECTION
  if (withRandomDelay) {
    await waitForRandomDelay(3000, 5000);
  }

  const rawResponse = await fetchResultsWithProvider(url);
  const jobState = parseRawResponse(rawResponse as RawLinkedinJobData);

  if (!jobState) {
    console.log("Job state not found in the response.");
    return null;
  }

  return jobState;
};

export const parseRawResponse = (
  rawResponse: RawLinkedinJobData,
): string | undefined => {
  const { elements } =
    rawResponse.data.jobsDashJobPostingDetailSectionsByCardSectionTypes;

  for (const element of elements) {
    for (const section of element.jobPostingDetailSection) {
      // Make sure both topCard and jobPosting exist before accessing jobState
      if (section.topCard && section.topCard.jobPosting) {
        return section.topCard.jobPosting.jobState;
      }
      console.warn("TopCard or jobPosting is null. Skipping this section...");
    }
  }

  // Return undefined if no jobState was found
  return undefined;
};

export interface RawLinkedinJobData {
  data: {
    jobsDashJobPostingDetailSectionsByCardSectionTypes: {
      elements: Array<{
        jobPostingDetailSection: Array<{
          topCard: {
            jobPosting: {
              jobState: string;
            };
          };
        }>;
      }>;
    };
  };
}
