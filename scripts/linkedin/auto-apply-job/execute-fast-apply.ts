import { LinkedinJob } from "@prisma/client";
import { Page } from "playwright";

import {
  handleStep,
  identifyStep,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps-handler";
import { humanLikeMoveAndClick } from "@/scripts/linkedin/auto-apply-job/human-move-and-click";

export const executeFastApply = async (
  page: Page,
  linkedinJobId: LinkedinJob["id"],
) => {
  // Extract the company name
  const selector =
    "div.jobs-apply-button--top-card >> text=Candidature simplifiée";

  // Move cursor to the selector and click
  await humanLikeMoveAndClick(page, selector);

  // Identify and handle the initial step
  const step = await identifyStep(page);
  await handleStep(page, step);

  await page.pause();
};
