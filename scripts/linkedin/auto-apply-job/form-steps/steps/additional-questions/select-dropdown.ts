import { ElementHandle } from "playwright";

import { getLabelForElement } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/get-element-label";

export const handleSelectFieldset = async (
  formControlContainer: ElementHandle,
): Promise<string | null> => {
  const selectDropdown = await formControlContainer.$("select");

  if (selectDropdown) {
    const labelText = await getLabelForElement(
      formControlContainer,
      selectDropdown,
    );
    console.log("LABEL TEXT", labelText);
    return labelText;
  }

  return null;
};
