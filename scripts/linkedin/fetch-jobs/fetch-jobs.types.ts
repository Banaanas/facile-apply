import { LinkedinJob } from "@prisma/client";
import { WorkplaceType } from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";

export type TransformedScrapedLinkedinJob = Omit<LinkedinJob, "id">;

export interface SearchConfig {
  keywords: string;
  geoId: string;
  timePostedRange: string;
  applyWithLinkedin?: boolean;
  workplaceType?: WorkplaceType;
  lessThan10Candidatures?: boolean;
}
