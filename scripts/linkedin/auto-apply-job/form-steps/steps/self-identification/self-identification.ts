import { Page } from "playwright";

import { getFormControlIdentifier } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/form-control-identifier/get-form-control-identifier";
import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/radio-buttons";
import { handleSelectDropdown } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown/select-dropdown";
import { handleTextInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/text-input/text-input";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

export const handleSelfIdentificationStep = async (page: Page) => {
  console.log("Handling Self Identification Step");

  // Iterate over each form section and handle the inputs dynamically
  const formControlContainers = await page.$$(
    ".jobs-easy-apply-form-section__grouping",
  );

  for (const formControlContainer of formControlContainers) {
    const selectDropdown = await formControlContainer.$("select");
    const radioButtonFieldset = await formControlContainer.$("fieldset");
    const inputField = await formControlContainer.$("input[type='text']");

    // Get the label text or group title for the current section
    const formControlIdentifier =
      await getFormControlIdentifier(formControlContainer);

    if (radioButtonFieldset) {
      await handleRadioButtonFieldset(
        formControlContainer,
        formControlIdentifier,
      );
    }

    // Check if the section contains a select dropdown
    if (selectDropdown) {
      await handleSelectDropdown(page, formControlIdentifier);
    }

    // Check if the section contains an input field
    if (inputField) {
      await handleTextInput(formControlContainer, formControlIdentifier);
    }
  }

  await ensureNextButtonIsClickable(page, "buttonText", "Suivant");
  await clickSubmitFormStep(page);
};
