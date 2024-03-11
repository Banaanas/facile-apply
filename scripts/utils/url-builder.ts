import { countryUrls } from "@/scripts/data/urls/country-urls";
import { Country } from "@/scripts/scripts.types";

export const buildSearchUrl = (
  country: Country,
  query: string,
  overrideDateFilter?: number,
): string => {
  const countryConfig = countryUrls[country];

  if (!countryConfig) {
    throw new Error(`Country '${country}' is not configured.`);
  }

  const search = Object.values(countryConfig.searches).find(
    (s) => s.query === query,
  );

  if (!search) {
    throw new Error(
      `Search '${query}' is not configured for country '${country}'.`,
    );
  }

  const { domain } = countryConfig;
  const encodedQuery = encodeURIComponent(query);
  // Use overrideDateFilter if provided, otherwise fall back to the search's dateFilter
  const dateFilter =
    overrideDateFilter !== undefined ? overrideDateFilter : search.dateFilter;
  let url = `https://${domain}/jobs?q=${encodedQuery}&fromage=${dateFilter}`;
  if (search.remoteFilter) {
    const remoteQuery = "remotejob=032b3046-06a3-4876-8dfd-474eb5e7ed11";
    url += `&${remoteQuery}`;
  }

  return url;
};
