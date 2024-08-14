import { LINKEDIN_JOB_SEARCH_COMMON_PARAMS } from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { SearchConfig } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";

// Note: The final URL is constructed based on the LinkedIn API request format.
// This URL is not the same as the one you see in the browser's address bar.
// Instead, it is based on the API requests observed through the developer tools (Network tab).


// Function to build the query string
const buildQuery = async (searchConfig: SearchConfig) => {
  const {
    keywords,
    geoId,
    timePostedRange,
    applyWithLinkedin,
    workplaceType,
    lessThan10Candidatures,
  } = searchConfig;

  const { sortBy, experience } = LINKEDIN_JOB_SEARCH_COMMON_PARAMS;
  const experienceList = experience.map((level) => level).join(",");

  const filters = [
    `sortBy:List(${sortBy})`,
    `applyWithLinkedin:List(${applyWithLinkedin})`,
    `experience:List(${experienceList})`,
    `timePostedRange:List(${timePostedRange})`,
  ];

  if (workplaceType) {
    filters.push(`workplaceType:List(${workplaceType})`);
  }

  if (lessThan10Candidatures) {
    filters.push("earlyApplicant:List(true)");
  }


  return `(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:${keywords},locationUnion:(geoId:${geoId}),selectedFilters:(${filters.join(
    ",",
  )}),spellCorrectionEnabled:true)`;
};

// Function to build the final URL
const buildUrl = (query: string) => {
  const baseUrl =
    "https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards";
  const decorationId =
    "com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195";
  const count = 25; // Number of results to return
  const start = 0; // Pagination start

  return `${baseUrl}?decorationId=${decorationId}&count=${count}&q=jobSearch&query=${query}&start=${start}`;
};

export const buildSearchRequest = async (
  searchConfig: SearchConfig,
): Promise<string> => {
  const query = await buildQuery(searchConfig);
  const url = buildUrl(query);

  return url;
};
