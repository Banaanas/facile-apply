import { Page } from "playwright";

import { getFormControlIdentifier } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/form-control-identifier/get-form-control-identifier";
import { handleInputField } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/input";
import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/radio-buttons";
import { handleSelectFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown/select-dropdown";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

export const handleSelfIdentificationStep = async (page: Page) => {
  console.log("Handling Self Identification Step");

  // Iterate over each form section and handle the inputs dynamically
  const formControlContainers = await page.$$(
    ".jobs-easy-apply-form-section__grouping",
  );

  for (const formControlContainer of formControlContainers) {
    const radioButtonFieldset = await formControlContainer.$("fieldset");
    const selectDropdown = await formControlContainer.$("select");
    const inputField = await formControlContainer.$("input");

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
      await handleSelectFieldset(page, formControlIdentifier);
    }

    // Check if the section contains an input field
    if (inputField) {
      await handleInputField(formControlContainer, formControlIdentifier);
    }
  }

  await ensureNextButtonIsClickable(page, "Suivant");
  await clickSubmitFormStep(page);
};
