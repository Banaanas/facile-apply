import colors from "colors";

import {
  ExperienceLevel,
  SortBy,
  TimePostedRange,
  WorkplaceType,
} from "@/scripts/linkedIn/fetch-jobs/data/linkedin-search-enums";
import { COMMON_PARAMS } from "@/scripts/linkedIn/fetch-jobs/data/search-params";

const mapSortBy = (sortBy: SortBy) => {
  switch (sortBy) {
    case SortBy.Relevance:
      return "Relevance";
    case SortBy.MostRecent:
      return "Most Recent";
    default:
      return "Unknown";
  }
};

const mapTimePostedRange = (timePostedRange: TimePostedRange) => {
  switch (timePostedRange) {
    case TimePostedRange.Last24Hours:
      return "Last 24 hours";
    case TimePostedRange.LastWeek:
      return "Last week";
    default:
      return "Unknown";
  }
};

const mapExperienceLevel = (levels: Array<ExperienceLevel>) => {
  return levels
    .map((level) => {
      switch (level) {
        case ExperienceLevel.Entry:
          return "Entry level";
        case ExperienceLevel.Mid:
          return "Mid level";
        case ExperienceLevel.Senior:
          return "Senior level";
        default:
          return "Unknown";
      }
    })
    .join(", ");
};

const mapWorkplaceType = (workplaceType: WorkplaceType) => {
  switch (workplaceType) {
    case WorkplaceType.Remote:
      return "Remote";
    case WorkplaceType.OnSite:
      return "On-site";
    case WorkplaceType.Hybrid:
      return "Hybrid";
    default:
      return "Unknown";
  }
};

export const logCommonSearchParams = () => {
  console.log(
    colors.cyan("Initializing search with the following common parameters:"),
  );
  console.log(
    colors.yellow(
      `- Apply With LinkedIn: ${COMMON_PARAMS.applyWithLinkedin ? "Yes" : "No"}`,
    ),
  );
  console.log(
    colors.yellow(
      `- Experience Levels: ${mapExperienceLevel(COMMON_PARAMS.experience)}`,
    ),
  );
  console.log(
    colors.yellow(
      `- Time Posted Range: ${mapTimePostedRange(COMMON_PARAMS.timePostedRange)}`,
    ),
  );
  console.log(colors.yellow(`- Sort By: ${mapSortBy(COMMON_PARAMS.sortBy)}`));
  console.log(
    colors.yellow(
      `- Workplace Type: ${mapWorkplaceType(COMMON_PARAMS.workplaceType)}`,
    ),
  );
};
