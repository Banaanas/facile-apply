import { IndeedJobSearchMeta, LinkedinJobSearchMeta } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import chalk from "chalk";

export const updateLastSearchDateIndeed = async (
  queryIdentifier: IndeedJobSearchMeta["identifier"],
  domain: IndeedJobSearchMeta["domain"],
  query: IndeedJobSearchMeta["query"],
) => {
  try {
    const jobSearchMeta = await prisma.indeedJobSearchMeta.upsert({
      where: { identifier: queryIdentifier },
      update: { lastSearchAt: new Date() },
      create: {
        identifier: queryIdentifier,
        domain,
        query,
        lastSearchAt: new Date(),
      },
    });

    console.log(
      chalk.green(
        `Last search date updated for ${query}: ${jobSearchMeta.lastSearchAt.toDateString()}`,
      ),
    );
  } catch (error) {
    console.error(`Error updating last search date for Indeed:`, error);
  } finally {
    await prisma.$disconnect();
  }
};

export const updateLastSearchDateLinkedIn = async (
  queryIdentifier: LinkedinJobSearchMeta["identifier"],
  geoId: LinkedinJobSearchMeta["geoId"],
  query: LinkedinJobSearchMeta["query"],
) => {
  try {
    const jobSearchMeta = await prisma.linkedinJobSearchMeta.upsert({
      where: { identifier: queryIdentifier },
      update: { lastSearchAt: new Date() },
      create: {
        identifier: queryIdentifier,
        geoId,
        query,
        lastSearchAt: new Date(),
      },
    });

    console.log(
      chalk.green(
        `Last search date updated for ${query}: ${jobSearchMeta.lastSearchAt.toDateString()}`,
      ),
    );
  } catch (error) {
    console.error(`Error updating last search date for LinkedIn:`, error);
  } finally {
    await prisma.$disconnect();
  }
};
