import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-linkedin";
import { SEARCH_CONFIGURATIONS } from "@/scripts/linkedin/fetch-jobs/data/region-search-configs";
import {
  COMMON_PARAMS,
  DelayOption,
  LINKEDIN_CURRENT_PROVIDER,
} from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { getJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/get-job-results";
import { buildSearchRequest } from "@/scripts/linkedin/fetch-jobs/requests/linkedin-request-builder";
import { fetchingWithMessage } from "@/scripts/utils/console-messages";
import { logCommonSearchParams } from "@/scripts/utils/console-messages-linkedin-launch";

const main = async () => {
  await checkDatabaseConnection();

  fetchingWithMessage(LINKEDIN_CURRENT_PROVIDER);

  logCommonSearchParams();

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
    params: COMMON_PARAMS,
  };

  const searchUrl = buildSearchRequest(searchConfig);
  const jobResults = await getJobResults(searchUrl, DelayOption.ENABLED);
  await registerTransformedJobResultsInDB(jobResults);
};

main().catch(console.error);
