import { prisma } from "@prisma/db.server";
import chalk from "chalk";

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
  workplaceType?: WorkplaceType, // New parameter
  applyWithLinkedin?: boolean, // New parameter
  lessThan10Candidatures?: boolean, // New parameter
) => {
  const querySearch = await prisma.linkedinJobSearchMeta.findFirst({
    where: {
      identifier: queryIdentifier,
    },
  });

  console.log(chalk.cyan("Initializing search with the following parameters:"));

  console.log(
    chalk.bgBlue(
      chalk.yellow(
        chalk.bold(
          `- Last Search Date: ${querySearch?.lastSearchAt.toLocaleDateString(
            "fr-FR",
          )}`,
        ),
      ),
    ),
  );

  console.log(
    chalk.yellow(
      `- Time Posted Range: ${formatTimePostedRange(timePostedRange)}`,
    ),
  );

  // Log workplace type preference
  console.log(
    chalk.yellow(
      `- Workplace Type: ${mapWorkplaceType(workplaceType || LINKEDIN_JOB_SEARCH_COMMON_PARAMS.workplaceType)}`,
    ),
  );

  // Log whether applying with LinkedIn is enabled
  console.log(
    chalk.yellow(`- Apply With LinkedIn: ${applyWithLinkedin ? "Yes" : "No"}`),
  );

  // Log whether Less than 10 candidatures is enabled
  if (lessThan10Candidatures !== undefined) {
    console.log(
      chalk.yellow(
        `- Less than 10 Candidatures: ${lessThan10Candidatures ? "Yes" : "No"}`,
      ),
    );
  }

  // Log experience levels
  console.log(
    chalk.yellow(
      `- Experience Levels: ${mapExperienceLevel(
        LINKEDIN_JOB_SEARCH_COMMON_PARAMS.experience,
      )}`,
    ),
  );

  // Log sorting preference
  console.log(
    chalk.yellow(
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
    chalk.cyan("Initializing search with the following common parameters:"),
  );

  // Assuming each parameter array contains only a single value for logging purposes
  const datePostedStr = datePosted.join(", ").toString();
  const sortByStr = sortBy.join(", ").toString();

  // Logging Keywords Array
  console.log(chalk.yellow(`- Keywords: ${keywordsArray.join(", ")}`));

  // Logging Date Posted
  console.log(chalk.yellow(`- Date Posted: ${datePostedStr}`));

  // Logging Sort By
  console.log(chalk.yellow(`- Sort By: ${sortByStr}`));
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
