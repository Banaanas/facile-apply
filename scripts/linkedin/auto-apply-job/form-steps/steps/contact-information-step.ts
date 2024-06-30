import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

export const handleContactInformationStep = async (page: Page) => {
  console.log(`Handling Contact Information Step`);

  await fillAddressInput(page);

  await ensureNextButtonIsClickable(page, "buttonText", "Suivant");
  await clickSubmitFormStep(page);
};

const getFormField = async (page: Page, selector: string) => {
  try {
    const inputField = await page.$(selector);
    if (!inputField) {
      console.log(`Form field with selector '${selector}' not found.`);
      return null;
    }
    return inputField;
  } catch (error) {
    console.log(
      `An error occurred while trying to find a form field with selector '${selector}':`,
      error,
    );
    return null;
  }
};

const fillAddressInput = async (page: Page) => {
  const inputSelector = 'label:has-text("Address") + input';
  const address = "40, rue du Ciel";

  const inputField = await getFormField(page, inputSelector);
  if (!inputField) {
    return;
  }

  await inputField.fill(address);
  console.log("Address input filled with:", address);
};
