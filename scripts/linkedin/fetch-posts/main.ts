import chalk from "chalk";

import { registerTransformedPostResultsInDB } from "@/scripts/database/register-database-linkedin-post";
import { POST_SEARCH_CONFIGURATIONS } from "@/scripts/linkedin/fetch-posts/data/post-search-configs";
import { getPostResults } from "@/scripts/linkedin/fetch-posts/parsing/get-post-results";
import { buildLinkedInQueryUrl } from "@/scripts/linkedin/fetch-posts/requests/linkedin-posts-request-builder";
import { checkDatabaseConnection } from "@/scripts/utils/check-ip-vp/check-running-database";
import { logCommonLinkedinPostSearchParams } from "@/scripts/utils/console/console-messages-linkedin-launch";
import { filterLinkedinPostResults } from "@/scripts/linkedin/fetch-posts/parsing/filter-linkedin-post";

const main = async () => {
  await checkDatabaseConnection();

  for (const configName in POST_SEARCH_CONFIGURATIONS) {
    // Destructure keywords from each configuration
    const { keywords } = POST_SEARCH_CONFIGURATIONS[configName];

    // Assuming logCommonLinkedinPostSearchParams function can handle array of strings directly
    logCommonLinkedinPostSearchParams(keywords);

    const searchUrl = buildLinkedInQueryUrl(keywords);
    try {
      const postResults = await getPostResults(searchUrl);

      const filteredResults = filterLinkedinPostResults(postResults);

      await registerTransformedPostResultsInDB(filteredResults);
    } catch (error) {
      console.error(
        chalk.red("Error fetching LinkedIn data for configuration: "),
        configName,
        error,
      );
      // Optionally, handle the error or continue with the next configuration
    }
  }

  console.log(
    chalk.bgMagentaBright.whiteBright.bold("ALL SEARCHES HAVE BEEN COMPLETED"),
  );
};

main().catch(console.error);
