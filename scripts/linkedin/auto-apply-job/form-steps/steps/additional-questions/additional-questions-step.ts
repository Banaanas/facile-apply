import console from "node:console";

import colors from "colors";
import { Page } from "playwright";

import { generateDecision } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";
import {
  clickRadioButtonBasedOnDecision,
  radioInputQuestionPrompt,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/question-utilities";
import { handleTextInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/text-input";
import { shouldSkipInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/will-skip-question";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";

export const handleAdditionalQuestionsStep = async (page: Page) => {
  console.log("Handling Additional Questions Step");

  // Get all form control containers
  const formControlContainers = await page.$$(
    ".jobs-easy-apply-form-section__grouping",
  );

  // Log the number of form containers
  console.log(`Number of form containers: ${formControlContainers.length}`);

  for (const formControlContainer of formControlContainers) {
    const textInput = await formControlContainer.$("input[type='text']");
    const textArea = await formControlContainer.$("textarea");
    const selectDropdown = await formControlContainer.$("select");
    const radioButtonFieldset = await formControlContainer.$("fieldset");

    const willSkipInput = await shouldSkipInput(
      [textInput],
      selectDropdown,
      textArea,
    );

    if (willSkipInput) {
      console.log(colors.green("Input already filled. It will be skipped."));
    }

    // Log the type of form elements found in each container
    if (textInput && !willSkipInput) {
      await handleTextInput(formControlContainer);
    }

    if (selectDropdown && !willSkipInput) {
      console.log("SELECT");
    }

    if (radioButtonFieldset && !willSkipInput) {
      const prompt = await radioInputQuestionPrompt(formControlContainer);
      const decision = await generateDecision(prompt);

      await clickRadioButtonBasedOnDecision(formControlContainer, decision);

      // await handleRadioButtonFieldset(formControlContainer);
    }

    if (textArea && !willSkipInput) {
      console.log("TEXTAREA");
    }
  }

  await page.waitForTimeout(1000000); // Adjust timeout as needed
  await clickSubmitFormStep(page);
};
