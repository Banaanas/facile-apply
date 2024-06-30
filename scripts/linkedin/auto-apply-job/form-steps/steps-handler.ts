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
import { handleWorkExperienceStep } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/work-experience-step";

// Function to identify the current step based on the `h3` element text
export const identifyStep = async (page: Page): Promise<string | undefined> => {
  const url = page.url();

  // Check URL for "post-apply"
  if (url.includes("post-apply")) {
    return "Application Sent";
  }

  let h3Text: string | null = null;

  // Try to get h3 text from within the form with a shorter timeout
  try {
    h3Text = await page.textContent("form h3", { timeout: 1000 });
  } catch (error) {
    console.log("form h3 not found within the timeout period.");
  }

  // If h3 is not found in form, try to find it within .artdeco-modal
  if (!h3Text) {
    try {
      h3Text = await page.textContent(".artdeco-modal h3", { timeout: 5000 });
    } catch (error) {
      console.log(".artdeco-modal h3 not found within the timeout period.");
    }
  }

  // Check the content of h3Text
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
  if (!step) {
    console.log("Step is undefined");
    return;
  }

  console.log(step);

  // Convert step to lower case to make the comparison case-insensitive
  const lowerCaseStep = step.toLowerCase();

  switch (lowerCaseStep) {
    case "contacts":
    case "education":
    case "screening questions":
      await handleSimpleStep(page, step);
      break;
    case "coordonnées":
    case "kontaktinfo":
      await handleContactInformationStep(page);
      break;
    case "home address":
      await handleHomeAddressStep(page);
      break;
    case "work experience":
      await handleWorkExperienceStep(page);
      break;
    case "resume":
    case "cv":
    case "lebenslauf":
      await handleResumeStep(page);
      break;
    case "auto-identification volontaire":
    case "diversity":
      await handleSelfIdentificationStep(page);
      break;
    case "permis de travail":
      await handleWorkAuthorizationStep(page);
      break;
    case "privacy policy":
      await handlePrivacyPolicyStep(page);
      break;
    case "additional":
    case "additional questions":
    case "personal info":
    case "questions supplémentaires":
    case "weitere fragen":
      await handleAdditionalQuestionsStep(page);
      break;
    case "vérifiez votre candidature":
      await handleCheckApplicationStep(page);
      break;
    case "application sent":
    case "candidature envoyée":
      await handleApplicationSent(linkedinJobId);
      await page.waitForTimeout(400);
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
