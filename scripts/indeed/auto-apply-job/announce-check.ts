import chalk from "chalk";
import { Page } from "playwright";

import { updateIndeedJobStatus } from "@/actions";

export const checkAndUpdateIfJobIsObsolete = async (
  page: Page,
  indeedJobId: number,
): Promise<boolean> => {
  // Check for the specific elements that indicate the job has expired
  const hasExpiredNotice =
    (await page.locator('text="This job has expired on Indeed"').count()) > 0 ||
    (await page.locator('text="Cette offre a expiré sur Indeed"').count()) > 0;
  const hasNotFoundNotice =
    (await page.locator("h1", { hasText: "We can't find this page" }).count()) >
      0 ||
    (await page.locator("h1", { hasText: "Page introuvable" }).count()) > 0;

  if (hasExpiredNotice || hasNotFoundNotice) {
    await updateIndeedJobStatus(indeedJobId, "Ignored");
    console.log(
      chalk.red(
        `Job ${indeedJobId} has been marked as Ignored due to being obsolete.`,
      ),
    );
  }

  return hasExpiredNotice || hasNotFoundNotice;
};

export const checkIfAlreadyApplied = async (
  page: Page,
  indeedJobId: number,
): Promise<boolean> => {
  const appliedByText =
    (await page.locator('text="Candidature envoyée"').count()) > 0;
  const appliedByClass =
    (await page.locator(".indeed-apply-status-applied").count()) > 0;

  // Log and potentially update job status only if already applied
  if (appliedByText || appliedByClass) {
    await updateIndeedJobStatus(indeedJobId, "Applied");
    console.log(
      chalk.green(
        `Job ${indeedJobId} has been marked as Applied due to being already applied.`,
      ),
    );
  }

  return appliedByText || appliedByClass;
};
