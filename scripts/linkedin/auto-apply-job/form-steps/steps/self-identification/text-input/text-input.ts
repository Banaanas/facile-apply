import { ElementHandle } from "playwright";

import {
  checkIfDateField,
  fillTodaysDate,
  isAskingForTodaysDate,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/text-input/date";
import {
  checkIfNameField,
  fillNameField,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/text-input/name";

export const handleTextInput = async (
  formControlContainer: ElementHandle,
  groupTitle: string,
) => {
  const inputField = await formControlContainer.$("input");

  if (!inputField) {
    console.log("No input field.");
    return;
  }

  const inputId = await inputField.getAttribute("id");

  if (inputId) {
    await handleLabel(inputId, formControlContainer);
  }

  // Handle specific known placeholders when NO inputID
  const isDateField = await checkIfDateField(inputField);
  if (isDateField && isAskingForTodaysDate(groupTitle)) {
    await fillTodaysDate(inputField);
  }
};

// Helper function to handle the label of the input field
const handleLabel = async (
  inputId: string,
  formControlContainer: ElementHandle,
): Promise<void> => {
  const label = await formControlContainer.$(`label[for="${inputId}"]`);

  if (!label) {
    console.log("No label.");
    return;
  }

  if (await checkIfNameField(label)) {
    const inputField = await formControlContainer.$("input");

    if (inputField) {
      await fillNameField(inputField);
    }
  }
};
