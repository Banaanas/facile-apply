import { prisma } from "@prisma/db.server";
import chalk from "chalk";

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
    chalk.bgBlue(
      chalk.yellow(
        chalk.bold(
          `- Last Search Date: ${querySearch?.lastSearchAt.toLocaleDateString("fr-FR")}`,
        ),
      ),
    ),
  );

  console.log(chalk.yellow(`- Country: ${country}`));

  console.log(chalk.yellow(`- Search: ${searchKey}`));

  console.log(
    chalk.yellow(
      `- Time Posted Range: ${searchRangeDays === 1 ? "1 day" : `${searchRangeDays} days`}`,
    ),
  );
};
