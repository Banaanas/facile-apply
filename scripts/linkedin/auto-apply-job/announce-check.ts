import { Page } from "playwright";

import { updateLinkedinJobStatus } from "@/actions";

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
      `Job ${indeedJobId} has been marked as Ignored due to being obsolete.`
        .red,
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
      `Job ${linkedinJobId} has been marked as Applied due to being already applied.`
        .green,
    );
  }

  return appliedByText || appliedByClass;
};
