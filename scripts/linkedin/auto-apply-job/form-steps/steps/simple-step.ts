import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

// Generic handler for steps that only require clicking "Suivant"
export const handleSimpleStep = async (page: Page, stepName: string) => {
  console.log(`Handling ${stepName} Step`);

  // Without those lines, the following button's click doesn't seem to work
  const nextButton = await page.$("text='Suivant'");
  await nextButton?.scrollIntoViewIfNeeded();

  await clickSubmitFormStep(page);
};
