import { Page } from "playwright";

import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

export const handleResumeStep = async (page: Page) => {
  console.log(`Handling Resume Step`);

  await fillLinkedInProfileInput(page);

  await ensureNextButtonIsClickable(page, "buttonText", "Suivant");
  await clickSubmitFormStep(page);
};

const fillLinkedInProfileInput = async (page: Page) => {
  const inputSelector = 'label:has-text("Your LinkedIn Profile") + input';
  const linkedInProfile = cyrilPersonalInfo.websites.linkedin;

  // Check if the input field is present
  const inputField = await page.$(inputSelector);

  if (inputField) {
    await inputField.fill(linkedInProfile);
    console.log("LinkedIn Profile input filled with:", linkedInProfile);
  } else {
    console.log("LinkedIn Profile input field not found.");
  }
};
