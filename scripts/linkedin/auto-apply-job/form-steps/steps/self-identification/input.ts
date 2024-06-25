import { ElementHandle } from "playwright";

import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";

export const handleInputField = async (
  formControlContainer: ElementHandle,
  groupTitle: string,
) => {
  const inputField = await formControlContainer.$("input");

  if (inputField) {
    const inputId = await inputField.getAttribute("id");
    const inputPlaceholder = await inputField.getAttribute("placeholder");

    if (inputId) {
      const label = await formControlContainer.$(`label[for="${inputId}"]`);
      if (label) {
        const labelText = await label.innerText();
        if (labelText.includes("Your Name")) {
          await inputField.fill(
            `${cyrilPersonalInfo.name} ${cyrilPersonalInfo.firstName}`,
          );
        }
      }
    }

    // Handle specific known placeholders
    if (inputPlaceholder) {
      if (inputPlaceholder.includes("jj/mm/aaaa")) {
        // Check the group title for context
        if (groupTitle.includes("Today's date")) {
          const currentDate = new Date().toLocaleDateString("fr-FR");
          await inputField.fill(currentDate);
        }
      }
    }
  }
};
