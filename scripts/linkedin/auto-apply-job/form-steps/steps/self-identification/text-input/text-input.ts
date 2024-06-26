import { ElementHandle } from "playwright";

import {
  isAskingForTodaysDate,
  isDateField,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/text-input/date";
import {
  fillNameField,
  isNameField,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/text-input/name";

export const handleTextInput = async (
  formControlContainer: ElementHandle,
  groupTitle: string,
) => {
  const inputField = await formControlContainer.$("input");

  if (inputField) {
    const inputId = await inputField.getAttribute("id");

    if (inputId) {
      const label = await formControlContainer.$(`label[for="${inputId}"]`);
      if (label) {
        if (await isNameField(label)) {
          await fillNameField(inputField);
          return;
        }
      }
    }

    // Handle specific known placeholders
    if (await isDateField(inputField)) {
      if (isAskingForTodaysDate(groupTitle)) {
        const currentDate = new Date().toLocaleDateString("fr-FR");
        await inputField.fill(currentDate);
      }
    }
  }
};
