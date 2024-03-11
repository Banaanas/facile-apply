import { PrismaClient } from "@prisma/client";

import { TransformedScrapedIndeedJob } from "@/scripts/scripts.types";

const prisma = new PrismaClient();

export const registerTransformedJobResultsInDB = async (
  transformedJobResults: Array<TransformedScrapedIndeedJob>,
) => {
  // Use createMany with skipDuplicates
  const response = await prisma.indeedJob.createMany({
    data: transformedJobResults,
    skipDuplicates: true, // Automatically skip any duplicates
  });

  return response;
};
