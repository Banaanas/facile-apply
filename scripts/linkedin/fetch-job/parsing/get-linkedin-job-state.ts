import { linkedinJobRequestBuilder } from "@/scripts/linkedin/fetch-job/requests/linkedin-job-request-builder";
import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";

export const getLinkedinJobState = async (
  fullJobUrn: string,
): Promise<string | null> => {
  const url = linkedinJobRequestBuilder(fullJobUrn);

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
