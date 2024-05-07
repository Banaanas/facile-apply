import console from "node:console";

import { prisma } from "@prisma/db.server";
import colors from "colors";

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
    colors.bgBlue(
      colors.yellow(
        colors.bold(
          `- Last Search Date: ${querySearch?.lastSearchAt.toLocaleDateString("fr-FR")}`,
        ),
      ),
    ),
  );

  console.log(colors.yellow(`- Country: ${country}`));

  console.log(colors.yellow(`- Search: ${searchKey}`));

  console.log(
    colors.yellow(
      `- Time Posted Range: ${searchRangeDays === 1 ? "1 day" : `${searchRangeDays} days`}`,
    ),
  );
};
