import { SearchConfiguration } from "@/scripts/linkedin/fetch-posts/data/post-search-configs";
import { LINKEDIN_POST_SEARCH_COMMON_PARAMS } from "@/scripts/linkedin/fetch-posts/data/search-params";

function constructVariablesQuery(
  keywordsArray: SearchConfiguration["keywords"],
): string {
  const keywords = keywordsArray.join(" ");

  const queryParams = LINKEDIN_POST_SEARCH_COMMON_PARAMS.queryParameters;
  const paramsString = Object.entries(queryParams)
    .map(([key, value]) => `(key:${key},value:List(${value}))`)
    .join(",");

  return `(start:0,origin:FACETED_SEARCH,query:(keywords:${keywords},flagshipSearchIntent:SEARCH_SRP,queryParameters:List(${paramsString}),includeFiltersInResponse:false))`;
}

export const buildLinkedInQueryUrl = (
  keywordsArray: SearchConfiguration["keywords"],
): string => {
  const baseUrl = "https://www.linkedin.com/voyager/api/graphql";
  const queryId = "voyagerSearchDashClusters.d4451c297da648bcf575b8681edabce4";
  const variablesQuery = constructVariablesQuery(keywordsArray);

  return `${baseUrl}?variables=${variablesQuery}&queryId=${queryId}`;
};
