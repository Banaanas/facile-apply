import { JobStatus } from "@prisma/client";
import { prisma } from "@prisma/db.server";
import colors from "colors";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { getLinkedinJobState } from "@/scripts/linkedin/fetch-obsolete-jobs/parsing/get-linkedin-job-state";

// Get all NOT REVIEWED Jobs that are SUSPENDED or CLOSE and update status as IGNORED
const main = async () => {
  await checkDatabaseConnection();

  console.log("Fetching all jobs with NotReviewed status...");
  const jobs = await prisma.linkedinJob.findMany({
    where: {
      status: JobStatus.NotReviewed,
    },
  });
  let jobsConverted = 0; // Initialize the counter

  for (const job of jobs) {
    const linkedinJobState = await getLinkedinJobState(job.jobUrn);

    if (linkedinJobState === "CLOSED" || linkedinJobState === "SUSPENDED") {
      console.log(linkedinJobState);
      console.log(job.link);

      await prisma.linkedinJob.update({
        where: {
          id: job.id,
        },
        data: {
          status: JobStatus.Ignored,
        },
      });
    }
  }
  jobsConverted++; // Increment the counter

  console.log(
    colors.rainbow(
      `ALL SEARCHES HAVE BEEN COMPLETED. Number of jobs converted: ${jobsConverted}`,
    ),
  );
};

main().catch(console.error);
