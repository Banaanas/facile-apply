import { Page } from "playwright";

import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/radio-buttons";
import { handleSelectFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

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

  await clickSubmitFormStep(page);
};
