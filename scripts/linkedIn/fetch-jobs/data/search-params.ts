import {
  ExperienceLevel,
  SortBy,
  TimePostedRange,
  WorkplaceType,
} from "@/scripts/linkedIn/fetch-jobs/data/linkedin-search-enums";
import { ProviderName } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";

export const CURRENT_PROVIDER: ProviderName = "withoutProxy";

export const DelayOption = {
  ENABLED: true,
  DISABLED: false,
};

export const COMMON_PARAMS: CommonParams = {
  applyWithLinkedin: true,
  experience: [
    ExperienceLevel.Entry,
    ExperienceLevel.Mid,
    ExperienceLevel.Senior,
  ],
  timePostedRange: TimePostedRange.Last3Months,
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
