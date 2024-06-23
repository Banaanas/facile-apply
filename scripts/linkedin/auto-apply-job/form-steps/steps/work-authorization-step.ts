import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleWorkAuthorizationStep = async (page: Page) => {
  console.log("Handling Work Authorization Step");

  // Locate the label element for "No"
  const noWorkPermitLabelSelector =
    'label[data-test-text-selectable-option__label="No"]';

  const noWorkPermitLabel = await page.$(noWorkPermitLabelSelector);

  await noWorkPermitLabel?.click();
  console.log("Selected 'No' for work authorization.");

  await clickSubmitFormStep(page);
};
