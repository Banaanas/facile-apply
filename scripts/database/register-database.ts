import { PrismaClient } from "@prisma/client";

import { TransformedScrapedIndeedJob } from "@/scripts/fetch-jobs/fetch-jobs.types";

const prisma = new PrismaClient();

export const registerTransformedJobResultsInDB = async (
  transformedJobResults: Array<TransformedScrapedIndeedJob>,
  indeedSearchUrl: string,
) => {
  // Use createMany with skipDuplicates
  const response = await prisma.indeedJob.createMany({
    data: transformedJobResults,
    skipDuplicates: true, // Automatically skip any duplicates
  });

  const newlyRegisteredCount = response.count;

  console.log(indeedSearchUrl);
  console.log(
    `Registered ${newlyRegisteredCount} ${newlyRegisteredCount > 1 ? "jobs" : "job"} in the database.`,
  );

  return response;
};
