import { ElementHandle } from "playwright";

import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";

export const handleInputField = async (
  container: ElementHandle,
  groupTitle: string,
) => {
  const inputFields = await container.$$("input");

  for (const inputField of inputFields) {
    const inputId = await inputField.getAttribute("id");
    const inputPlaceholder = await inputField.getAttribute("placeholder");

    if (inputId) {
      const label = await container.$(`label[for="${inputId}"]`);
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
        // Traverse up the DOM tree to find the nearest preceding group title
        if (groupTitle.includes("Today's date")) {
          const currentDate = new Date().toLocaleDateString("fr-FR");
          await inputField.fill(currentDate);
        }
      }
    }
  }
};
