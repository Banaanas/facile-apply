import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";

// Generic handler for steps that only require clicking "Suivant"
export const handleSimpleStep = async (page: Page, stepName: string) => {
  console.log(`Handling ${stepName} Step`);

  await ensureNextButtonIsClickable(page, "buttonText", "Suivant");
  await clickSubmitFormStep(page);
};
