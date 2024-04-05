import console from "node:console";

import { ElementHandle, Page } from "playwright";

import { consentRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/inputs-regex";
import { generateAnswer } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

export const clickRadioButtonBasedOnDecision = async (
  container: ElementHandle<SVGElement | HTMLElement>,
  decision: string,
) => {
  const labels = await container.$$("label");
  for (const label of labels) {
    const labelText = await label.evaluate(
      (el) => el.textContent?.trim() ?? "",
    );
    // Ensure only punctuation is removed; avoid affecting the first letter
    const normalizedLabelText = labelText
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .trim();
    const normalizedDecision = decision
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .trim();

    // Use strict comparison for accuracy
    if (normalizedLabelText === normalizedDecision) {
      const radioButton = await label.$('input[type="radio"]');
      if (radioButton) {
        await radioButton.click();
        break;
      }
    }
  }
};

// Function to select the option in the dropdown that matches the GPT-3 decision
export const selectDropdownFromDecision = async (
  selectDropdown: ElementHandle,
  decision: string, // Decision received from GPT
) => {
  const options = await selectDropdown.$$("option");
  for (const option of options) {
    const optionText = await option.textContent();

    // Adjust the condition to check if the option text includes the decision
    if (
      optionText?.trim().toLowerCase().includes(decision.trim().toLowerCase())
    ) {
      const value = await option.getAttribute("value");
      if (value !== null) {
        await selectDropdown.selectOption({ value });
        break; // Break after finding and selecting the correct option
      }
    }
  }
};

export const handleDateInput = async (
  container: ElementHandle<SVGElement | HTMLElement>,
  questionLabel: string,
) => {
  // Generate a prompt for GPT-3 based on the questionLabel
  const prompt = generateDatePrompt(questionLabel);

  // Use GPT-3 to generate an answer
  const gptResponse = await generateAnswer(prompt);

  // Assuming the response is already in the correct format based on your instructions to GPT-3
  const formattedDate = gptResponse.trim();

  // Locate and fill the date input field
  const dateInput = await container.$(
    `input[type="date"], input[placeholder*="/"]`,
  );
  if (dateInput && formattedDate) {
    await dateInput.fill(formattedDate);
  }
};

const getFormattedTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};

const generateDatePrompt = (questionLabel: string) => {
  const todayDate = getFormattedTodayDate();

  return `Today's date is ${todayDate}. Considering the current date, and given the question: "${questionLabel}", please provide an appropriate date in the format DD/MM/YYYY. Remember, only the date is needed, without additional text.`;
};

export const handleNumberInput = async (
  container: ElementHandle<SVGElement | HTMLElement>,
  questionLabel: string,
) => {
  // Use GPT-3 to generate an answer for the number input based on the questionLabel
  const answer = await generateAnswer(questionLabel); // Assumes numerical answer is returned
  // Extract only the numerical part of the answer
  const match = answer.match(/\d+/); // This could be null if no digits are found
  const numericalAnswer = match ? match[0] : "";
  // Identify the number input within the container
  const numberInput = await container.$('input[type="number"]');

  if (numberInput && numericalAnswer !== "") {
    await numberInput.fill(numericalAnswer);
  }
};

export const handleCheckboxInput = async (
  container: ElementHandle<SVGElement | HTMLElement>,
  questionLabel: string,
) => {
  // console.log(`Handling Checkbox for question: "${questionLabel}"`);

  // Handle specific cases first, such as agreeing to a privacy policy
  if (consentRegex.test(questionLabel)) {
    const consentCheckbox = await container.$('input[type="checkbox"]');
    if (consentCheckbox) {
      await consentCheckbox.check(); // Ensure the checkbox is checked
      console.log("Consent checkbox checked.");
    }
  } else {
    // For other cases, use GPT-3 to decide which checkboxes should be checked
    const prompt = `Given the question "${questionLabel}", which options should be selected? Provide keywords or values associated with the options.`;

    const decision = await generateAnswer(prompt); // Assuming generateAnswer interfaces with GPT-3

    const decisionsArray = decision
      .split(",")
      .map((opt) => opt.trim().toLowerCase());

    const checkboxes = await container.$$(`input[type="checkbox"]`);
    for (const checkbox of checkboxes) {
      const optionLabel = await checkbox.evaluate(
        (el) => el.nextSibling?.textContent?.toLowerCase() ?? "",
      );

      if (decisionsArray.some((decision) => optionLabel.includes(decision))) {
        await checkbox.check();
      } else {
        // Optionally uncheck any checkboxes not matched by the decision
        // Note: Be cautious with automatically unchecking options as it may not always be the desired behavior
        await checkbox.uncheck();
      }
    }
  }
};

export const handleCoverLetterInput = async (page: Page) => {
  // Identify the textarea for the cover letter using its 'data-testid'
  const coverLetterTextarea = await page.$(
    'textarea[data-testid="CoverLetter-textarea"]',
  );

  if (coverLetterTextarea) {
    console.log("Found the Cover Letter Textarea.");

    const coverLetterContent = "Your cover letter content goes here.";

    await coverLetterTextarea.fill(coverLetterContent);
    console.log("Cover Letter filled.");
  } else {
    console.log("Cover Letter Textarea not found.");
  }
};
