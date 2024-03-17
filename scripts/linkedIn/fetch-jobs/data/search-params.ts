import { ProviderName } from "@/scripts/linkedIn/fetch-jobs/requests/provider-fetch-functions";

export const CURRENT_PROVIDER: ProviderName = "withoutProxy";

export const DelayOption = {
  ENABLED: true,
  DISABLED: false,
};

export const LINKEDIN_SEARCH =
  "https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195&count=25&q=jobSearch&query=(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:react,locationUnion:(geoId:105015875),selectedFilters:(sortBy:List(R),experience:List(2),timePostedRange:List(r2592000),workplaceType:List(2)),spellCorrectionEnabled:true)&start=0";
