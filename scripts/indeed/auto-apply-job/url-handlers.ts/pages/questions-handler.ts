import console from "node:console";

import { IndeedJob } from "@prisma/client";
import { ElementHandle, Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/continue-button";
import {
  clickRadioButtonBasedOnDecision,
  handleCheckboxInput,
  handleDateInput,
  handleNumberInput,
  selectDropdownFromDecision,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/input-handlers";
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
  const questionContainers = await page.$$(".ia-Questions-item");

  for (const container of questionContainers) {
    const textInput = await container.$('input[type="text"]');
    const textarea = await container.$("textarea");
    const radioInputs = await container.$$(`input[type="radio"]`);
    const numberInputs = await container.$$(`input[type="number"]`);

    const dateInput = await container.$(
      `input[type="date"],input[placeholder*="/"]`,
    );
    const selectDropdown = await container.$("select");

    const checkboxContainers = await container.$$(`input[type="checkbox"]`);

    // Unified method to get question label or legend
    const questionLabel = await getQuestionLabelOrLegend(container);

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
          options.map((option) => option.textContent.trim()),
        );
        const prompt = `Based on what you know, which of the following options is most appropriate? Options: ${optionsTexts.join(", ")}.`;
        const decision = await generateDecision(prompt);
        await selectDropdownFromDecision(selectDropdown, decision);
      }

      // Handle text inputs and textareas
      if (textInput || textarea) {
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
