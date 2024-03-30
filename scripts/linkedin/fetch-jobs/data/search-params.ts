import {
  ExperienceLevel,
  SortBy,
  TimePostedRange,
  WorkplaceType,
} from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";

export const DelayOption = {
  ENABLED: true,
  DISABLED: false,
};

export const LINKEDIN_JOB_SEARCH_COMMON_PARAMS: CommonParams = {
  applyWithLinkedin: true,
  experience: [
    ExperienceLevel.Entry,
    ExperienceLevel.Mid,
    ExperienceLevel.Senior,
  ],
  timePostedRange: TimePostedRange.Last24Hours,
  sortBy: SortBy.Relevance,
  workplaceType: WorkplaceType.Remote,
};

interface CommonParams {
  applyWithLinkedin: boolean;
  experience: Array<ExperienceLevel>;
  timePostedRange: TimePostedRange;
  sortBy: SortBy;
  workplaceType: WorkplaceType;
}
