import { prisma } from "@prisma/db.server";

import { countryUrls } from "@/scripts/indeed/fetch-jobs/data/urls/country-urls";
import { buildSearchIdentifier } from "@/scripts/searches/utils/build-search-identifier";

const seedIndeedJobSearchMeta = async () => {
  // RESET TABLE
  //  await prisma.indeedJobSearchMeta.deleteMany({});

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
      );
      // Create a new row in the IndeedJobSearchMeta table if it doesn't exist
      await prisma.indeedJobSearchMeta.upsert({
        where: { identifier },
        create: {
          identifier,
          domain: details.domain,
          query: searchQuery.query,
          lastSearchAt: twoDaysAgo, // Set the last search date to two days ago
        },
        update: { lastSearchAt: twoDaysAgo }, // Update the last search date if the row already exists
      });
    }
  }

  console.log("Seeding of IndeedJobSearchMeta table completed.");
};

seedIndeedJobSearchMeta().catch(console.error);
