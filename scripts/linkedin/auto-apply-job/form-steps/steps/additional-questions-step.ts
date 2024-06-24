import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleAdditionalQuestionsStep = async (page: Page) => {
  console.log("Handling Additional Questions Step");

  await page.pause();

  await clickSubmitFormStep(page);
};
