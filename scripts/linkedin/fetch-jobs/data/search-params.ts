import {
  ExperienceLevel,
  SortBy,
  WorkplaceType,
} from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";

export const LINKEDIN_JOB_SEARCH_COMMON_PARAMS: CommonParams = {
  experience: [
    ExperienceLevel.Entry,
    ExperienceLevel.Mid,
    ExperienceLevel.Senior,
  ],
  sortBy: SortBy.Relevance,
  workplaceType: WorkplaceType.Remote,
};

interface CommonParams {
  experience: Array<ExperienceLevel>;
  sortBy: SortBy;
  workplaceType: WorkplaceType;
}
