import colors from "colors";

import {
  ExperienceLevel,
  SortBy,
  TimePostedRange,
  WorkplaceType,
} from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-enums";
import { LINKEDIN_JOB_SEARCH_COMMON_PARAMS } from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { SearchConfiguration } from "@/scripts/linkedin/fetch-posts/data/post-search-configs";
import { LINKEDIN_POST_SEARCH_COMMON_PARAMS } from "@/scripts/linkedin/fetch-posts/data/search-params";

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

export const logCommonLinkedinJobSearchParams = () => {
  console.log(
    colors.cyan("Initializing search with the following common parameters:"),
  );

  console.log(
    colors.yellow(
      `- Time Posted Range: ${mapTimePostedRange(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.timePostedRange)}`,
    ),
  );

  // Log workplace type preference
  console.log(
    colors.yellow(
      `- Workplace Type: ${mapWorkplaceType(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.workplaceType)}`,
    ),
  );

  // Log whether applying with LinkedIn is enabled
  console.log(
    colors.yellow(
      `- Apply With LinkedIn: ${LINKEDIN_JOB_SEARCH_COMMON_PARAMS.applyWithLinkedin ? "Yes" : "No"}`,
    ),
  );

  // Log experience levels
  console.log(
    colors.yellow(
      `- Experience Levels: ${mapExperienceLevel(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.experience)}`,
    ),
  );

  // Log sorting preference
  console.log(
    colors.yellow(
      `- Sort By: ${mapSortBy(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.sortBy)}`,
    ),
  );
};

export const logCommonLinkedinPostSearchParams = (
  keywordsArray: SearchConfiguration["keywords"],
) => {
  // Destructure datePosted and sortBy from LINKEDIN_POST_SEARCH_COMMON_PARAMS.queryParameters
  const { datePosted, sortBy } =
    LINKEDIN_POST_SEARCH_COMMON_PARAMS.queryParameters;

  console.log(
    colors.cyan("Initializing search with the following common parameters:"),
  );

  // Assuming each parameter array contains only a single value for logging purposes
  const datePostedStr = datePosted.join(", ").toString();
  const sortByStr = sortBy.join(", ").toString();

  // Logging Keywords Array
  console.log(colors.yellow(`- Keywords: ${keywordsArray.join(", ")}`));

  // Logging Date Posted
  console.log(colors.yellow(`- Date Posted: ${datePostedStr}`));

  // Logging Sort By
  console.log(colors.yellow(`- Sort By: ${sortByStr}`));
};

function mapTimePostedRange(range: TimePostedRange): string {
  switch (range) {
    case TimePostedRange.Last24Hours:
      return "Last 24 Hours";
    case TimePostedRange.LastWeek:
      return "Last Week";
    case TimePostedRange.LastMonth:
      return "Last Month";
    case TimePostedRange.Last3Months:
      return "Last 3 Months";
    case TimePostedRange.Last6Months:
      return "Last 6 Months";
    case TimePostedRange.LastYear:
      return "Last Year";
    default:
      return "Unknown Time Range";
  }
}
