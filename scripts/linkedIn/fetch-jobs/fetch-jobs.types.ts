import { LinkedinJob } from "@prisma/client";

import {
  ExperienceLevel,
  SortBy,
  TimePosted,
  WorkplaceType,
} from "@/scripts/linkedIn/fetch-jobs/utils/constants";

export type TransformedScrapedLinkedinJob = Omit<LinkedinJob, "id">;

// SEARCH QUERY PARAMETERS

interface LinkedInSearchQueryParams {
  origin: string;
  keywords: string;
  locationUnion: LocationUnion;
  selectedFilters: SelectedFilters;
  spellCorrectionEnabled: boolean;
}

interface LocationUnion {
  geoId: string;
}

interface SelectedFilters {
  sortBy: SortBy;
  applyWithLinkedin?: boolean;
  experience: Array<ExperienceLevel>;
  timePostedRange: TimePosted;
  workplaceType: Array<WorkplaceType>;
}

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

export interface SearchConfigs {
  [configKey: string]: SearchConfig;
}
