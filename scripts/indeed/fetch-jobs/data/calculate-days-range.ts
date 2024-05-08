import { prisma } from "@prisma/db.server";

export const calculateDaysRange = async (identifier: string) => {
  const lastIndeedJobSearch = await prisma.indeedJobSearchMeta.findFirst({
    where: {
      identifier,
    },
  });

  if (!lastIndeedJobSearch?.lastSearchAt) {
    console.error("No previous search date found.");
    throw new Error("No previous search date found.");
  }

  // Convert Date objects to timestamps before subtraction
  const currentTimestamp = new Date().getTime(); // gets the current time as a timestamp
  const lastSearchTimestamp = new Date(
    lastIndeedJobSearch.lastSearchAt,
  ).getTime(); // converts the last search date to a timestamp

  // Calculate the difference in milliseconds
  const timeDifference = currentTimestamp - lastSearchTimestamp;

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  // Use Math.ceil to round up to the nearest whole number
  const daysRange = Math.ceil(daysDifference);

  return daysRange;
};
