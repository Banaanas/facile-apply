import { ElementHandle, Page } from "playwright";

import { getClosestGroupTitle } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/get-group-title";
import { handleInputField } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/input";
import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/radio-buttons";
import { handleSelectFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/select-dropdown/select-dropdown";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

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

  await clickSubmitFormStep(page);
};

// Helper function to get the label text or group title
const getFormControlIdentifier = async (
  formControlContainer: ElementHandle,
): Promise<string> => {
  let labelText = await formControlContainer
    .$eval("label span", (node) => (node as HTMLElement).innerText)
    .catch(() => null);

  if (!labelText) {
    labelText = await formControlContainer
      .$eval("legend span", (node) => (node as HTMLElement).innerText)
      .catch(() => null);
  }

  if (!labelText) {
    labelText = await getClosestGroupTitle(formControlContainer);
  }

  return labelText || "Unknown";
};
