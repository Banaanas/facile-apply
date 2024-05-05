import { prisma } from "@prisma/db.server";

export const calculateTimePostedRange = async () => {
  // Retrieve the timestamp of the last search from the database
  const lastLinkedinJobSearch = await prisma.jobSearchMeta.findFirst({
    where: {
      jobSearchPlatform: "Linkedin",
    },
  });

  // If no previous search found, throw an error with a console message
  if (!lastLinkedinJobSearch?.lastSearchAt) {
    console.error("No previous search date found.");
    throw new Error("No previous search date found.");
  }

  // Calculate the time difference in seconds between the current time and the last search timestamp
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const timeDifference =
    currentTimestamp -
    Math.floor(lastLinkedinJobSearch.lastSearchAt.getTime() / 1000);

  // Format the time difference with an "r" prefix as expected by LinkedIn's URL parameters
  // This "r" prefix may be used by LinkedIn's systems to denote the time range
  // For example, "r31536000" could represent a time range of 1 year
  return `r${timeDifference}`;
};
