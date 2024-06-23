import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handlePrivacyPolicyStep = async (page: Page) => {
  console.log("Handling Privacy Policy Step");

  // Locate the label element for "I Agree Terms & Conditions"
  const agreeLabelSelector =
    'label[data-test-text-selectable-option__label="I Agree Terms & Conditions"]';

  const agreeLabel = await page.$(agreeLabelSelector);

  await agreeLabel?.click();

  await clickSubmitFormStep(page);
};
