import { TransformedScrapedLinkedinJob } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";
import { filtersCompanies } from "@/scripts/utils/filters/filter-companies";
import { filterKeywords } from "@/scripts/utils/filters/filter-keywords";
import { filterLanguages } from "@/scripts/utils/filters/filter-languages";
import { filtersLocation } from "@/scripts/utils/filters/filter-locations";

export const filterLinkedinJobResults = (
  jobResults: Array<TransformedScrapedLinkedinJob>,
): Array<TransformedScrapedLinkedinJob> => {
  return jobResults.filter((jobResult) => {
    const titleLowercase = jobResult.title.toLowerCase();
    const locationLowercase = jobResult.location.toLowerCase();
    const companyLowercase = jobResult.company.toLowerCase();

    const hasLanguageInTitle = filterLanguages.some((language) =>
      titleLowercase.includes(language.toLowerCase()),
    );

    const hasKeywordInTitle = filterKeywords.some((keyword) =>
      titleLowercase.includes(keyword.toLowerCase()),
    );

    // Convert filtersLocation to lowercase for comparison
    const hasLocationInJobLocation = filtersLocation
      .map((location) => location.toLowerCase())
      .includes(locationLowercase);

    // Convert filtersCompanies to lowercase for comparison
    const hasCompanyInJobCompany = filtersCompanies
      .map((company) => company.toLowerCase())
      .includes(companyLowercase.trim());

    return !(
      hasLanguageInTitle ||
      hasKeywordInTitle ||
      hasLocationInJobLocation ||
      hasCompanyInJobCompany
    );
  });
};
