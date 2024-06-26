import { Page } from "playwright";

import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/radio-buttons";
import { handleTextInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/text-input";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleAdditionalQuestionsStep = async (page: Page) => {
  console.log("Handling Additional Questions Step");

  // Get all form control containers
  const formControlContainers = await page.$$(
    ".jobs-easy-apply-form-section__grouping",
  );

  // Log the number of form containers
  console.log(`Number of form containers: ${formControlContainers.length}`);

  for (const formControlContainer of formControlContainers) {
    const textInput = await formControlContainer.$("input[type='text']");
    const textArea = await formControlContainer.$("textarea");
    const selectDropdown = await formControlContainer.$("select");
    const radioButtonFieldset = await formControlContainer.$("fieldset");

    // Log the type of form elements found in each container
    if (textInput) {
      await handleTextInput(formControlContainer);
      console.log("INPUT");
    }

    if (selectDropdown) {
      console.log("SELECT");
    }

    if (radioButtonFieldset) {
      await handleRadioButtonFieldset(formControlContainer);
      console.log("RADIO BUTTONS");
    }

    if (textArea) {
      console.log("TEXTAREA");
    }
  }

  await page.waitForTimeout(1000); // Adjust timeout as needed
  await clickSubmitFormStep(page);
};
