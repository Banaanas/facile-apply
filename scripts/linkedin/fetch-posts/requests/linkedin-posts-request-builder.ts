import { COMMON_PARAMS } from "@/scripts/linkedin/fetch-posts/data/search-params";

function constructVariablesQuery(keywords: string): string {
  const queryParams = COMMON_PARAMS.queryParameters;
  const paramsString = Object.entries(queryParams)
    .map(([key, value]) => `(key:${key},value:List(${value}))`)
    .join(",");

  return `(start:0,origin:FACETED_SEARCH,query:(keywords:${keywords},flagshipSearchIntent:SEARCH_SRP,queryParameters:List(${paramsString}),includeFiltersInResponse:false))`;
}

export const buildLinkedInQueryUrl = (keywords: string): string => {
  const baseUrl = "https://www.linkedin.com/voyager/api/graphql";
  const queryId = "voyagerSearchDashClusters.d4451c297da648bcf575b8681edabce4";
  const variablesQuery = constructVariablesQuery(keywords);

  return `${baseUrl}?variables=${variablesQuery}&queryId=${queryId}`;
};
