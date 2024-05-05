import { LinkedinJob } from "@prisma/client";

export type TransformedScrapedLinkedinJob = Omit<LinkedinJob, "id">;

export interface SearchConfig {
  keywords: string;
  geoId: string;
  timePostedRange: string;
}
