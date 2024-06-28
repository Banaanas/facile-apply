import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";

export const resumeHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Resume Page");

  const fileLabels = ["CV - Cyril.pdf", "Resume - EN.pdf"];

  for (const fileLabel of fileLabels) {
    const isLabelPresent = await page.isVisible(`text=${fileLabel}`);
    if (isLabelPresent) {
      console.log(`Found label: "${fileLabel}". Clicking on it...`);
      await page.click(`text=${fileLabel}`);
      console.log(`Clicked on label: "${fileLabel}".`);
      break; // Exit the loop after successfully clicking on a label
    }
    if (!isLabelPresent) {
      console.log(
        "No matching labels found. Checking for alternative methods...",
      );
      // Implement any alternative strategies here
    }
  }

  // For now, we have to click on the parent because of multiple buttons in one container resulting in an ineffective click

  // await page.click(`text=${continueButtonRegex}`);

  const buttonContainer = await page.$(".ia-BasePage-footer");
  await buttonContainer?.click();
  console.log("Resume handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};
