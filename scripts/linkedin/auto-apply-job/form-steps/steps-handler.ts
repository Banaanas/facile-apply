// Function to identify the current step based on the `h3` element text
import { Page } from "playwright";

import { handleHomeAddressStep } from "@/scripts/linkedin/auto-apply-job/form-steps/home-address-step";
import { handleSimpleStep } from "@/scripts/linkedin/auto-apply-job/form-steps/simple-step";
import { handleSelfIdentificationStep } from "@/scripts/linkedin/auto-apply-job/form-steps/self-identification/self-identification";

export const identifyStep = async (page: Page): Promise<string | undefined> => {
  const h3Text = await page.textContent("h3");

  return h3Text?.trim();
};

// Function to handle the steps based on the identified step
export const handleStep = async (page: Page, step: string | undefined) => {
  console.log(step);
  switch (step) {
    case "Coordonnées":
    case "Contacts":
    case "Resume":
    case "Work experience":
    case "Education":
      await handleSimpleStep(page, step);
      break;
    case "Home address":
      await handleHomeAddressStep(page);
      break;
    case "Auto-identification volontaire":
      await handleSelfIdentificationStep(page);
      break;
    default:
      console.log("Unknown step");
      return;
  }
  // Recursively identify and handle the next step
  const nextStep = await identifyStep(page);
  if (nextStep !== undefined) {
    await handleStep(page, nextStep);
  }
};
