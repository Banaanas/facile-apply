import { countryUrls } from "@/scripts/indeed/fetch-jobs/data/urls/country-urls";
import { Country } from "@/scripts/indeed/fetch-jobs/fetch-jobs.types";

export const buildSearchUrl = (
  country: Country,
  query: string,
  searchRangeDays: number,
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

  let url = `https://${domain}/jobs?q=${encodedQuery}&fromage=${searchRangeDays}`;

  // Include location in the URL if it's provided
  if (search.location) {
    const encodedLocation = encodeURIComponent(search.location);
    url += `&l=${encodedLocation}`;
  }

  if (search.remoteFilter) {
    // Applying the filter for "total remote" jobs
    const totalRemoteQueryParam = "0kf%3Aattr%28DSQF7%29%3B";
    url += `&sc=${totalRemoteQueryParam}`;

    // Note: This filter is for "total remote" jobs.
    // If partial remote is needed in the future, replace "DSQF7" with 'PAXZC' or the appropriate code.
  }

  return url;
};
