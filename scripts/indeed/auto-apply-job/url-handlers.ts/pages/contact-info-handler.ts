import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";

export const contactInfoHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Contact Info Page");

  // Handle phone number country selection
  await handlePhoneNumberCountrySelection(page);

  // For now, we have to click on the parent because of multiple buttons in one container resulting in an ineffective click

  // await page.click(`text=${continueButtonRegex}`);

  const buttonContainer = await page.$(".ia-BasePage-footer");
  await buttonContainer?.click();
  console.log("Contact Info handled successfully.");
  await handlePageBasedOnUrl(page, indeedJobId);
};

const handlePhoneNumberCountrySelection = async (page: Page) => {
  console.log("Checking for phone number country select element.");

  // Check if the select element for phone number country is present
  const selectElement = await page.$('select[name="phoneNumberCountry"]');

  if (!selectElement) return;

  console.log("Phone number country select element found.");

  // Select the option with value "FR" (France)
  await selectElement.selectOption("FR");
  console.log("Selected France (FR) in the phone number country select.");

  // Enter the phone number
  const phoneNumberInput = await page.$('input[name="phoneNumber"]');
  if (!phoneNumberInput) return;

  await phoneNumberInput.fill(cyrilPersonalInfo.phone);
};
