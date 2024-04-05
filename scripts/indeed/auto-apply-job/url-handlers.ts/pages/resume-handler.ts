import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/inputs-regex";
import { IndeedJob } from "@prisma/client";

export const resumeHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Resume Page");

  // Attempt to click on the label or element that's associated with the radio button
  // Here, we try to click on the text associated with the PDF label, which should indirectly select the radio button
  const fileLabel = "CV - Cyril.pdf"; // The text associated with the label of the radio button

  // Check if the label (or the element you're targeting) is present
  const isLabelPresent = await page.isVisible(`text=${fileLabel}`);

  if (isLabelPresent) {
    console.log(`Found label: "${fileLabel}". Clicking on it...`);
    await page.click(`text=${fileLabel}`);
    console.log(`Clicked on label: "${fileLabel}".`);
  } else {
    console.log(
      `Label "${fileLabel}" not found. Checking for alternative methods...`,
    );
    // Implement any alternative strategies here
  }

  await page.click(`text=${continueButtonRegex}`);
  console.log("Resume handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};
