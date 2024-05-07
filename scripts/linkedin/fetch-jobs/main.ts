import console from "node:console";

import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-linkedin-job";
import { updateLastSearchDateLinkedIn } from "@/scripts/database/update-search-date";
import { LINKEDIN_CURRENT_PROVIDER } from "@/scripts/linkedin/common/data/linkedin-current-provider";
import { calculateTimePostedRange } from "@/scripts/linkedin/fetch-jobs/data/calculate-time-range";
import { SEARCH_CONFIGURATIONS } from "@/scripts/linkedin/fetch-jobs/data/region-search-configs";
import { filterLinkedinJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/filter-linkedin-job";
import { getJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/get-job-results";
import { buildSearchRequest } from "@/scripts/linkedin/fetch-jobs/requests/linkedin-request-builder";
import { buildSearchIdentifier } from "@/scripts/searches/utils/build-search-identifier";
import { hasSearchBeenPerformedWithinThreshold } from "@/scripts/searches/utils/search-elapsed-time-threshold";
import {
  fetchingWithMessage,
  skipSearchMessage,
} from "@/scripts/utils/console/console-messages";
import { logLinkedinJobSearchParams } from "@/scripts/utils/console/console-messages-linkedin-launch";

const main = async () => {
  await checkDatabaseConnection();

  fetchingWithMessage(LINKEDIN_CURRENT_PROVIDER);

  for (const region in SEARCH_CONFIGURATIONS) {
    const { geoId, keywords } = SEARCH_CONFIGURATIONS[region];
    for (const keyword of keywords) {
      const queryIdentifier = buildSearchIdentifier(geoId, keyword);
      const timePostedRange = await calculateTimePostedRange(queryIdentifier);

      await logLinkedinJobSearchParams(timePostedRange, queryIdentifier);

      // Check if the search has been performed recently
      const searchAlreadyPerformed =
        await hasSearchBeenPerformedWithinThreshold(
          "linkedinJobSearchMeta",
          queryIdentifier,
        );

      if (searchAlreadyPerformed) {
        skipSearchMessage(keyword);
      }

      if (!searchAlreadyPerformed) {
        console.log(
          colors.cyan(
            `Starting search for keyword "${keyword}" in location "${region}"...`,
          ),
        );

        await processSearchConfig(geoId, keyword, timePostedRange);

        await updateLastSearchDateLinkedIn(queryIdentifier, geoId, keyword);
      }
    }
  }

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
};

const processSearchConfig = async (
  geoId: string,
  keyword: string,
  timePostedRange: string,
) => {
  const searchConfig = {
    keywords: keyword,
    geoId,
    timePostedRange,
  };

  const searchUrl = await buildSearchRequest(searchConfig);

  console.log(searchUrl);

  const jobResults = await getJobResults(searchUrl);
  const filteredJobResults = filterLinkedinJobResults(jobResults);

  await registerTransformedJobResultsInDB(filteredJobResults);
};

main().catch(console.error);
