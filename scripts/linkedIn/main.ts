import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-linkedin";
import { searchConfigs } from "@/scripts/linkedIn/fetch-jobs/data/linkedin-search-configs";
import {
  DelayOption,
  LINKEDIN_SEARCH,
} from "@/scripts/linkedIn/fetch-jobs/data/search-params";
import { getJobResults } from "@/scripts/linkedIn/fetch-jobs/parsing/get-job-results";
import { buildSearchRequest } from "@/scripts/linkedIn/fetch-jobs/requests/linkedin-request-builder";

const main = async () => {
  await checkDatabaseConnection();
  for (const configKey in searchConfigs) {
    await processSearchConfig(configKey);
  }
  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
};

const processSearchConfig = async (configKey: string) => {
  const config = searchConfigs[configKey];
  const searchUrl = buildSearchRequest(config);
  const jobResults = await getJobResults(searchUrl, DelayOption.ENABLED);
  await registerTransformedJobResultsInDB(jobResults);
  console.log(`Total ${configKey} jobs fetched: ${jobResults.length}`);
};

main().catch(console.error);
