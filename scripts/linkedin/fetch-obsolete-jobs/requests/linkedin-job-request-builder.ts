export const linkedinJobRequestBuilder = (fullJobUrn: string): string => {
  const baseUrl = "https://www.linkedin.com/voyager/api/graphql";
  const queryId =
    "voyagerJobsDashJobPostingDetailSections.61a1d2cc430218b6e70266051f4d514b";
  const jobId = fullJobUrn.split(":").pop();
  const jobPostingUrn = encodeURIComponent(`urn:li:fsd_jobPosting:${jobId}`);

  const variables = `(cardSectionTypes:List(TOP_CARD),jobPostingUrn:${jobPostingUrn},includeSecondaryActionsV2:false)`;

  return `${baseUrl}?variables=${variables}&queryId=${queryId}`;
};
