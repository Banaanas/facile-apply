import { LinkedinJob } from "@prisma/client";
import { Page } from "playwright";

import { handleCheckApplicationStep } from "@/scripts/linkedin/auto-apply-job/form-steps/check-application";
import { handleAdditionalQuestionsStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/additional-questions-step";
import { handleApplicationSent } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/application-sent-step";
import { handleContactInformationStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/contact-information-step";
import { handleHomeAddressStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/home-address-step";
import { handlePrivacyPolicyStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/privacy-policy-step";
import { handleResumeStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/resume-step";
import { handleSelfIdentificationStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/self-identification/self-identification";
import { handleSimpleStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/simple-step";
import { handleWorkAuthorizationStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/work-authorization-step";

// Function to identify the current step based on the `h3` element text
export const identifyStep = async (page: Page): Promise<string | undefined> => {
  const url = page.url();
  const h3Text = await page.textContent("h3");

  if (url.includes("post-apply")) {
    return "Application Sent";
  }

  if (h3Text?.trim().startsWith("Votre candidature a été envoyée")) {
    return "Application Sent";
  }

  return h3Text?.trim();
};

// Function to handle the steps based on the identified step
export const handleStep = async (
  page: Page,
  step: string | undefined,
  linkedinJobId: LinkedinJob["id"],
) => {
  console.log(step);
  switch (step) {
    case "Contacts":
    case "Education":
    case "Screening questions":
      await handleSimpleStep(page, step);
      break;
    case "Coordonnées":
    case "Kontaktinfo":
      await handleContactInformationStep(page);
      break;
    case "Home address":
      await handleHomeAddressStep(page);
      break;
    case "Resume":
    case "Lebenslauf":
      await handleResumeStep(page);
      break;
    case "Auto-identification volontaire":
    case "Diversity":
      await handleSelfIdentificationStep(page);
      break;
    case "Permis de travail":
      await handleWorkAuthorizationStep(page);
      break;
    case "Privacy policy":
      await handlePrivacyPolicyStep(page);
      break;
    case "Additional Questions":
    case "Additional":
    case "Work experience":
    case "Weitere Fragen":
      await handleAdditionalQuestionsStep(page);
      break;
    case "Vérifiez votre candidature":
      await handleCheckApplicationStep(page);
      break;
    case "Application Sent":
    case "Candidature Envoyée":
      await handleApplicationSent(linkedinJobId);
      return; // End the loop after handling Application Sent
    default:
      console.log("Unknown step: ", step);
      await page.pause();
      return;
  }
  // Recursively identify and handle the next step
  const nextStep = await identifyStep(page);
  if (nextStep !== undefined) {
    await handleStep(page, nextStep, linkedinJobId);
  }
};
