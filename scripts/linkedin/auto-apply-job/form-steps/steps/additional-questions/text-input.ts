import console from "node:console";

import colors from "colors";
import { ElementHandle } from "playwright";

import { getLabelForElement } from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/get-element-label";
import {
  handleYearsOfExperienceQuestion,
  isYearsOfExperienceQuestion,
} from "@/scripts/linkedin/auto-apply-job/form-steps/steps/additional-questions/questions/years-experience-question";

export const handleTextInput = async (
  formControlContainer: ElementHandle,
): Promise<void> => {
  const inputField = await formControlContainer.$("input");
  if (!inputField) return;

  const labelText = await getLabelForElement(formControlContainer, inputField);
  if (!labelText) {
    console.log(colors.yellow("Label text not found. Skipping input field."));
    return;
  }

  // Identify if the label includes specific keywords related to work experience
  if (isYearsOfExperienceQuestion(labelText)) {
    await handleYearsOfExperienceQuestion(inputField, labelText);
    return;
  }

  // If not a predefined keyword, use the ChatGPT function
  const chatGPTResponse = await dummyChatGPTFunction(labelText);
  await inputField.fill(chatGPTResponse);
};

// Dummy ChatGPT function to handle other questions
const dummyChatGPTFunction = async (labelText: string): Promise<string> => {
  console.log(`Calling ChatGPT for label: ${labelText}`);
  // Simulate the response from ChatGPT
  return "Dummy ChatGPT Response";
};
