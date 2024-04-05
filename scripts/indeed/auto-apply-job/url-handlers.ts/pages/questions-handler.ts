import console from "node:console";

import { IndeedJob } from "@prisma/client";
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
  formulatePrompt,
  generateAnswer,
  generateDecision,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

export const questionsHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Questions Page");

  await page.waitForTimeout(4000);
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

    // Check if the label includes "optional" (case-insensitive)
    if (questionLabel.toLowerCase().includes("optional")) {
      console.log("Skipping optional question:", questionLabel);
      continue; // Skip to the next container
    }

    try {
      // Handle checkbox inputs
      if (checkboxContainers.length > 0) {
        await handleCheckboxInput(container, questionLabel);
      }

      // Handle radio inputs
      if (radioInputs.length > 0) {
        const prompt = await formulatePrompt(container);
        const decision = await generateDecision(prompt);

        await clickRadioButtonBasedOnDecision(container, decision);
      }

      // Handle number inputs
      if (numberInputs.length > 0) {
        for (const numberInput of numberInputs) {
          await handleNumberInput(container, questionLabel);
        }
      }

      // Handle date inputs
      if (dateInput) {
        await handleDateInput(container, questionLabel);
      }

      // Handle select dropdowns
      if (selectDropdown) {
        const optionsTexts = await selectDropdown.$$eval("option", (options) =>
          options.map((option) => option.textContent?.trim() || ""),
        );
        const prompt = `Given these options: ${optionsTexts.join(", ")}, which should be selected for the shortest answer possible? Please provide only the name.`;

        const decision = await generateDecision(prompt);

        console.log(decision);
        await selectDropdownFromDecision(selectDropdown, decision);
      }

      if (telInput) {
        await telInput.fill(cyrilPersonalInfo.phone);
      }

      // Handle text inputs and textareas
      if (textInput || textarea) {
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
