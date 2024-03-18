import { LinkedinJob } from "@prisma/client";
import { TransformedScrapedLinkedinJob } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";

export const extractLinkedinJobDetails = (
  jobCardUnion: RawLinkedinJobCardUnion,
): TransformedScrapedLinkedinJob => {
  const { jobPostingCard } = jobCardUnion;
  const {
    footerItems,
    primaryDescription,
    preDashNormalizedJobPostingUrn,
    secondaryDescription,
    title,
  } = jobPostingCard;

  const jobId = preDashNormalizedJobPostingUrn.split(":").pop();
  const jobLink = `https://www.linkedin.com/jobs/view/${jobId}`;

  // Extract the company name from primaryDescription.text
  const company = primaryDescription.text;
  // Check for "Easy Apply" in footerItems (if present)
  const easyApply = footerItems.some((item) => item.type === "EASY_APPLY_TEXT");
  // Extract the location from secondaryDescription.text
  const location = secondaryDescription.text;

  // Find the "LISTED_DATE" item for the createDate
  const listedDateItem = footerItems.find(
    (item) => item.type === "LISTED_DATE",
  );
  const createDate = new Date(listedDateItem!.timeAt);

  // Create defaults status
  const status: LinkedinJob["status"] = "NotReviewed";

  return {
    company,
    createDate,
    easyApply,
    jobUrn: preDashNormalizedJobPostingUrn,
    link: jobLink,
    location,
    status,
    title: title.text,
  };
};

export const transformLinkedinJobResults = (
  rawLinkedinData: RawLinkedinData,
): Array<TransformedScrapedLinkedinJob> => {
  const { elements } = rawLinkedinData;

  return elements.map(({ jobCardUnion }) =>
    extractLinkedinJobDetails(jobCardUnion),
  );
};

export interface RawLinkedinData {
  metadata: RawLinkedinMetadata;
  elements: Array<RawLinkedinElement>;
  paging: RawLinkedinPaging;
}

interface RawLinkedinMetadata {
  keywords: string;
  geo: {
    fullLocalizedName: string;
  };
}

interface RawLinkedinPaging {
  total: number;
  start: number;
  count: number;
}

interface RawLinkedinElement {
  jobCardUnion: RawLinkedinJobCardUnion;
}

export interface RawLinkedinJobCardUnion {
  jobPostingCard: {
    entityUrn: string;
    preDashNormalizedJobPostingUrn: string;
    title: {
      text: string;
    };
    primaryDescription: {
      text: string;
    };
    secondaryDescription: {
      text: string;
    };
    footerItems: Array<{
      type: string;
      timeAt: number;
      // Used if ever needed, for example, for "EASY_APPLY_TEXT" or other descriptive texts
      text?: {
        text: string;
      };
    }>;
  };
}
