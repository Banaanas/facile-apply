import { filtersCompanies } from "@/scripts/utils/filters/filter-companies";
import { TransformedScrapedLinkedinPost } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import { normalizeAndMatchCountry } from "@/scripts/linkedin/fetch-posts/utils/normalize-match-countries";

export const filterLinkedinPostResults = (
  postResults: Array<TransformedScrapedLinkedinPost>,
): Array<TransformedScrapedLinkedinPost> => {
  return postResults.filter((post) => {
    // Normalize and match country
    const matchedCountry = normalizeAndMatchCountry(post?.authorCountry);
    if (!matchedCountry) {
      return false;
    }

    // Filter based on company name
    const companyLowercase = post.authorName.toLowerCase();
    const hasCompanyInPostAuthorName = filtersCompanies
      .map((company) => company.toLowerCase())
      .includes(companyLowercase.trim());

    return !hasCompanyInPostAuthorName;
  });
};
