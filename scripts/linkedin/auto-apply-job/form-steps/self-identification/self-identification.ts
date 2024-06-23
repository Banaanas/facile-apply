import { Page } from "playwright";

import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/self-identification/radio-buttons";
import { handleSelectFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/self-identification/select-dropdown";
import { humanLikeMoveAndClick } from "@/scripts/linkedin/auto-apply-job/human-move-and-click";

export const handleSelfIdentificationStep = async (page: Page) => {
  console.log("Handling Self Identification Step");

  // Iterate over each form section and handle the inputs dynamically
  const formSections = await page.$$(".jobs-easy-apply-form-section__grouping");

  for (const section of formSections) {
    // Check if the section contains radio buttons
    const radioButtonFieldset = await section.$("fieldset");
    const selectDropdown = await section.$("select");

    if (radioButtonFieldset) {
      const legendText = await radioButtonFieldset.$eval(
        "legend span",
        (node) => (node as HTMLElement).innerText,
      );

      await handleRadioButtonFieldset(page, section, legendText);
    }

    // Check if the section contains a select dropdown
    if (selectDropdown) {
      const labelText = await section.$eval(
        "label span",
        (node) => (node as HTMLElement).innerText,
      );
      await handleSelectFieldset(page, section, labelText);
    }
  }

  await page.waitForTimeout(100000);

  // Use the human-like click function to click the "Suivant" button
  const nextButtonSelector = 'button[aria-label="Passez à l’étape suivante"]';
  await humanLikeMoveAndClick(page, nextButtonSelector);
};
