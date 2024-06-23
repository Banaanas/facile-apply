import { Page } from "playwright";

import { humanLikeMoveAndClick } from "@/scripts/linkedin/auto-apply-job/human-move-and-click";

// Generic handler for steps that only require clicking "Suivant"
export const handleSimpleStep = async (page: Page, stepName: string) => {
  console.log(`Handling ${stepName} Step`);

  // find the next button on the page
  const nextButton = await page.$("text='Suivant'");
  // scroll until the button is visible
  await nextButton?.scrollIntoViewIfNeeded();

  // Use the human-like click function to click the "Suivant" button
  const labelText = "Passez à l’étape suivante";
  const nextButtonSelector = `button[aria-label="${labelText}"]`;

  await humanLikeMoveAndClick(page, nextButtonSelector);
};
