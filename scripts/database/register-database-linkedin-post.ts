import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

import { TransformedScrapedLinkedinPost } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";

const prisma = new PrismaClient();

export const registerTransformedPostResultsInDB = async (
  transformedPostResults: Array<TransformedScrapedLinkedinPost>,
) => {
  // Use createMany with skipDuplicates
  const response = await prisma.linkedinPost.createMany({
    data: transformedPostResults,
    skipDuplicates: true, // Automatically skip any duplicates
  });

  const newlyRegisteredCount = response.count;

  console.log(
    chalk.green(
      `Registered ${newlyRegisteredCount} ${newlyRegisteredCount > 1 ? "posts" : "post"} in the database.`,
    ),
  );

  return response;
};
