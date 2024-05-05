import { JobSearchPlatform } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import colors from "colors";

export const updateLastSearchDate = async (
  jobSearchPlatform: JobSearchPlatform,
) => {
  try {
    // Find or create the record for the specified platform
    const jobSearchMeta = await prisma.jobSearchMeta.upsert({
      where: { jobSearchPlatform },
      update: { lastSearchAt: new Date() },
      create: { jobSearchPlatform, lastSearchAt: new Date() },
    });

    console.log(
      colors.green(
        `Last search date updated for ${jobSearchPlatform}: ${jobSearchMeta.lastSearchAt.toDateString()}`,
      ),
    );
  } catch (error) {
    console.error(
      `Error updating last search date for ${jobSearchPlatform}:`,
      error,
    );
  } finally {
    await prisma.$disconnect();
  }
};
