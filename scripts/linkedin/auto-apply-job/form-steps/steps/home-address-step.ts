import { Page } from "playwright";

import { humanLikeMoveAndClick } from "@/scripts/linkedin/auto-apply-job/human-move-and-click";

export const handleHomeAddressStep = async (page: Page) => {
  console.log("Handling Home Address Step");

  // Define the selector for the city input
  const cityInputSelector = 'input[id*="city-HOME-CITY"]';

  // Wait for the city input to be visible
  await page.waitForSelector(cityInputSelector);

  // Fill in the city input with "Lyon, Auvergne-Rhône-Alpes, France"
  await page.fill(cityInputSelector, "Lyon, Auvergne-Rhône-Alpes, France");

  // Click outside the input field to close the dropdown
  const formContentSelector = "div.jobs-easy-apply-content";
  await page.click(formContentSelector);

  // Use the human-like click function to click the "Suivant" button
  const nextButtonSelector = 'button:has-text("Suivant")';
  await humanLikeMoveAndClick(page, nextButtonSelector);
};
