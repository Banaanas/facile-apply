import { prisma } from "@prisma/db.server";

export const calculateDaysRange = async (identifier: string) => {
  // Retrieve the timestamp of the last search from the database
  const lastIndeedJobSearch = await prisma.indeedJobSearchMeta.findFirst({
    where: {
      identifier,
    },
  });

  // If no previous search found, throw an error with a console message
  if (!lastIndeedJobSearch?.lastSearchAt) {
    console.error("No previous search date found.");
    throw new Error("No previous search date found.");
  }

  // Calculate the time difference in milliseconds between the current time and the last search timestamp
  const currentTimestamp = Date.now();
  const lastSearchTimestamp = lastIndeedJobSearch.lastSearchAt.getTime();
  const timeDifference = currentTimestamp - lastSearchTimestamp;

  // Convert milliseconds to days and round down to the nearest whole number
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Return the number of days, ensuring it's at least 1
  return Math.max(daysDifference, 1);
};
