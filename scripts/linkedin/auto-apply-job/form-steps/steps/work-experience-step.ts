import { Page } from "playwright";

import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleWorkExperienceStep = async (page: Page) => {
  console.log("Handling Work Experience Step");

  const cityInputSelector = 'input[id*="city-HOME-CITY"]';
  const formContentSelector = "div.jobs-easy-apply-content";

  // Check if the city input field is present
  const cityInputField = await page.$(cityInputSelector);

  if (!cityInputField) {
    console.log("City input field not found.");
  }

  if (cityInputField) {
    await waitForElementAndFill(
      page,
      cityInputSelector,
      "Lyon, Auvergne-Rhône-Alpes, France",
    );
    await page.click(formContentSelector);
    console.log("City input filled with: Lyon, Auvergne-Rhône-Alpes, France");
  }

  await clickSubmitFormStep(page);
};

const waitForElementAndFill = async (
  page: Page,
  selector: string,
  fillValue: string,
) => {
  await page.waitForSelector(selector);
  await page.fill(selector, fillValue);
};
