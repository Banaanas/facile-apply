import chalk from "chalk";
import { Page } from "playwright";

import { updateLinkedinJobStatus } from "@/actions";
import { getLinkedinJobState } from "@/scripts/linkedin/fetch-obsolete-jobs/parsing/get-linkedin-job-state";
import { prisma } from "@prisma/db.server";

export const checkAndUpdateIfJobIsObsolete = async (
  page: Page,
  indeedJobId: number,
): Promise<boolean> => {
  // Retrieve the job from the database to get the jobUrn
  const job = await prisma.linkedinJob.findUnique({
    where: {
      id: indeedJobId,
    },
  });

  if (!job) {
    console.log(chalk.red(`Job with ID ${indeedJobId} not found.`));
    return false;
  }

  const jobUrn = job.jobUrn;
  const linkedinJobState = await getLinkedinJobState(jobUrn);

  if (linkedinJobState === "CLOSED" || linkedinJobState === "SUSPENDED") {
    console.log(linkedinJobState);
    console.log(job.link);

    await updateLinkedinJobStatus(indeedJobId, "Ignored");
    console.log(
      chalk.red(
        `Job ${indeedJobId} has been marked as Ignored due to being ${linkedinJobState}.`,
      ),
    );

    return true;
  }

  // Perform the visual/manual check for expiration IF PREVIOUS CHECK DID NOT FIND NOTHING
  const isVisuallyExpired = await performVisualCheckForExpiration(
    page,
    indeedJobId,
  );

  return isVisuallyExpired;
};

const performVisualCheckForExpiration = async (
  page: Page,
  indeedJobId: number,
): Promise<boolean> => {
  // Check for the specific elements that indicate the job has expired
  const hasExpiredNotice =
    (await page
      .locator('text="Les candidatures ne sont plus acceptées"')
      .count()) > 0;

  if (hasExpiredNotice) {
    await updateLinkedinJobStatus(indeedJobId, "Ignored");
    console.log(
      chalk.red(
        `Job ${indeedJobId} has been marked as Ignored due to being obsolete.`,
      ),
    );
  }

  return hasExpiredNotice;
};

export const checkIfAlreadyApplied = async (
  page: Page,
  linkedinJobId: number,
): Promise<boolean> => {
  // Check if the "Candidature envoyée" text is present
  const appliedByText =
    (await page.locator('text="Candidature envoyée"').count()) > 0 ||
    (await page.locator('text="CV envoyé"').count()) > 0;

  // Check if the "post-apply-timeline__entity" class is present
  const appliedByClass =
    (await page.locator(".post-apply-timeline__entity").count()) > 0;

  // Log and potentially update job status only if already applied
  if (appliedByText || appliedByClass) {
    await updateLinkedinJobStatus(linkedinJobId, "Applied");
    console.log(
      chalk.green(
        `Job ${linkedinJobId} has been marked as Applied due to being already applied.`,
      ),
    );
  }

  return appliedByText || appliedByClass;
};
