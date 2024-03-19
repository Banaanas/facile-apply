import { LinkedinJob } from "@prisma/client";

import {
  ExperienceLevel,
  SortBy,
  TimePosted,
  WorkplaceType,
} from "@/scripts/linkedIn/fetch-jobs/utils/linkedin-search-enums.ts";

export type TransformedScrapedLinkedinJob = Omit<LinkedinJob, "id">;

export interface SearchConfig {
  keywords: string;
  geoId: string;
  selectedFilters: {
    sortBy: SortBy;
    experience: Array<ExperienceLevel>;
    timePostedRange: TimePosted;
    workplaceType: Array<WorkplaceType>;
    applyWithLinkedin: boolean;
  };
}
