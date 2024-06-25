import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

export const handleContactInformationStep = async (page: Page) => {
  console.log(`Handling Contact Information Step`);

  await fillAddressInput(page);

  await ensureNextButtonIsClickable(page, "Suivant");
  await clickSubmitFormStep(page);
};

const fillAddressInput = async (page: Page) => {
  const inputSelector = 'label:has-text("Address") + input';

  const address = "40, rue du Ciel";

  // Check if the input field is present
  const inputField = await page.$(inputSelector);

  if (inputField) {
    await inputField.fill(address);
    console.log("Address input filled with:", address);
  } else {
    console.log("Address input field not found.");
  }
};
