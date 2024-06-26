import console from "node:console";

import colors from "colors";
import { Page } from "playwright";

import { handleRadioButtonFieldset } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/radio-buttons";
import { handleTextInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/text-input";
import { willSkipInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/will-skip-question";
import { clickSubmitFormStep } from "@/scripts/linkedin/auto-apply-job/form-steps/utils/click-next-send-button";
import {
  formulatePrompt,
  generateDecision,
} from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";
import { clickRadioButtonBasedOnDecision } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/input-handlers";

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

    const willSkip = await willSkipInput([textInput], selectDropdown, textArea);

    if (willSkip) {
      console.log(colors.green("Input already filled. It will be skipped."));
    }

    // Log the type of form elements found in each container
    if (textInput) {
      await handleTextInput(formControlContainer);
    }

    if (selectDropdown) {
      console.log("SELECT");
    }




    if (radioButtonFieldset) {

      const prompt = await formulatePrompt(formControlContainer);
      const decision = await generateDecision(prompt);
      console.log("PROMPT", prompt);
      console.log("DECISION", decision);
      await clickRadioButtonBasedOnDecision(formControlContainer, decision);

//      await handleRadioButtonFieldset(formControlContainer);
    }

    if (textArea) {
      console.log("TEXTAREA");
    }
  }

  await page.waitForTimeout(1000); // Adjust timeout as needed
  await clickSubmitFormStep(page);
};
