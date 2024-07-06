import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

import { TransformedScrapedLinkedinJob } from "@/scripts/linkedin/fetch-jobs/fetch-jobs.types";

const prisma = new PrismaClient();

export const registerTransformedJobResultsInDB = async (
  transformedJobResults: Array<TransformedScrapedLinkedinJob>,
) => {
  // Use createMany with skipDuplicates
  const response = await prisma.linkedinJob.createMany({
    data: transformedJobResults,
    skipDuplicates: true, // Automatically skip any duplicates
  });

  const newlyRegisteredCount = response.count;

  console.log(
    chalk.green(
      `Registered ${newlyRegisteredCount} ${newlyRegisteredCount > 1 ? "jobs" : "job"} in the database.`,
    ),
  );

  return response;
};
