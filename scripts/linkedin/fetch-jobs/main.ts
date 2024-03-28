import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-linkedin-job";
import { LINKEDIN_CURRENT_PROVIDER } from "@/scripts/linkedin/common/data/linkedin-current-provider";
import { SEARCH_CONFIGURATIONS } from "@/scripts/linkedin/fetch-jobs/data/region-search-configs";
import {
  LINKEDIN_JOB_SEARCH_COMMON_PARAMS,
} from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { getJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/get-job-results";
import { buildSearchRequest } from "@/scripts/linkedin/fetch-jobs/requests/linkedin-request-builder";
import { fetchingWithMessage } from "@/scripts/utils/console/console-messages";
import { logCommonLinkedinJobSearchParams } from "@/scripts/utils/console/console-messages-linkedin-launch";
import { filterLinkedinJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/filter-linkedin-job";

const main = async () => {
  await checkDatabaseConnection();

  fetchingWithMessage(LINKEDIN_CURRENT_PROVIDER);

  logCommonLinkedinJobSearchParams();

  for (const region in SEARCH_CONFIGURATIONS) {
    const { geoId, keywords } = SEARCH_CONFIGURATIONS[region];
    for (const keyword of keywords) {
      console.log(
        colors.cyan(
          `Starting search for keyword "${keyword}" in location "${region}"...`,
        ),
      );

      await processSearchConfig(geoId, keyword);
    }
  }

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
};

const processSearchConfig = async (geoId: string, keyword: string) => {
  const searchConfig = {
    keywords: keyword,
    geoId,
    params: LINKEDIN_JOB_SEARCH_COMMON_PARAMS,
  };

  const searchUrl = buildSearchRequest(searchConfig);

  const jobResults = await getJobResults(searchUrl);
  const filteredJobResults = filterLinkedinJobResults(jobResults);

  await registerTransformedJobResultsInDB(filteredJobResults);
};

main().catch(console.error);
