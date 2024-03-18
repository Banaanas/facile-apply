import { SearchConfig } from "@/scripts/linkedIn/fetch-jobs/fetch-jobs.types";

export const buildSearchRequest = (config: SearchConfig): string => {
  const { keywords, geoId, selectedFilters } = config;
  const {
    sortBy,
    experience,
    timePostedRange,
    workplaceType,
    applyWithLinkedin,
  } = selectedFilters;

  // Correctly constructing and encoding the query
  const queryParts = [
    `origin:JOB_SEARCH_PAGE_JOB_FILTER`,
    `keywords:${encodeURIComponent(keywords)}`,
    `locationUnion:(geoId:${geoId})`,
    `selectedFilters:(sortBy:List(${sortBy})`,
    `applyWithLinkedin:List(${applyWithLinkedin})`,
    `experience:List(${experience.join(",")})`,
    `timePostedRange:List(${timePostedRange})`,
    `workplaceType:List(${workplaceType.join(",")}))`,
    `spellCorrectionEnabled:true`,
  ];

  // Joining the parts of the query ensures that only necessary parts are encoded
  const query = `(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:${keywords},locationUnion:(geoId:${geoId}),selectedFilters:(sortBy:List(${sortBy}),applyWithLinkedin:List(${applyWithLinkedin ? "true" : "false"}),experience:List(${experience.join(",")}),timePostedRange:List(${timePostedRange}),workplaceType:List(${workplaceType.join(",")})),spellCorrectionEnabled:true)`;

  const baseUrl =
    "https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards";
  const decorationId =
    "com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195";
  const count = 25; // Number of results to return
  const start = 0; // Pagination start

  // Assemble the final URL with proper encoding of the query part
  const url = `${baseUrl}?decorationId=${decorationId}&count=${count}&q=jobSearch&query=${query}&start=${start}`;

  console.log(url); // For debugging

  return url;
};
