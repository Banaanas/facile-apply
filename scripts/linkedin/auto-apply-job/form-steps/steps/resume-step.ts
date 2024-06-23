import { Page } from "playwright";

import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleResumeStep = async (page: Page, stepName: string) => {
  console.log(`Handling ${stepName} Step`);

  await fillLinkedInProfileInput(page);

  // Without those lines, the following button's click doesn't seem to work
  const nextButton = await page.$("text='Suivant'");
  await nextButton?.scrollIntoViewIfNeeded();

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
