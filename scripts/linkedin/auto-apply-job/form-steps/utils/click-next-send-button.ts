import { Page } from "playwright";

import { ensureNextButtonIsClickable } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/ensure-button-clickable";
import { uncheckFollowCompany } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/uncheck-follow-company";
import { humanLikeMoveAndClick } from "@/scripts/linkedin/auto-apply-job/human-move-and-click";

// Function to click the "Next step" or "Send application" button
export const clickSubmitFormStep = async (page: Page) => {
  const nextButtonLabel = "Passez à l’étape suivante";
  const sendButtonLabel = "Envoyer la candidature";
  const verifyButtonLabel = "Vérifiez votre candidature";

  const nextButtonSelector = `button[aria-label="${nextButtonLabel}"]`;
  const sendButtonSelector = `button[aria-label="${sendButtonLabel}"]`;
  const verifyButtonSelector = `button[aria-label="${verifyButtonLabel}"]`;

  const nextButton = await page.$(nextButtonSelector);
  const sendButton = await page.$(sendButtonSelector);
  const verifyButton = await page.$(verifyButtonSelector);

  if (sendButton) {
    await ensureNextButtonIsClickable(page, "ariaLabelText", sendButtonLabel);
    await uncheckFollowCompany(page);
    await humanLikeMoveAndClick(page, sendButtonSelector);
    await page.waitForTimeout(1000);
    console.log("Clicked 'Send application' button");
    return;
  }

  if (verifyButton) {
    await ensureNextButtonIsClickable(page, "ariaLabelText", verifyButtonLabel);
    await humanLikeMoveAndClick(page, verifyButtonSelector);
    await page.waitForTimeout(1000);
    console.log("Clicked 'Verify' button");
    return;
  }

  if (nextButton) {
    await ensureNextButtonIsClickable(page, "ariaLabelText", nextButtonLabel);
    await humanLikeMoveAndClick(page, nextButtonSelector);
    await page.waitForTimeout(1000);
    console.log("Clicked 'Next step' button");
    return;
  }

  throw new Error(
    "No 'Next step', 'Verify', or 'Send application' button found",
  );
};
