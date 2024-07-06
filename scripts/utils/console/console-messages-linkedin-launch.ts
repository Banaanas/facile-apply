import { prisma } from "@prisma/db.server";

import {
  ExperienceLevel,
  SortBy,
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

export const logLinkedinJobSearchParams = async (
  timePostedRange: string,
  queryIdentifier: string,
) => {
  const querySearch = await prisma.linkedinJobSearchMeta.findFirst({
    where: {
      identifier: queryIdentifier,
    },
  });

  console.log("Initializing search with the following common parameters:".cyan);

  console.log(
    `- Last Search Date: ${querySearch?.lastSearchAt.toLocaleDateString("fr-FR")}`
      .bgBlue.yellow.bold,
  );

  console.log(
    `- Time Posted Range: ${formatTimePostedRange(timePostedRange)}`.yellow,
  );

  // Log workplace type preference
  console.log(
    `- Workplace Type: ${mapWorkplaceType(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.workplaceType)}`
      .yellow,
  );

  // Log whether applying with LinkedIn is enabled
  console.log(
    `- Apply With LinkedIn: ${LINKEDIN_JOB_SEARCH_COMMON_PARAMS.applyWithLinkedin ? "Yes" : "No"}`
      .yellow,
  );

  // Log experience levels
  console.log(
    `- Experience Levels: ${mapExperienceLevel(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.experience)}`
      .yellow,
  );

  // Log sorting preference
  console.log(
    `- Sort By: ${mapSortBy(LINKEDIN_JOB_SEARCH_COMMON_PARAMS.sortBy)}`.yellow,
  );
};

export const logCommonLinkedinPostSearchParams = (
  keywordsArray: SearchConfiguration["keywords"],
) => {
  // Destructure datePosted and sortBy from LINKEDIN_POST_SEARCH_COMMON_PARAMS.queryParameters
  const { datePosted, sortBy } =
    LINKEDIN_POST_SEARCH_COMMON_PARAMS.queryParameters;

  console.log("Initializing search with the following common parameters:".cyan);

  // Assuming each parameter array contains only a single value for logging purposes
  const datePostedStr = datePosted.join(", ").toString();
  const sortByStr = sortBy.join(", ").toString();

  // Logging Keywords Array
  console.log(`- Keywords: ${keywordsArray.join(", ")}`.yellow);

  // Logging Date Posted
  console.log(`- Date Posted: ${datePostedStr}`.yellow);

  // Logging Sort By
  console.log(`- Sort By: ${sortByStr}`.yellow);
};

function formatTimePostedRange(range: string): string {
  const timeInSeconds = parseInt(range.substring(1), 10);

  const days = Math.floor(timeInSeconds / (24 * 3600));
  const remainderAfterDays = timeInSeconds % (24 * 3600);
  const hours = Math.floor(remainderAfterDays / 3600);
  const remainderAfterHours = remainderAfterDays % 3600;
  const minutes = Math.floor(remainderAfterHours / 60);
  const seconds = remainderAfterHours % 60;

  let result = "";
  if (days > 0) {
    result += `${days} day${days !== 1 ? "s" : ""} `;
  }
  if (hours > 0) {
    result += `${hours} hour${hours !== 1 ? "s" : ""} `;
  }
  if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""} `;
  }
  if (seconds > 0) {
    result += `${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return result.trim() || "Less than a minute"; // Handles cases where the difference is under one minute
}
