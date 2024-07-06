import chalk from "chalk";
import { Page } from "playwright";

import { updateLinkedinJobStatus } from "@/actions";

// We could not use here our getLinkedinJobState function, because this function uses
// a verifyVPNUsage function to verify that we are using a VPN while we fetch the job info. But in our case, we
// don't want to use a VPN, because we are applying through our normal Linkedin Account.

export const checkAndUpdateIfJobIsObsolete = async (
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
