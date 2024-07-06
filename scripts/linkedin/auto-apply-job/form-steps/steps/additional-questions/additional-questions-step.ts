import chalk from "chalk";
import { Page } from "playwright";

import { handleRadioInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/radio-input";
import { handleSelectInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/select-input";
import { handleTextAreaInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/text-area-input";
import { handleTextInput } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/text-input";
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
      console.log(chalk.green("Input already filled. It will be skipped."));
    }

    if (selectDropdown && !willSkipInput) {
      await handleSelectInput(formControlContainer);
    }
    if (radioButtonFieldset && !willSkipInput) {
      await handleRadioInput(formControlContainer);
    }

    // Log the type of form elements found in each container
    if (textInput && !willSkipInput) {
      await handleTextInput(page, formControlContainer);
    }

    if (textArea && !willSkipInput) {
      await handleTextAreaInput(formControlContainer);
    }
  }

  await clickSubmitFormStep(page);
};
