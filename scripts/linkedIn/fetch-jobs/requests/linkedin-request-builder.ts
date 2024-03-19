import { COMMON_PARAMS } from "@/scripts/linkedIn/fetch-jobs/data/search-params";
import { SearchConfig } from "@/scripts/linkedIn/fetch-jobs/fetch-jobs.types";

// Function to build the query string
const buildQuery = (config: SearchConfig) => {
  const { keywords, geoId } = config;
  const {
    sortBy,
    experience,
    timePostedRange,
    workplaceType,
    applyWithLinkedin,
  } = COMMON_PARAMS;

  const experienceList = experience.map((level) => level).join(",");
  const workplaceTypeList = [workplaceType].join(",");

  return `(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:${keywords},locationUnion:(geoId:${geoId}),selectedFilters:(sortBy:List(${sortBy}),applyWithLinkedin:List(${applyWithLinkedin}),experience:List(${experienceList}),timePostedRange:List(${timePostedRange}),workplaceType:List(${workplaceTypeList})),spellCorrectionEnabled:true)`;
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

export const buildSearchRequest = (config: SearchConfig): string => {
  const query = buildQuery(config);
  const url = buildUrl(query);

  return url;
};
