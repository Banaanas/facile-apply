import console from "node:console";

import { PrismaClient } from "@prisma/client";
import colors from "colors";

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

  console.log(colors.gray(indeedSearchUrl));
  console.log(
    colors.green(
      `Registered ${newlyRegisteredCount} ${newlyRegisteredCount > 1 ? "jobs" : "job"} in the database.`,
    ),
  );

  return response;
};
