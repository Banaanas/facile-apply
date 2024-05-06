import { enabledCountries } from "@/scripts/linkedin/fetch-posts/data/enabled-countries";

export const normalizeAndMatchCountry = (locationString: string | null) => {
  if (!locationString) {
    // If the input is undefined or an empty string, return null immediately.
    return null;
  }

  // Split and normalize the location string
  const locationParts = locationString
    .split(",")
    .map((part) => part.trim().toLowerCase());

  // Attempt to match each part against the enabled countries list
  for (const part of locationParts) {
    const matchedCountry = enabledCountries.find(
      (country) =>
        country.name.toLowerCase() === part ||
        country.code.toLowerCase() === part,
    );
    if (matchedCountry) {
      return matchedCountry; // Return the first matched country
    }
  }

  return null;
};
