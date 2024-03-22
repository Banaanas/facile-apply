import {
  DatePosted,
  FlagshipSearchIntent,
  SortBy,
} from "@/scripts/linkedin/fetch-posts/data/linkedin-search-enums";

export const LINKEDIN_POST_SEARCH_COMMON_PARAMS: CommonParams = {
  flagshipSearchIntent: FlagshipSearchIntent.SEARCH_SRP,
  queryParameters: {
    contentType: ["jobs"],
    datePosted: [DatePosted.LastWeek],
    resultType: ["CONTENT"],
    sortBy: [SortBy.Relevance],
  },
};

interface CommonParams {
  start?: number;
  origin?: string;
  includeFiltersInResponse?: boolean;
  includeWebMetadata?: boolean;
  flagshipSearchIntent: FlagshipSearchIntent;
  queryParameters: QueryParameters;
}

interface QueryParameters {
  contentType: string[];
  datePosted: string[];
  resultType: string[];
  searchId?: string[];
  sortBy: string[];
}
