import { prisma } from "@prisma/db.server";
import colors from "colors";

export const logCommonIndeedJobSearchParams = async () => {
  const lastIndeedJobSearch = await prisma.jobSearchMeta.findFirst({
    where: {
      jobSearchPlatform: "Indeed",
    },
  });

  console.log(
    colors.cyan("Initializing search with the following common parameters:"),
  );

  console.log(
    colors.bgBlue(
      colors.yellow(
        colors.bold(
          `- Last Search Date: ${lastIndeedJobSearch?.lastSearchAt.toLocaleDateString("fr-FR")}`,
        ),
      ),
    ),
  );
};
