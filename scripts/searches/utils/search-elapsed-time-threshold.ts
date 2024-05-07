import { prisma } from "@prisma/db.server";

export const SEARCH_HOURS_ELAPSED_THRESHOLD = 8;
const MS_IN_ONE_HOUR = 60 * 60 * 1000;

export const hasSearchBeenPerformedWithinThreshold = async (
  jobSearchMeta: "indeedJobSearchMeta" | "linkedinJobSearchMeta",
  queryIdentifier: string,
): Promise<boolean> => {
  const thresholdInMs = SEARCH_HOURS_ELAPSED_THRESHOLD * MS_IN_ONE_HOUR;

  let lastSearch;

  if (jobSearchMeta === "indeedJobSearchMeta") {
    lastSearch = await prisma.indeedJobSearchMeta.findFirst({
      where: {
        identifier: queryIdentifier,
        lastSearchAt: {
          gte: new Date(Date.now() - thresholdInMs),
        },
      },
    });
  }

  if (jobSearchMeta === "linkedinJobSearchMeta") {
    lastSearch = await prisma.linkedinJobSearchMeta.findFirst({
      where: {
        identifier: queryIdentifier,
        lastSearchAt: {
          gte: new Date(Date.now() - thresholdInMs),
        },
      },
    });
  }

  return !!lastSearch;
};
