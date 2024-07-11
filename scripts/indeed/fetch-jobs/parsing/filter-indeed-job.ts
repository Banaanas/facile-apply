import { TransformedScrapedIndeedJob } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";
import { filterKeywords } from "@/scripts/utils/filters/filter-keywords";
import { filterLanguages } from "@/scripts/utils/filters/filter-languages";
import { filtersCompanies } from "@/scripts/utils/filters/filter-companies";

export const filterIndeedJobResults = (
  jobResults: Array<TransformedScrapedIndeedJob>,
): Array<TransformedScrapedIndeedJob> => {
  return jobResults.filter((jobResult) => {
    const titleLowercase = jobResult.title.toLowerCase();
    const companyLowercase = jobResult.company.toLowerCase();

    const hasLanguageInTitle = filterLanguages.some((language) =>
      titleLowercase.includes(language.toLowerCase()),
    );

    const hasKeywordInTitle = filterKeywords.some((keyword) =>
      titleLowercase.includes(keyword.toLowerCase()),
    );

    const hasCompanyInJobCompany = filtersCompanies
      .map((company) => company.toLowerCase())
      .includes(companyLowercase.trim());

    return !(hasLanguageInTitle || hasKeywordInTitle || hasCompanyInJobCompany);
  });
};
