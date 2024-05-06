import { prisma } from "@prisma/db.server";

import { SEARCH_CONFIGURATIONS } from "@/scripts/linkedin/fetch-jobs/data/region-search-configs";
import { buildSearchIdentifier } from "@/scripts/searches/utils/build-search-identifier";

const seedLinkedinJobSearchMeta = async () => {
  // RESET TABLE
  //  await prisma.linkedinJobSearchMeta.deleteMany({});

  // Set the date X days ago
  const twoDaysAgo = new Date();
  const DAYS_AGO = 2;
  twoDaysAgo.setDate(twoDaysAgo.getDate() - DAYS_AGO);

  for (const [region, config] of Object.entries(SEARCH_CONFIGURATIONS)) {
    for (const keyword of config.keywords) {
      const identifier = buildSearchIdentifier(config.geoId, keyword);

      await prisma.linkedinJobSearchMeta.upsert({
        where: {
          identifier,
        },
        create: {
          identifier,
          geoId: config.geoId,
          query: keyword,
          lastSearchAt: twoDaysAgo,
        },
        update: {
          lastSearchAt: twoDaysAgo,
        },
      });
    }
  }

  console.log("Seeding of LinkedinJobSearchMeta table completed.");
};

seedLinkedinJobSearchMeta().catch(console.error);
