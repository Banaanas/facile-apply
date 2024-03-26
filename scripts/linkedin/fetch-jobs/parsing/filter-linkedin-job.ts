import { TransformedScrapedLinkedinJob } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";
import { filterKeywords } from "@/scripts/utils/filters/filter-keywords";
import { filterLanguages } from "@/scripts/utils/filters/filter-languages";
import { filtersLocation } from "@/scripts/utils/filters/filter-location";

export const filterLinkedinJobResults = (
  jobResults: Array<TransformedScrapedLinkedinJob>,
): Array<TransformedScrapedLinkedinJob> => {
  return jobResults.filter((jobResult) => {
    const titleLowercase = jobResult.title.toLowerCase();
    const locationLowercase = jobResult.location.toLowerCase();

    const hasLanguageInTitle = filterLanguages.some((language) =>
      titleLowercase.includes(language.toLowerCase()),
    );

    const hasKeywordInTitle = filterKeywords.some((keyword) =>
      titleLowercase.includes(keyword.toLowerCase()),
    );

    const hasLocationInJobLocation =
      filtersLocation.includes(locationLowercase);

    return !(
      hasLanguageInTitle ||
      hasKeywordInTitle ||
      hasLocationInJobLocation
    );
  });
};
