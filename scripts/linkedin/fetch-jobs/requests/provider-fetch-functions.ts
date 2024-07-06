import chalk from "chalk";

import {
  LINKEDIN_CURRENT_PROVIDER,
  LINKEDIN_RANDOM_DELAY_RANGE,
} from "@/scripts/linkedin/common/data/linkedin-current-provider";
import { RawLinkedinData } from "@/scripts/linkedin/fetch-jobs/parsing/transform-job-results";
import { fetchLinkedinIpRoyal } from "@/scripts/linkedin/fetch-jobs/requests/ipRoyal";
import { fetchLinkedinVPN } from "@/scripts/linkedin/fetch-jobs/requests/withVPN";
import { RawLinkedinJobData } from "@/scripts/linkedin/fetch-obsolete-jobs/parsing/get-linkedin-job-state";
import { RawLinkedinPostData } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import { waitForRandomDelay } from "@/scripts/utils/wait-random-delay";

export const providerFunctions: ProviderFetchFunctions = {
  withVPN: fetchLinkedinVPN,
  ipRoyal: fetchLinkedinIpRoyal,
};

export const fetchResultsWithProvider = async (searchUrl: string) => {
  const fetchFunction = providerFunctions[LINKEDIN_CURRENT_PROVIDER];

  // Each time we fetch, we wait for a delay - AVOIDING SERVER DETECTION
  if (LINKEDIN_RANDOM_DELAY_RANGE) {
    await waitForRandomDelay(LINKEDIN_RANDOM_DELAY_RANGE);
  }

  if (!fetchFunction) {
    throw new Error(
      chalk.red(`Fetch provider ${LINKEDIN_CURRENT_PROVIDER} is not defined.`),
    );
  }
  return fetchFunction(searchUrl);
};

interface ProviderFetchFunctions {
  withVPN: FetchFunction;
  ipRoyal: FetchFunction;
}

type FetchFunction = (
  searchUrl: string,
) => Promise<RawLinkedinData | RawLinkedinPostData | RawLinkedinJobData>;

export type ProviderName = keyof ProviderFetchFunctions;
