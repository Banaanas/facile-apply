import { prisma } from "@prisma/db.server";

import { countryUrls } from "@/scripts/indeed/fetch-jobs/data/urls/country-urls";
import { buildSearchIdentifier } from "@/scripts/searches/utils/build-search-identifier";

const seedIndeedJobSearchMeta = async () => {
  // RESET TABLE
  await prisma.indeedJobSearchMeta.deleteMany({});

  // Set the date X days ago
  const twoDaysAgo = new Date();
  const DAYS_AGO = 2;
  twoDaysAgo.setDate(twoDaysAgo.getDate() - DAYS_AGO);

  // Iterate over each country URL
  for (const [country, details] of Object.entries(countryUrls)) {
    // Now iterate over each search query within the country
    for (const [searchKey, searchQuery] of Object.entries(details.searches)) {
      // Determine the unique identifier for this search
      const identifier = buildSearchIdentifier(
        details.domain,
        searchQuery.query,
        searchQuery.location,
        searchQuery.remoteFilter,
      );
      await prisma.indeedJobSearchMeta.upsert({
        where: {
          identifier: identifier, // Use a unique identifier here
        },
        create: {
          identifier,
          domain: details.domain,
          query: searchQuery.query,
          location: searchQuery.location || null, // Ensure location is handled correctly
          remoteFilter: searchQuery.remoteFilter,
          lastSearchAt: twoDaysAgo,
        },
        update: {
          lastSearchAt: twoDaysAgo,
        },
      });
    }
  }

  console.log("Seeding of IndeedJobSearchMeta table completed.");
};

seedIndeedJobSearchMeta().catch(console.error);
