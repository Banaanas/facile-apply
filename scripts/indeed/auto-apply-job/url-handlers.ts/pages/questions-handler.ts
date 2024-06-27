import console from "node:console";

import { IndeedJob } from "@prisma/client";
import colors from "colors";
import { ElementHandle, Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import {
  clickRadioButtonBasedOnDecision,
  handleCheckboxInput,
  handleDateInput,
  handleNumberInput,
  selectDropdownFromDecision,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/input-handlers";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/inputs-regex";
import {
  radioInputQuestionPrompt,
  generateAnswer,
  generateDecision,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

export const questionsHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Questions Page");

  // await page.waitForTimeout(4000);
  const questionContainers = await page.$$(".ia-Questions-item");

  for (const container of questionContainers) {
    const textInput = await container.$('input[type="text"]');
    const textarea = await container.$("textarea");
    const radioInputs = await container.$$(`input[type="radio"]`);
    const numberInputs = await container.$$(`input[type="number"]`);
    const telInput = await container.$('input[type="tel"]');

    const dateInput = await container.$(
      `input[type="date"],input[placeholder*="/"]`,
    );
    const selectDropdown = await container.$("select");

    const checkboxContainers = await container.$$(`input[type="checkbox"]`);

    // Unified method to get question label or legend
    const questionLabel = await getQuestionLabelOrLegend(container);

    // PREVENT GPT COST
    const willSkipInput = await shouldSkipInput(
      [...radioInputs, ...numberInputs, telInput, dateInput, textInput],
      selectDropdown,
      textarea,
    );

    if (willSkipInput) {
      console.log(colors.green("Input already filled. It will be skipped."));
    }

    /*
    if (questionLabel.toLowerCase().includes("optional")) {
      // Define keywords to exclude from the skip logic
      const keywords = ["portfolio", "website", "github", "linkedin"];
      const containsExcludedKeyword = keywords.some((keyword) =>
        questionLabel.toLowerCase().includes(keyword),
      );

      // Only skip if "optional" is found and none of the excluded keywords are present
      if (!containsExcludedKeyword) {
        console.log("Skipping optional question:", questionLabel);
        continue; // Skip to the next container
      }
    }
*/

    try {
      // Handle checkbox inputs
      if (checkboxContainers.length > 0 && !willSkipInput) {
        await handleCheckboxInput(container, questionLabel);
      }

      // Handle radio inputs
      if (radioInputs.length > 0 && !willSkipInput) {
        const prompt = await radioInputQuestionPrompt(container);
        const decision = await generateDecision(prompt);

        await clickRadioButtonBasedOnDecision(questionLabel, decision);
      }

      // Handle number inputs
      if (numberInputs.length > 0 && !willSkipInput) {
        for (const numberInput of numberInputs) {
          await handleNumberInput(container, questionLabel);
        }
      }

      // Handle date inputs
      if (dateInput && !willSkipInput) {
        await handleDateInput(container, questionLabel);
      }

      // Handle select dropdowns
      if (selectDropdown && !willSkipInput) {
        const optionsTexts = await selectDropdown.$$eval("option", (options) =>
          options.map((option) => option.textContent?.trim() || ""),
        );
        const prompt = `Given these options: ${optionsTexts.join(", ")}, which should be selected for the shortest answer possible? Please provide only the name.`;

        const decision = await generateDecision(prompt);

        await selectDropdownFromDecision(selectDropdown, decision);
      }

      if (telInput && !willSkipInput) {
        await telInput.fill(cyrilPersonalInfo.phone);
      }

      // Handle text inputs and textareas
      if ((textInput && !willSkipInput) || (textarea && !willSkipInput)) {
        console.log(questionLabel);
        const answer = await generateAnswer(questionLabel);
        if (textInput) {
          await textInput.fill(answer);
        }
        if (textarea) {
          await textarea.fill(answer);
        }
      }
    } catch (error) {
      console.error("Error handling input:", error);
    }
  }

  await page.click(`text=${continueButtonRegex}`);

  console.log("Questions handled successfully.");

  await handlePageBasedOnUrl(page, indeedJobId);
};

const getQuestionLabelOrLegend = async (
  container: ElementHandle<SVGElement | HTMLElement>,
) => {
  const label = await container
    .$eval("label", (el) => el.textContent || "")
    .catch(() => "");
  if (label) return label;
  const legend = await container
    .$eval("legend", (el) => el.textContent || "")
    .catch(() => "");
  return legend || label;
};

// PREVENT GPT COST
const shouldSkipInput = async (
  inputs: (ElementHandle<SVGElement | HTMLElement> | null)[],
  selectDropdown: ElementHandle<HTMLSelectElement> | null,
  textarea: ElementHandle<HTMLTextAreaElement> | null,
): Promise<boolean> => {
  // Check for non-empty values or selected states in inputs
  for (const input of inputs) {
    // skip if input is null
    if (!input) continue;

    const type = await input.getAttribute("type");

    if (
      (type === "checkbox" || type === "radio") &&
      (await input.evaluate((node) => (node as HTMLInputElement).checked))
    ) {
      return true;
    }

    if (type !== "checkbox" && type !== "radio") {
      const value = await input.inputValue();
      if (value.length > 0) return true;
    }
  }

  // Check select dropdown for a selected index
  if (
    selectDropdown &&
    (await selectDropdown.evaluate((select) => select.selectedIndex)) > 0
  ) {
    return true;
  }

  // Check textarea for non-empty value
  if (textarea && (await textarea.inputValue()).length > 0) {
    return true;
  }

  return false;
};
