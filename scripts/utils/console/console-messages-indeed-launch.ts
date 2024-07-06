import { prisma } from "@prisma/db.server";

export const logIndeedJobSearchParams = async (
  searchKey: string,
  country: string,
  searchRangeDays: number,
  queryIdentifier: string,
) => {
  const querySearch = await prisma.indeedJobSearchMeta.findFirst({
    where: {
      identifier: queryIdentifier,
    },
  });

  console.log(
    `- Last Search Date: ${querySearch?.lastSearchAt.toLocaleDateString("fr-FR")}`
      .bgBlue.yellow.bold,
  );

  console.log(`- Country: ${country}`.yellow);

  console.log(`- Search: ${searchKey}`.yellow);

  console.log(
    `- Time Posted Range: ${searchRangeDays === 1 ? "1 day" : `${searchRangeDays} days`}`
      .yellow,
  );
};
