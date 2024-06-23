import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleContactInformationStep = async (page: Page, stepName: string) => {
  console.log(`Handling ${stepName} Step`);

  await fillAddressInput(page);

  // Without those lines, the following button's click doesn't seem to work
  const nextButton = await page.$("text='Suivant'");
  await nextButton?.scrollIntoViewIfNeeded();

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
