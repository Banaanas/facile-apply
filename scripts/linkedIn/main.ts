import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { registerTransformedJobResultsInDB } from "@/scripts/database/register-database-linkedin";
import {
  DelayOption,
  LINKEDIN_SEARCH,
} from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { getJobResults } from "@/scripts/linkedin/fetch-jobs/parsing/get-job-results";

const main = async () => {
  // If Database is not already running, STOP the process - Avoiding costs of fetching pages that won't be registered in the database after
  await checkDatabaseConnection();
  console.log(colors.cyan(`Searching ${LINKEDIN_SEARCH}...`));

  const jobResults = await getJobResults(LINKEDIN_SEARCH, DelayOption.ENABLED);

  await registerTransformedJobResultsInDB(jobResults);
  console.log(`Total jobs fetched: ${jobResults.length}`);
  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
};

main().catch(console.error);
